/**
 * pi-redactor — Pi extension entry point.
 *
 * Hooks into Pi's lifecycle to sanitize all outbound LLM requests:
 *   - `context` event:  redact all messages before they hit the LLM
 *   - `input` event:    redact user input before it's stored/sent
 *   - `tool_result`:    redact tool outputs before they're sent to the LLM
 *
 * Also provides:
 *   - /redactor-preview  command: show detection summary without revealing values
 *   - /redactor-list     command: list stored mappings
 *   - /redactor-delete   command: delete a stored mapping
 *   - /redactor-rehydrate command: restore originals locally for review
 *   - /redactor-status   command: show current config + policy
 *
 * The mapping and original values NEVER leave the local machine.
 */
import type { ExtensionAPI } from '@mariozechner/pi-coding-agent';
import { randomBytes, randomUUID } from 'node:crypto';
import {
  sanitizePayload,
  rehydrate,
  detectAll,
  evaluatePolicy,
  previewSummary,
  loadConfig,
  listMappings as listMappingsStore,
  deleteMapping as deleteMappingStore,
  loadMapping,
  ensureStorageDir,
} from './src/index';

export default function piRedactor(pi: ExtensionAPI) {
  // ── Session state ──
  // One mapping per session; secret key per session (never persisted to LLM).
  let sessionMappingId: string = randomUUID();
  let sessionSecretKey: string = randomBytes(32).toString('hex');
  let config = loadConfig();

  // Ensure storage directory exists
  ensureStorageDir();

  // ── Session start: load config, reset mapping ──
  pi.on('session_start', async (_event, ctx) => {
    config = loadConfig();
    sessionMappingId = randomUUID();
    sessionSecretKey = randomBytes(32).toString('hex');
    ctx.ui.setStatus('pi-redactor', '🛡️ Redactor active');
  });

  // ── Context event: sanitize all messages before LLM sees them ──
  pi.on('context', async (event, _ctx) => {
    const messages = event.messages.map((msg: any) => {
      if (!msg.content) return msg;

      // Handle array content (text + images)
      if (Array.isArray(msg.content)) {
        const newContent = msg.content.map((block: any) => {
          if (block.type === 'text' && typeof block.text === 'string') {
            const result = sanitizePayload(
              { text: block.text },
              { mappingId: sessionMappingId, secretKey: sessionSecretKey, config },
            );
            return { ...block, text: result.redacted_text };
          }
          return block;
        });
        return { ...msg, content: newContent };
      }

      // Handle string content
      if (typeof msg.content === 'string') {
        const result = sanitizePayload(
          { text: msg.content },
          { mappingId: sessionMappingId, secretKey: sessionSecretKey, config },
        );
        return { ...msg, content: result.redacted_text };
      }

      return msg;
    });

    return { messages };
  });

  // ── Input event: check policy before allowing the prompt through ──
  pi.on('input', async (event, ctx) => {
    if (typeof event.text !== 'string') return { action: 'continue' as const };

    const detections = detectAll(event.text, config);
    if (detections.length === 0) return { action: 'continue' as const };

    const decision = evaluatePolicy(detections, config.policy, config);

    if (decision.blocked) {
      if (ctx.hasUI) {
        const summary = previewSummary(detections);
        const allow = await ctx.ui.confirm(
          '🛡️ PII Detected — Blocked',
          `${summary}\n\nAllow this request with redaction applied?`,
        );
        if (!allow) {
          ctx.ui.notify('Request blocked by pi-redactor.', 'warning');
          return { action: 'handled' as const };
        }
        // User allowed — transform with redaction
      } else {
        // Non-interactive: hard block
        return { action: 'handled' as const };
      }
    }

    if (decision.shouldRedact) {
      const result = sanitizePayload(
        { text: event.text },
        { mappingId: sessionMappingId, secretKey: sessionSecretKey, config },
      );
      ctx.ui.setStatus('pi-redactor', `🛡️ Redacted ${Object.values(result.redaction_report).reduce((a, b) => a + b, 0)} item(s)`);
      return { action: 'transform' as const, text: result.redacted_text };
    }

    return { action: 'continue' as const };
  });

  // ── Tool result: redact outputs before they go back to the LLM ──
  pi.on('tool_result', async (event, _ctx) => {
    if (!event.content) return undefined;

    const newContent = event.content.map((block: any) => {
      if (block.type === 'text' && typeof block.text === 'string') {
        const result = sanitizePayload(
          { text: block.text },
          { mappingId: sessionMappingId, secretKey: sessionSecretKey, config },
        );
        return { ...block, text: result.redacted_text };
      }
      return block;
    });

    return { content: newContent };
  });

  // ── /redactor-preview: show detection summary ──
  pi.registerCommand('redactor-preview', {
    description: 'Preview PII detections in the last prompt (counts only, no values)',
    handler: async (args, ctx) => {
      const text = args || '';
      if (!text) {
        ctx.ui.notify('Usage: /redactor-preview <text to scan>', 'warning');
        return;
      }
      const detections = detectAll(text, config);
      const summary = previewSummary(detections);
      ctx.ui.notify(summary, 'info');
    },
  });

  // ── /redactor-list: list stored mappings ──
  pi.registerCommand('redactor-list', {
    description: 'List all stored redaction mappings',
    handler: async (_args, ctx) => {
      const ids = listMappingsStore();
      if (ids.length === 0) {
        ctx.ui.notify('No mappings stored.', 'info');
        return;
      }
      ctx.ui.notify(`Stored mappings (${ids.length}):\n${ids.map((id) => `  • ${id}`).join('\n')}`, 'info');
    },
  });

  // ── /redactor-delete: delete a mapping ──
  pi.registerCommand('redactor-delete', {
    description: 'Delete a stored redaction mapping by ID',
    handler: async (args, ctx) => {
      const id = args?.trim();
      if (!id) {
        ctx.ui.notify('Usage: /redactor-delete <mapping_id>', 'warning');
        return;
      }
      const deleted = deleteMappingStore(id);
      ctx.ui.notify(deleted ? `Deleted mapping: ${id}` : `Mapping not found: ${id}`, deleted ? 'info' : 'warning');
    },
  });

  // ── /redactor-rehydrate: restore originals locally ──
  pi.registerCommand('redactor-rehydrate', {
    description: 'Rehydrate redacted text locally (NEVER send to LLM)',
    handler: async (args, ctx) => {
      if (!ctx.hasUI) {
        ctx.ui.notify('Rehydration requires interactive mode.', 'error');
        return;
      }
      const mappingId = args?.trim() || sessionMappingId;
      const text = await ctx.ui.editor(
        'Paste redacted text to rehydrate:',
        '',
      );
      if (!text) return;
      try {
        const restored = rehydrate(text, mappingId);
        // Show in editor (local only, never sent)
        await ctx.ui.editor('Rehydrated (LOCAL ONLY — do NOT send to LLM):', String(restored));
      } catch (err: any) {
        ctx.ui.notify(`Rehydration failed: ${err.message}`, 'error');
      }
    },
  });

  // ── /redactor-status: show config + policy ──
  pi.registerCommand('redactor-status', {
    description: 'Show pi-redactor configuration and current session info',
    handler: async (_args, ctx) => {
      const lines = [
        `Session mapping ID: ${sessionMappingId}`,
        `Name detection: ${config.detectNames ? 'ON' : 'OFF (default)'}`,
        `Policy — allowSensitive: ${config.policy?.allowSensitive ?? false}`,
        `Policy — redact: ${config.policy?.redact ?? true}`,
        `Custom patterns: ${config.customPatterns?.length ?? 0}`,
        `Name allowlist: ${config.nameAllowlist?.length ?? 0} entries`,
        `Name denylist: ${config.nameDenylist?.length ?? 0} entries`,
      ];
      ctx.ui.notify(lines.join('\n'), 'info');
    },
  });
}
