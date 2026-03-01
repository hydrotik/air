# @hydrotik/eslint-config

Shared [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files) for the Hydrotik monorepo.

## Configs

| Export | Use case |
|--------|----------|
| `@hydrotik/eslint-config/base` | Node.js packages, servers, CLI tools |
| `@hydrotik/eslint-config/react-internal` | React packages, apps, Storybook |

## What's included

- **typescript-eslint** — TypeScript-aware linting (unified config)
- **@eslint-react** — React + hooks rules (ESLint 10 compatible)
- **eslint-config-prettier** — disables all formatting rules (Prettier handles formatting)
- **eslint-plugin-sonarjs** — code quality and cognitive complexity
- **eslint-plugin-turbo** — env var caching safety

## Usage

### Root `eslint.config.mjs`

```js
import { config as reactConfig } from '@hydrotik/eslint-config/react-internal';

export default [
  ...reactConfig,
  {
    ignores: ['**/dist/**', '**/.turbo/**'],
  },
];
```

### Non-React package

```js
import { config as baseConfig } from '@hydrotik/eslint-config/base';

export default [
  ...baseConfig,
];
```

## Design decisions

- **No formatting rules** — Prettier owns all formatting. `eslint-config-prettier` is applied last to disable any formatting rules that sneak in from plugins.
- **Warnings over errors** — Most rules are `warn` to avoid blocking development. CI can `--max-warnings 0` for strictness.
- **Relaxed test files** — `*.test.*`, `*.spec.*`, and `*.stories.*` files have relaxed rules (no `any` warnings, no complexity limits).
- **`*.css.ts` ignored** — vanilla-extract files are generated/co-generated and don't benefit from standard linting.
