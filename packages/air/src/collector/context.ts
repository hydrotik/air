/**
 * What fills the context window, and the per-turn payloads read off pi's messages: the pure
 * half of the collector's `turn_end` telemetry. Nothing here touches pi or the socket.
 */
import type { ContextSegment } from '../shared/events';

/** Context window assumed when the model does not report one. */
export const DEFAULT_CONTEXT_WINDOW = 200_000;

/** Token estimate for `chars` characters (~4 per token for English), when pi reports none. */
export function estimateTokens(chars: number): number {
  return Math.ceil(chars / 4);
}

/** One block of a message's content, loosely: only the fields read here. */
interface ContentPart {
  type?: string;
  text?: string;
  thinking?: string;
  name?: string;
}

const parts = (content: unknown): ContentPart[] =>
  Array.isArray(content) ? (content as ContentPart[]) : [];

export function contentToString(content: unknown): string {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return parts(content)
      .map((c) => {
        if (c.type === 'text') return c.text ?? '';
        if (c.type === 'image') return '[image]';
        if (c.type === 'thinking') return c.thinking ?? '';
        if (c.type === 'toolCall') return `[tool:${c.name ?? ''}]`;
        return '';
      })
      .join('\n');
  }
  return content === undefined ? '' : JSON.stringify(content);
}

/** Splits pi's system prompt into the sections it is assembled from, by their markers. */
export function parseSystemPromptSources(prompt: string): Array<{ key: string; chars: number }> {
  const sources: Array<{ key: string; chars: number }> = [];
  let remaining = prompt.length;
  const take = (key: string, match: RegExpMatchArray | null, accept = true) => {
    if (!match || !accept) return;
    sources.push({ key, chars: match[0].length });
    remaining -= match[0].length;
  };

  // Project context files, under a "## <path>/CLAUDE.md" heading
  take('sp_claude_md', prompt.match(/## .*?CLAUDE\.md\n[\s\S]*?(?=\n## |\n<available_skills>|$)/i));
  take('sp_skills', prompt.match(/<available_skills>[\s\S]*?<\/available_skills>/));
  take(
    'sp_tools',
    prompt.match(
      /(?:Available tools:|Here are the (?:functions|tools)[^:]*:)[\s\S]*?(?=\n# |\nCurrent date|$)/i
    )
  );
  take(
    'sp_prompt_templates',
    prompt.match(/(?:prompt.templates|Prompt Templates?)[\s\S]*?(?=\n## |\n<|$)/i)
  );
  const ext = prompt.match(/(?:extensions?|custom tools)[\s\S]*?(?=\n## |\n<|$)/i);
  take('sp_extensions', ext, (ext?.[0].length ?? 0) < prompt.length * 0.5);

  // The base prompt and anything not matched above
  if (remaining > 0) sources.push({ key: 'sp_base', chars: remaining });
  return sources;
}

/**
 * File-path categories, first match wins. Each pattern is tested against the lower-cased path,
 * so `config` matches `tsconfig.json` and `.json` matches `package.json`.
 */
const FILE_CATEGORIES: ReadonlyArray<readonly [category: string, pattern: RegExp]> = [
  ['tr_gsd', /gsd|\.get-shit-done|\.planning/],
  ['tr_desloppify', /desloppify/],
  ['tr_docs', /readme|\.md|\/docs\//],
  ['tr_config', /config|\.json|\.ya?ml|\.env/],
  ['tr_tests', /\.test\.|\.spec\.|__tests__/],
  ['tr_styles', /\.s?css/],
  ['tr_source_code', /\.(tsx?|jsx?|py|rs|go)$/],
];

/** The context category of a file read by the `read` tool. */
export function classifyFilePath(filePath: string): string {
  const p = filePath.toLowerCase();
  for (const [category, pattern] of FILE_CATEGORIES) {
    if (pattern.test(p)) return category;
  }
  return 'tool_results_other';
}

/** Display label for each context category (the categories `ContextSegment` lists). */
export const CONTEXT_LABELS: Readonly<Record<string, string>> = {
  sp_base: 'Base System Prompt',
  sp_claude_md: 'CLAUDE.md',
  sp_skills: 'Skills',
  sp_tools: 'Tool Definitions',
  sp_prompt_templates: 'Prompt Templates',
  sp_extensions: 'Extensions',
  sp_other: 'Other Context Files',
  system_prompt: 'System Prompt',
  user_messages: 'User Messages',
  assistant_messages: 'Assistant Messages',
  tool_results: 'Tool Results',
  thinking: 'Thinking Blocks',
  compaction_summary: 'Compaction Summaries',
  custom_messages: 'Extension Messages',
  tr_gsd: 'GSD Specs & Plans',
  tr_desloppify: 'Desloppify State',
  tr_source_code: 'Source Code',
  tr_config: 'Config Files',
  tr_docs: 'Documentation',
  tr_tests: 'Test Files',
  tr_styles: 'Stylesheets',
  tool_results_other: 'Other Tool Results',
};

/** A session branch entry, loosely: only the fields read here. */
export interface BranchEntry {
  type: string;
  message?: { role?: string; content?: unknown };
}

/** Characters per message category across the session branch. */
function charsByMessageRole(entries: readonly BranchEntry[]): Record<string, number> {
  const chars: Record<string, number> = {};
  const add = (category: string, n: number) => {
    chars[category] = (chars[category] ?? 0) + n;
  };
  const roleCategory: Record<string, string> = {
    user: 'user_messages',
    toolResult: 'tool_results',
    compactionSummary: 'compaction_summary',
    custom: 'custom_messages',
  };

  for (const entry of entries) {
    const m = entry.type === 'message' ? entry.message : undefined;
    if (!m?.role) continue;
    const text = contentToString(m.content);
    if (m.role === 'assistant') {
      const thinking = parts(m.content)
        .filter((b) => b.type === 'thinking')
        .reduce((sum, b) => sum + (b.thinking ?? '').length, 0);
      if (thinking) add('thinking', thinking);
      add('assistant_messages', Math.max(0, text.length - thinking));
      continue;
    }
    const category = roleCategory[m.role];
    if (category) add(category, text.length);
  }
  return chars;
}

export interface FileRead {
  path: string;
  outputBytes: number;
}

/**
 * Replaces the `tool_results` total with per-file-category shares, scaled from the tracked file
 * reads' output bytes; an unclassified remainder over 100 chars stays as `tool_results_other`.
 */
function splitToolResults(chars: Record<string, number>, fileReads: Iterable<FileRead>): void {
  const byCategory: Record<string, number> = {};
  for (const fr of fileReads) {
    const category = classifyFilePath(fr.path);
    byCategory[category] = (byCategory[category] ?? 0) + fr.outputBytes;
  }
  if (Object.keys(byCategory).length === 0) return;

  const classified = Object.values(byCategory).reduce((s, c) => s + c, 0);
  const total = chars['tool_results'] ?? 0;
  // Bytes are not characters, but close: scale them to the total tool result characters.
  const scale = total > 0 && classified > 0 ? total / classified : 1;
  let accounted = 0;
  for (const [category, bytes] of Object.entries(byCategory)) {
    const scaled = Math.round(bytes * scale);
    byCategory[category] = scaled;
    accounted += scaled;
  }
  const remainder = total - accounted;
  if (remainder > 100) byCategory['tool_results_other'] = remainder;
  delete chars['tool_results'];
  Object.assign(chars, byCategory);
}

export interface ContextBreakdownInput {
  /** `ctx.sessionManager.getBranch()` entries. */
  entries: readonly BranchEntry[];
  systemPrompt: string;
  /** Tracked `read` tool calls with their output size. */
  fileReads: Iterable<FileRead>;
  /** The real token count from `ctx.getContextUsage()`, 0 when unknown. */
  realTokens: number;
}

/**
 * What fills the context window, by category: characters are counted per source and the real
 * token count is distributed over them in proportion, or estimated from the characters when pi
 * reports no count (`realTokens` 0).
 */
export function buildContextBreakdown({
  entries,
  systemPrompt,
  fileReads,
  realTokens,
}: ContextBreakdownInput): { segments: ContextSegment[]; totalTokens: number } {
  const chars = charsByMessageRole(entries);
  for (const src of systemPrompt ? parseSystemPromptSources(systemPrompt) : []) {
    chars[src.key] = src.chars;
  }
  splitToolResults(chars, fileReads);

  const totalChars = Object.values(chars).reduce((sum, c) => sum + c, 0);
  const segments = Object.entries(chars)
    .filter(([, n]) => n > 0)
    .map(([category, n]) => ({
      category,
      label: CONTEXT_LABELS[category] ?? category,
      estimatedTokens:
        realTokens > 0 ? Math.round((n / totalChars) * realTokens) : estimateTokens(n),
      charCount: n,
    }));
  const totalTokens =
    realTokens > 0 ? realTokens : segments.reduce((sum, s) => sum + s.estimatedTokens, 0);
  return { segments, totalTokens };
}
