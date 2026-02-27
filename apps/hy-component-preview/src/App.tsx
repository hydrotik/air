import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@hydrotik/theme-provider';
import {
  Button,
  Separator,
  ScrollArea,
  TooltipProvider,
} from '@hydrotik/design-system';
import { Sun, Moon, Github } from 'lucide-react';
import {
  ButtonsSection,
  BadgesSection,
  FormSection,
  CardsSection,
  TabsSection,
  OverlaysSection,
  TableSection,
  AccordionSection,
  AlertSection,
  TypographySection,
  FeedbackSection,
  NavigationSection,
  ToggleSection,
  AvatarSection,
} from './sections';

/** Section registry — drives both the sidebar nav and the content */
const sections = [
  { id: 'typography', label: 'Typography', component: TypographySection },
  { id: 'buttons', label: 'Button', component: ButtonsSection },
  { id: 'badges', label: 'Badge', component: BadgesSection },
  { id: 'cards', label: 'Card', component: CardsSection },
  { id: 'alerts', label: 'Alert', component: AlertSection },
  { id: 'accordion', label: 'Accordion', component: AccordionSection },
  { id: 'tabs', label: 'Tabs', component: TabsSection },
  { id: 'forms', label: 'Form Controls', component: FormSection },
  { id: 'table', label: 'Table', component: TableSection },
  { id: 'overlays', label: 'Overlays & Popover', component: OverlaysSection },
  { id: 'feedback', label: 'Feedback', component: FeedbackSection },
  { id: 'navigation', label: 'Navigation', component: NavigationSection },
  { id: 'toggles', label: 'Toggle & Kbd', component: ToggleSection },
  { id: 'avatars', label: 'Avatar & HoverCard', component: AvatarSection },
] as const;

function SidebarNav({
  activeId,
  onNavigate,
}: {
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          opacity: 0.4,
          padding: '8px 12px 6px',
        }}
      >
        Components
      </div>
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => onNavigate(s.id)}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '6px 12px',
            fontSize: '13px',
            fontWeight: activeId === s.id ? 600 : 400,
            color: 'inherit',
            opacity: activeId === s.id ? 1 : 0.6,
            background: activeId === s.id ? 'rgba(255,255,255,0.06)' : 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.15s',
            fontFamily: 'inherit',
          }}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const [activeId, setActiveId] = useState<string>(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  function handleNavigate(id: string) {
    setActiveId(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Intersection observer for scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 },
    );
    for (const el of Object.values(sectionRefs.current)) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <TooltipProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top bar */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: '52px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(14,15,17,0.85)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em' }}>hydrotik</span>
            <span style={{ fontSize: '12px', opacity: 0.4, fontWeight: 500 }}>/ design system</span>
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

        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <aside
            style={{
              width: '220px',
              flexShrink: 0,
              position: 'sticky',
              top: '52px',
              height: 'calc(100vh - 52px)',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              overflowY: 'auto',
              padding: '12px 8px',
            }}
          >
            <SidebarNav activeId={activeId} onNavigate={handleNavigate} />
          </aside>

          {/* Main content */}
          <main style={{ flex: 1, padding: '40px 48px', maxWidth: '960px' }}>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                Component Kitchen Sink
              </h1>
              <p style={{ fontSize: '15px', opacity: 0.5, marginTop: '6px' }}>
                Every component in the Hydrotik design system, styled with vanilla-extract tokens.
              </p>
            </div>

            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                ref={(el) => { sectionRefs.current[s.id] = el; }}
                style={{ scrollMarginTop: '80px' }}
              >
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    marginBottom: '16px',
                  }}
                >
                  {s.label}
                </h2>
                <s.component />
                {i < sections.length - 1 && (
                  <Separator style={{ margin: '40px 0' }} />
                )}
              </section>
            ))}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
