import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@hydrotik/design-system';
import { ArrowRight } from 'lucide-react';
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
} from '../cards';
import * as s from '../App.css';

function cx(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function HomePage() {
  return (
    <>
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
          <Button asChild>
            <Link to="/sink">
              View Components <ArrowRight size={14} />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard">Dashboard Example</Link>
          </Button>
        </div>
      </section>

      {/* ─── Bento Grid (3-col, matching shadcn/ui homepage) ─────── */}
      <main className={s.bentoGrid}>
        <div className={cx(s.cell, s.colSpan2, s.rowSpan2)}>
          <FieldDemo />
        </div>
        <div className={s.cell}>
          <EmptyAvatarGroup />
        </div>
        <div className={s.cell}>
          <SpinnerBadge />
        </div>
        <div className={cx(s.cell, s.colSpan2)}>
          <InputGroupDemo />
        </div>
        <div className={s.cell}>
          <FieldSlider />
        </div>
        <div className={s.cell}>
          <InputGroupButton />
        </div>
        <div className={cx(s.cell, s.colSpan2)}>
          <ItemDemo />
        </div>
        <div className={cx(s.cell, s.colSpan2)}>
          <ButtonGroupDemo />
        </div>
        <div className={cx(s.cell, s.rowSpan3)}>
          <NotionPromptForm />
        </div>
        <div className={s.sectionLabel}>Appearance Settings</div>
        <div className={cx(s.cell, s.rowSpan2)}>
          <AppearanceSettings />
        </div>
        <div className={s.cell}>
          <FieldHear />
        </div>
        <div className={s.cell}>
          <FieldCheckbox />
        </div>
        <div className={s.cell}>
          <ButtonGroupNested />
        </div>
        <div className={s.cell}>
          <ButtonGroupPopover />
        </div>
        <div className={s.cell}>
          <InputGroupTextarea />
        </div>
        <div className={s.cell}>
          <ButtonGroupInputGroup />
        </div>
        <div className={s.cell}>
          <ItemAvatar />
        </div>
        <div className={s.cell}>
          <EmptyInputGroup />
        </div>
        <div className={cx(s.cell, s.colSpan3)}>
          <SpinnerEmpty />
        </div>
      </main>
    </>
  );
}
