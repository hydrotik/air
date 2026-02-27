# @hydrotik/config

Cross-project configuration for the Hydrotik monorepo.

## Ports

Centralized port assignments so dev servers don't collide:

```ts
import { ports } from '@hydrotik/config/ports';

// In vite.config.ts
export default defineConfig({
  server: { port: ports.componentPreview },
});
```

| Name               | Port | Description                  |
|--------------------|------|------------------------------|
| componentPreview   | 3100 | Component preview app (Vite) |
| bffFastify         | 4000 | BFF Fastify server           |
| designMcp          | 5100 | Design MCP (stdio, ref only) |
| storybook          | 6006 | Storybook                    |
