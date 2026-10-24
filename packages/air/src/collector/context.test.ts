import {
  buildContextBreakdown,
  classifyFilePath,
  contentToString,
  estimateTokens,
  parseSystemPromptSources,
} from './context';

const message = (role: string, content: unknown) => ({
  type: 'message',
  message: { role, content },
});

describe('classifyFilePath', () => {
  it.each([
    ['/repo/.get-shit-done/plan.txt', 'tr_gsd'],
    ['/repo/.gsd/state', 'tr_gsd'],
    ['/repo/.planning/PLAN.md', 'tr_gsd'],
    ['/repo/scripts/gsd-tool.ts', 'tr_gsd'],
    ['/repo/.desloppify/state.json', 'tr_desloppify'],
    ['/repo/README', 'tr_docs'],
    ['/repo/docs/guide.txt', 'tr_docs'],
    ['/repo/CLAUDE.md', 'tr_docs'],
    ['/repo/tsconfig.json', 'tr_config'],
    ['/repo/pnpm-workspace.yaml', 'tr_config'],
    ['/repo/.github/ci.yml', 'tr_config'],
    ['/repo/.env.local', 'tr_config'],
    ['/repo/vite.config.ts', 'tr_config'],
    ['/repo/src/Button.test.tsx', 'tr_tests'],
    ['/repo/src/Button.spec.ts', 'tr_tests'],
    ['/repo/src/__tests__/x.js', 'tr_tests'],
    ['/repo/src/Button.css.ts', 'tr_styles'],
    ['/REPO/SRC/APP.SCSS', 'tr_styles'],
    ['/repo/src/Button.tsx', 'tr_source_code'],
    ['/repo/tool.py', 'tr_source_code'],
    ['/repo/main.rs', 'tr_source_code'],
    ['/repo/main.go', 'tr_source_code'],
    ['/repo/image.png', 'tool_results_other'],
    ['', 'tool_results_other'],
  ])('%s → %s', (path, category) => {
    expect(classifyFilePath(path)).toBe(category);
  });

  it('first match wins', () => {
    expect(classifyFilePath('/repo/.planning/config.json')).toBe('tr_gsd');
    expect(classifyFilePath('/repo/docs/app.css')).toBe('tr_docs');
  });
});

describe('contentToString', () => {
  it('joins content blocks, naming images and tool calls', () => {
    expect(
      contentToString([
        { type: 'text', text: 'a' },
        { type: 'image' },
        { type: 'thinking', thinking: 't' },
        { type: 'toolCall', name: 'bash' },
        { type: 'other' },
        { type: 'text' },
        { type: 'toolCall' },
      ])
    ).toBe('a\n[image]\nt\n[tool:bash]\n\n\n[tool:]');
  });

  it('passes strings through, serialises anything else, and is empty for nothing', () => {
    expect(contentToString('plain')).toBe('plain');
    expect(contentToString({ a: 1 })).toBe('{"a":1}');
    expect(contentToString(undefined)).toBe('');
  });

  it('estimates ~4 characters per token', () => {
    expect(estimateTokens(0)).toBe(0);
    expect(estimateTokens(5)).toBe(2);
  });
});

describe('parseSystemPromptSources', () => {
  it('finds each section by its marker, the rest is the base prompt', () => {
    const md = '## /p/CLAUDE.md\nrules\n';
    const skills = '<available_skills>s</available_skills>';
    const tools = 'Available tools:\n- read';
    const prompt = `You are pi.\n${md}${skills}\n# x\n${tools}\nCurrent date: today`;
    const sources: Record<string, number> = { sp_claude_md: 0, sp_skills: 0, sp_tools: 0 };
    for (const s of parseSystemPromptSources(prompt)) sources[s.key] = s.chars;
    expect(sources.sp_claude_md).toBe(md.length - 1); // up to the "\n<available_skills>"
    expect(sources.sp_skills).toBe(skills.length);
    expect(sources.sp_tools).toBe(tools.length);
    expect(sources.sp_base).toBe(
      prompt.length -
        (sources.sp_claude_md ?? 0) -
        (sources.sp_skills ?? 0) -
        (sources.sp_tools ?? 0)
    );
  });

  it('counts prompt templates and extensions, but not extensions that are most of the prompt', () => {
    const templates = parseSystemPromptSources('base\nPrompt Templates: /review\n## end');
    expect(templates.map((s) => s.key)).toEqual(['sp_prompt_templates', 'sp_base']);

    const small = parseSystemPromptSources(`${'b'.repeat(100)}\nextensions: one\n## end`);
    expect(small.map((s) => s.key)).toEqual(['sp_extensions', 'sp_base']);
    expect(parseSystemPromptSources('extensions everywhere').map((s) => s.key)).toEqual([
      'sp_base',
    ]);
  });
});

describe('buildContextBreakdown', () => {
  it('counts characters per role and distributes the real tokens over them', () => {
    const { segments, totalTokens } = buildContextBreakdown({
      entries: [
        message('user', 'x'.repeat(300)),
        message('assistant', [
          { type: 'text', text: 'y'.repeat(100) },
          { type: 'thinking', thinking: 'z'.repeat(100) },
        ]),
        message('assistant', [{ type: 'thinking' }]),
        { type: 'label' },
        { type: 'message' },
      ],
      systemPrompt: '',
      fileReads: [],
      realTokens: 1000,
    });
    expect(totalTokens).toBe(1000);
    // assistant text joins its two blocks with '\n' (201 chars), minus the 100 thinking chars;
    // the empty thinking block adds nothing
    expect(segments).toEqual([
      { category: 'user_messages', label: 'User Messages', estimatedTokens: 599, charCount: 300 },
      { category: 'thinking', label: 'Thinking Blocks', estimatedTokens: 200, charCount: 100 },
      {
        category: 'assistant_messages',
        label: 'Assistant Messages',
        estimatedTokens: 202,
        charCount: 101,
      },
    ]);
  });

  it('splits tool results by the files read, keeping a large remainder as other', () => {
    const { segments } = buildContextBreakdown({
      entries: [message('toolResult', 'r'.repeat(1000))],
      systemPrompt: '',
      fileReads: [
        { path: '/repo/src/a.ts', outputBytes: 300 },
        { path: '/repo/README.md', outputBytes: 200 },
      ],
      realTokens: 0,
    });
    expect(segments.map((s) => [s.category, s.charCount])).toEqual([
      ['tr_source_code', 600],
      ['tr_docs', 400],
    ]);

    const withRemainder = buildContextBreakdown({
      entries: [message('toolResult', 'r'.repeat(1000)), message('user', 'u')],
      systemPrompt: '',
      fileReads: [{ path: '/repo/a.ts', outputBytes: 0 }],
      realTokens: 0,
    });
    expect(withRemainder.segments.map((s) => [s.category, s.charCount])).toEqual([
      ['user_messages', 1],
      ['tool_results_other', 1000],
    ]);
  });

  it('labels system prompt sections and falls back to the category name', () => {
    const { segments } = buildContextBreakdown({
      entries: [message('mystery', 'abc')],
      systemPrompt: 'base prompt',
      fileReads: [],
      realTokens: 0,
    });
    expect(segments).toEqual([
      { category: 'sp_base', label: 'Base System Prompt', estimatedTokens: 3, charCount: 11 },
    ]);
  });

  it('estimates ~4 chars per token when pi reports no token count', () => {
    const { segments, totalTokens } = buildContextBreakdown({
      entries: [message('user', 'x'.repeat(400)), message('toolResult', 'r'.repeat(101))],
      systemPrompt: '',
      fileReads: [],
      realTokens: 0,
    });
    expect(segments.map((s) => [s.category, s.estimatedTokens])).toEqual([
      ['user_messages', 100],
      ['tool_results', 26],
    ]);
    expect(totalTokens).toBe(126);
  });
});
