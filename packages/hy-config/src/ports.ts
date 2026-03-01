/**
 * Centralized port assignments for all Hydrotik apps and services.
 * Import from `@hydrotik/config/ports` to keep dev servers from colliding.
 *
 * Convention:
 *   3000-3099  — Frontend apps
 *   4000-4099  — Backend services / BFFs
 *   5000-5099  — Tooling (MCP, etc.)
 *   6000-6099  — Documentation / Storybook
 */
export const ports = {
  /** Component preview app (Vite) */
  componentPreview: 3100,

  /** BFF Fastify server */
  bffFastify: 4000,

  /** Design MCP server (stdio, not HTTP — listed for reference) */
  designMcp: 5100,

  /** AI-RUM telemetry server (Fastify + WebSocket) */
  aiRum: 5200,

  /** AI-RUM dashboard dev server (Vite, proxies to aiRum) */
  aiRumDashboard: 5201,

  /** Storybook */
  storybook: 6006,
} as const;

export type PortName = keyof typeof ports;
export type Ports = typeof ports;
