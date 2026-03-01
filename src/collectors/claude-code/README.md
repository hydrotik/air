# AIr Collector — Claude Code

Hooks into Claude Code's event system to stream telemetry to the AIr dashboard.

## Quick Install

```bash
# From your project root (where .claude/ lives)
npx air-install-claude-code
```

This copies two hook scripts and updates `.claude/settings.json`:

```
.claude/hooks/
├── air-session-start.js     ← SessionStart hook (auto-starts AIr server)
└── air-post-tool-use.js     ← PostToolUse hook (tool calls + context usage)
```

## Manual Install

1. Copy `session-start.js` and `post-tool-use.js` to `.claude/hooks/`
2. Add to `.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "node .claude/hooks/air-session-start.js"
      }]
    }],
    "PostToolUse": [{
      "hooks": [{
        "type": "command",
        "command": "node .claude/hooks/air-post-tool-use.js"
      }]
    }]
  }
}
```

## How It Works

Claude Code hooks are **short-lived Node.js processes** — they receive JSON on stdin
and exit. Unlike pi's persistent WebSocket extension, these hooks use **HTTP POST**
to `/api/ingest` for each event.

### SessionStart hook
- Auto-starts AIr server if not running
- Emits `session_start` event with model and workspace info

### PostToolUse hook
- Emits `tool_call_start` + `tool_call_end` events for every tool execution
- Reads context metrics from the statusline bridge file (if present)
- Emits `context_usage` events with utilization percentage

## What's Collected

| Event | Data |
|-------|------|
| `session_start` | session_id, model, workspace directory |
| `tool_call_start` / `tool_call_end` | tool name, input/output size, errors |
| `context_usage` | tokens used, context window size, utilization % |

## Configuration

| Env Variable | Default | Description |
|-------------|---------|-------------|
| `AIR_URL` | `http://localhost:5200` | AIr server HTTP endpoint |
| `AIR_PORT` | `5200` | Server port (for auto-start) |
| `AIR_ENABLED` | `true` | Set to `"false"` to disable |
| `AIR_AUTOSTART` | `true` | Set to `"false"` to disable auto-start |

## Limitations vs Pi Collector

| Feature | Pi | Claude Code |
|---------|-----|-------------|
| Tool call timing | ✅ Precise (start/end events) | ⚠️ No duration (PostToolUse only) |
| Token usage per turn | ✅ From API response | ❌ Not available in hooks |
| Context breakdown | ✅ Full treemap | ⚠️ Total % only (from statusline bridge) |
| Compaction events | ✅ Direct hook | ❌ Not exposed |
| Connection | WebSocket (persistent) | HTTP POST (per-event) |
