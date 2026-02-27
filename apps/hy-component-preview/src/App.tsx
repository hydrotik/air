import React, { useState } from 'react';
import { useTheme } from '@hydrotik/theme-provider';
import {
  Button,
  Separator,
  TooltipProvider,
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
} from '@hydrotik/design-system';
import {
  ButtonsSection,
  BadgesSection,
  FormSection,
  CardsSection,
  TabsSection,
  OverlaysSection,
  TableSection,
} from './sections';

const sectionStyle: React.CSSProperties = {
  marginBottom: '32px',
};

const headingStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 600,
  marginBottom: '16px',
  opacity: 0.8,
};

interface PreviewSectionProps {
  title: string;
  children: React.ReactNode;
}

function PreviewSection({ title, children }: PreviewSectionProps) {
  return (
    <>
      <section style={sectionStyle}>
        <p style={headingStyle}>{title}</p>
        {children}
      </section>
      <Separator />
      <div style={{ height: '32px' }} />
    </>
  );
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <TooltipProvider>
      <ToastProvider>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '40px 24px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Hydrotik DS</h1>
              <p style={{ opacity: 0.6, marginTop: '4px', fontSize: '14px' }}>Component Preview</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '☀ Light' : '☾ Dark'}
            </Button>
          </div>

          <PreviewSection title="Buttons">
            <ButtonsSection />
          </PreviewSection>

          <PreviewSection title="Badges">
            <BadgesSection />
          </PreviewSection>

          <PreviewSection title="Form Controls">
            <FormSection />
          </PreviewSection>

          <PreviewSection title="Cards">
            <CardsSection />
          </PreviewSection>

          <PreviewSection title="Tabs">
            <TabsSection />
          </PreviewSection>

          <PreviewSection title="Overlays &amp; Popovers">
            <OverlaysSection onShowToast={() => setToastOpen(true)} />
          </PreviewSection>

          <PreviewSection title="Table">
            <TableSection />
          </PreviewSection>
        </div>

        <Toast open={toastOpen} onOpenChange={setToastOpen} variant="success" duration={3000}>
          <ToastTitle>Action complete</ToastTitle>
          <ToastDescription>Your changes were saved successfully.</ToastDescription>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </TooltipProvider>
  );
}
