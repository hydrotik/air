import React from 'react';
import { useTheme } from '@hydrotik/theme-provider';
import { Button, Separator, TooltipProvider } from '@hydrotik/design-system';
import { Sun, Moon, Github, ArrowRight } from 'lucide-react';
import {
  FieldDemo,
  EmptyAvatarGroup,
  SpinnerBadge,
  FieldSlider,
  InputGroupDemo,
  ItemDemo,
  InputGroupButton,
  ButtonGroupDemo,
  NotionPromptForm,
  AppearanceSettings,
  FieldHear,
  FieldCheckbox,
  ButtonGroupNested,
  ButtonGroupPopover,
  InputGroupTextarea,
  ButtonGroupInputGroup,
  ItemAvatar,
  EmptyInputGroup,
  SpinnerEmpty,
} from './cards';
import * as s from './App.css';

function cx(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <TooltipProvider>
      <div className={s.page}>
        {/* ─── Navbar ──────────────────────────────────────────────── */}
        <header className={s.navbar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em' }}>
              hydrotik
            </span>
            <span style={{ fontSize: '12px', opacity: 0.4, fontWeight: 500 }}>/&nbsp;design system</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => window.open('https://github.com/hydrotik/hydrotik', '_blank')}
              aria-label="GitHub"
            >
              <Github size={15} />
            </Button>
          </div>
        </header>

        {/* ─── Hero ────────────────────────────────────────────────── */}
        <section className={s.hero}>
          <h1 className={s.heroTitle}>
            The Foundation for your Design System
          </h1>
          <p className={s.heroSubtitle}>
            A set of beautifully designed components built with vanilla-extract tokens
            and Radix UI primitives. Dark theme first. Open source.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            <Button>
              Get Started <ArrowRight size={14} />
            </Button>
            <Button variant="outline">View Components</Button>
          </div>
        </section>

        {/* ─── Bento Grid (3-col, matching shadcn/ui homepage) ─────── */}
        <main className={s.bentoGrid}>
          {/* Row 1-2: FieldDemo (payment) spans 2 cols × 2 rows */}
          <div className={cx(s.cell, s.colSpan2, s.rowSpan2)}>
            <FieldDemo />
          </div>

          {/* Col 3 row 1: Empty avatar group */}
          <div className={s.cell}>
            <EmptyAvatarGroup />
          </div>

          {/* Col 3 row 2: Spinner badges */}
          <div className={s.cell}>
            <SpinnerBadge />
          </div>

          {/* Row 3: Field slider (col 3 carries over from row 2) */}
          {/* Actually per shadcn: FieldSlider is after SpinnerBadge in col 3, InputGroupDemo spans cols 1-2 */}
          <div className={cx(s.cell, s.colSpan2)}>
            <InputGroupDemo />
          </div>
          <div className={s.cell}>
            <FieldSlider />
          </div>

          {/* Row 4: InputGroupButton + ItemDemo */}
          <div className={s.cell}>
            <InputGroupButton />
          </div>
          <div className={cx(s.cell, s.colSpan2)}>
            <ItemDemo />
          </div>

          {/* Row 5: ButtonGroupDemo (span 2) + separator */}
          <div className={cx(s.cell, s.colSpan2)}>
            <ButtonGroupDemo />
          </div>

          {/* NotionPromptForm spans col 3, rows 5-7 */}
          <div className={cx(s.cell, s.rowSpan3)}>
            <NotionPromptForm />
          </div>

          {/* Row 6: Appearance Settings label + component */}
          <div className={s.sectionLabel}>Appearance Settings</div>
          <div className={cx(s.cell, s.rowSpan2)}>
            <AppearanceSettings />
          </div>

          {/* Row 7: FieldHear (survey) */}
          <div className={s.cell}>
            <FieldHear />
          </div>

          {/* Row 8: FieldCheckbox + ButtonGroupNested + ButtonGroupPopover */}
          <div className={s.cell}>
            <FieldCheckbox />
          </div>
          <div className={s.cell}>
            <ButtonGroupNested />
          </div>
          <div className={s.cell}>
            <ButtonGroupPopover />
          </div>

          {/* Row 9: InputGroupTextarea + ButtonGroupInputGroup + ItemAvatar */}
          <div className={s.cell}>
            <InputGroupTextarea />
          </div>
          <div className={s.cell}>
            <ButtonGroupInputGroup />
          </div>
          <div className={s.cell}>
            <ItemAvatar />
          </div>

          {/* Row 10: EmptyInputGroup (single) */}
          <div className={s.cell}>
            <EmptyInputGroup />
          </div>

          {/* Row 11: SpinnerEmpty (full width) */}
          <div className={cx(s.cell, s.colSpan3)}>
            <SpinnerEmpty />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
