# Hydrotik Design System

## Overview

The Hydrotik design system is a **CSS-in-TypeScript** component library built on:

| Layer | Technology |
|---|---|
| Design tokens | `@vanilla-extract/css` `createThemeContract` + `createTheme` |
| Theming | `@hydrotik/theme-provider` React context + `data-theme` attribute |
| Components | Radix UI primitives + vanilla-extract styles |
| Variants | `@vanilla-extract/recipes` |

No Tailwind. No runtime CSS injection. All styles are statically extracted at build time.

---

## Token System (`@hydrotik/tokens`)

### Architecture

```
createThemeContract(contract)   →  vars (typed CSS variable references)
createTheme(contract, darkMap)  →  darkThemeClass (CSS class with :root vars)
createTheme(contract, lightMap) →  lightThemeClass (CSS class with :root vars)
```

`vars` is a strongly-typed object. All components import `vars` and reference tokens like `vars.color.primary`, `vars.font.size.md`, etc. **No raw hex values appear in component files.**

### Token Categories

```ts
vars.color.primary          // brand primary
vars.color.primaryHover     // hover state for primary actions
vars.color.text             // default text
vars.color.textMuted        // secondary / subdued text
vars.color.background       // page background
vars.color.surface          // card / panel surface
vars.color.border           // default border
vars.color.focusRing        // keyboard focus outline
vars.color.ghostHover       // hover bg for ghost/subtle elements
vars.color.error            // error/danger
vars.color.errorBg          // error background tint
vars.color.success          // success
vars.color.warning          // warning / amber
vars.color.info             // informational blue

vars.font.family.sans       // sans-serif stack
vars.font.family.mono       // monospace stack
vars.font.size.xs | sm | md | lg | xl | 2xl | 3xl
vars.font.weight.normal | medium | semibold | bold
vars.font.lineHeight.tight | normal | relaxed

vars.space[1..10]           // spacing scale (0.25rem increments)

vars.radius.sm | md | lg | full

vars.shadow.sm | md | lg

vars.zIndex.dropdown | modal | tooltip | toast
```

### Adding/Changing Tokens

1. Update the contract in `packages/hy-tokens/src/contract.css.ts`
2. Update both theme maps: `dark.css.ts` and `light.css.ts`
3. Rebuild: `pnpm build --filter @hydrotik/tokens`

---

## Theme Provider (`@hydrotik/theme-provider`)

### Usage

```tsx
import { ThemeProvider } from '@hydrotik/theme-provider';

function Root() {
  return (
    <ThemeProvider defaultTheme="light">
      <App />
    </ThemeProvider>
  );
}
```

### `useTheme` hook

```tsx
import { useTheme } from '@hydrotik/theme-provider';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
}
```

### `ThemeScript` (prevent flash of unstyled theme)

For SSR/SSG contexts, render `ThemeScript` inside `<head>` before any content. It reads `localStorage.theme` and applies the correct `data-theme` attribute synchronously before paint.

```tsx
import { ThemeScript } from '@hydrotik/theme-provider';

// In your _document or root layout:
<head>
  <ThemeScript />
</head>
```

### How it works

`ThemeProvider` applies a CSS class (`darkThemeClass` or `lightThemeClass` from `@hydrotik/tokens`) to the `<html>` element. vanilla-extract maps the CSS variables in that class to the correct theme values. Switching themes swaps the class → all `vars.*` tokens update via CSS custom properties, no JS re-render needed for styles.

---

## Component Catalog

All components live in `packages/hy-design-system/src/components/`.
All components:
- Use `React.forwardRef`
- Accept `className` prop (merged via utility)
- Only reference `vars.*` tokens (no hardcoded colors)
- Are exported from `@hydrotik/design-system`

### Button

```tsx
<Button variant="primary" size="md" onClick={...}>Submit</Button>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "danger"` | `"primary"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `disabled` | `boolean` | — |
| All native `<button>` props | — | — |

---

### Input

```tsx
<Input placeholder="Enter email" type="email" />
```

Accepts all native `<input>` props. Styled with focus ring from `vars.color.focusRing`.

---

### Textarea

```tsx
<Textarea rows={4} placeholder="Write a message..." />
```

Accepts all native `<textarea>` props.

---

### Label

```tsx
<Label htmlFor="email">Email address</Label>
```

Thin wrapper over `@radix-ui/react-label` with token-based typography.

---

### FieldMessage

```tsx
<FieldMessage variant="error">This field is required.</FieldMessage>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `"default" \| "error" \| "success"` | `"default"` |

---

### Card

```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Content>Body</Card.Content>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

Or with props:

```tsx
<Card padding="lg" shadow="md">Content</Card>
```

---

### Badge

```tsx
<Badge variant="success" size="sm">Active</Badge>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `"default" \| "primary" \| "success" \| "warning" \| "error"` | `"default"` |
| `size` | `"sm" \| "md"` | `"md"` |

---

### Separator

```tsx
<Separator orientation="horizontal" />
<Separator orientation="vertical" />
```

Built on `@radix-ui/react-separator`.

---

### Tabs

```tsx
<Tabs defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account content</Tabs.Content>
  <Tabs.Content value="settings">Settings content</Tabs.Content>
</Tabs>
```

Built on `@radix-ui/react-tabs`.

---

### Dialog

```tsx
<Dialog>
  <Dialog.Trigger asChild>
    <Button>Open</Button>
  </Dialog.Trigger>
  <Dialog.Content title="Confirm action">
    <p>Are you sure?</p>
    <Dialog.Footer>
      <Dialog.Close asChild><Button variant="ghost">Cancel</Button></Dialog.Close>
      <Button variant="danger">Delete</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>
```

Built on `@radix-ui/react-dialog`. Includes focus trap and scroll lock automatically.

---

### Select

```tsx
<Select onValueChange={setValue}>
  <Select.Trigger placeholder="Choose..." />
  <Select.Content>
    <Select.Item value="a">Option A</Select.Item>
    <Select.Item value="b">Option B</Select.Item>
  </Select.Content>
</Select>
```

Built on `@radix-ui/react-select`.

---

### DropdownMenu

```tsx
<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button variant="ghost">Actions</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item onSelect={handleEdit}>Edit</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onSelect={handleDelete}>Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
```

Built on `@radix-ui/react-dropdown-menu`.

---

### Popover

```tsx
<Popover>
  <Popover.Trigger asChild>
    <Button variant="secondary">Info</Button>
  </Popover.Trigger>
  <Popover.Content>
    <p>Additional details here.</p>
  </Popover.Content>
</Popover>
```

Built on `@radix-ui/react-popover`.

---

### Tooltip

```tsx
<Tooltip content="This is a tooltip">
  <Button variant="ghost">Hover me</Button>
</Tooltip>
```

Built on `@radix-ui/react-tooltip`. `TooltipProvider` is included in the component — no extra wrapping needed.

---

### Toast

Toast uses a provider + hook pattern:

```tsx
// In your app root:
import { ToastProvider } from '@hydrotik/design-system';

function Root() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}

// In any component:
import { useToast } from '@hydrotik/design-system';

function Demo() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ title: 'Saved', variant: 'success' })}>
      Save
    </Button>
  );
}
```

| Toast prop | Type | Options |
|---|---|---|
| `title` | `string` | — |
| `description` | `string` | optional |
| `variant` | `string` | `"default" \| "success" \| "error" \| "warning"` |
| `duration` | `number` | ms, default 4000 |

Built on `@radix-ui/react-toast`.

---

### Table

```tsx
<Table>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Status</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Alice</Table.Cell>
      <Table.Cell><Badge variant="success">Active</Badge></Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

---

## CSS-in-TypeScript Patterns

### Style recipe (variants)

```ts
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@hydrotik/tokens';

export const buttonRecipe = recipe({
  base: {
    borderRadius: vars.radius.md,
    fontWeight: vars.font.weight.medium,
  },
  variants: {
    variant: {
      primary: { backgroundColor: vars.color.primary },
      ghost: { backgroundColor: 'transparent' },
    },
    size: {
      sm: { padding: `${vars.space[2]} ${vars.space[3]}` },
      md: { padding: `${vars.space[3]} ${vars.space[4]}` },
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});
```

### Global styles

```ts
import { globalStyle } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

// In global.css.ts — applied at app level
globalStyle('body', {
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.family.sans,
});
```

**Note:** `globalStyle` calls cannot be nested inside `@media` top-level calls. Use selector nesting with the `selectors` key or `@media` within a single `style()` block instead.
