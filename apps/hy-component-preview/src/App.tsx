import React from 'react';
import { useTheme } from '@hydrotik/theme-provider';
import { Button, TooltipProvider } from '@hydrotik/design-system';
import { Sun, Moon, Github, ArrowRight } from 'lucide-react';
import {
  PaymentCard,
  TeamCard,
  LoadingCard,
  PriceRangeCard,
  UrlInputCard,
  ProgressCard,
  InputStatesCard,
  TwoFactorCard,
  AlertCard,
  SettingsCard,
  PromptCard,
  SourceCard,
  ActionButtonsCard,
  TermsCard,
  CopilotCard,
  SurveyCard,
  ProcessingCard,
} from './cards';
import * as s from './App.css';

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

        {/* ─── Bento Grid ──────────────────────────────────────────── */}
        <main className={s.bentoGrid}>
          {/* Row 1: Payment (wide) + Team & Loading (narrow) */}
          <div className={s.span8}>
            <PaymentCard />
          </div>
          <div className={`${s.span4} ${s.stackColumn}`}>
            <TeamCard />
            <LoadingCard />
          </div>

          {/* Row 2: Price Range + URL Input + Progress */}
          <div className={s.span4}>
            <PriceRangeCard />
          </div>
          <div className={s.span4}>
            <UrlInputCard />
          </div>
          <div className={s.span4}>
            <ProgressCard />
          </div>

          {/* Row 3: Input States + 2FA + Alert */}
          <div className={s.span4}>
            <InputStatesCard />
          </div>
          <div className={s.span4}>
            <TwoFactorCard />
          </div>
          <div className={`${s.span4} ${s.centerContent}`}>
            <AlertCard />
          </div>

          {/* Row 4: Settings (wide) + Survey (narrow) */}
          <div className={s.span8}>
            <SettingsCard />
          </div>
          <div className={s.span4}>
            <SurveyCard />
          </div>

          {/* Row 5: Prompt + Source/Actions + Terms/Copilot */}
          <div className={s.span4}>
            <PromptCard />
          </div>
          <div className={`${s.span4} ${s.stackColumn}`}>
            <SourceCard />
            <ActionButtonsCard />
          </div>
          <div className={`${s.span4} ${s.stackColumn}`}>
            <TermsCard />
            <div className={s.centerPad}>
              <CopilotCard />
            </div>
          </div>

          {/* Row 6: Processing (centered) */}
          <div className={s.span6Center}>
            <ProcessingCard />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
