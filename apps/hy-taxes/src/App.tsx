import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useTheme } from '@hydrotik/theme-provider';
import {
  Avatar,
  AvatarFallback,
  Button,
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  SegmentedRatingBar,
  Spinner,
  toast,
} from '@hydrotik/design-system';
import {
  IconSun,
  IconMoon,
  IconDownload,
  IconCreditCard,
  IconBuildingBank,
  IconBolt,
  IconMusic,
  IconShoppingBag,
  IconPlane,
  IconDeviceDesktop,
  IconVinyl,
  IconWorld,
  IconCash,
  IconTransfer,
  IconCheck,
  IconSelector,
} from '@tabler/icons-react';
import { SiPaypal, SiBandcamp } from '@icons-pack/react-simple-icons';
import { loadTaxData } from './data';
import { formatCurrency } from './utils';
import { STATUS_LABELS, TAX_YEAR, USERS, USER_IDS } from './constants';
import type { UserId } from './types';
import { DeductionsView } from './views/DeductionsView';
import { UtilitiesView } from './views/UtilitiesView';
import { KimView } from './views/KimView';
import { EquipmentView } from './views/EquipmentView';
import { IncomeView } from './views/IncomeView';
import { StatusView } from './views/StatusView';
import { TaxDocsView } from './views/TaxDocsView';
import { W2View } from './views/W2View';
import { AddSourceDialog } from './components/AddSourceDialog';
import type { TaxData, SourceEntry, SourceStatus, SourceType } from './types';
import * as s from './App.css';

/** Source-specific icons for the sidebar */
const SOURCE_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  'xcel': IconCreditCard,
  'aa-mastercard': IconCreditCard,
  'amex': IconCreditCard,
  'jetblue': IconPlane,
  'sony-card': IconCreditCard,
  'best-buy': IconShoppingBag,
  'affirm': IconCash,
  'td-bills': IconBuildingBank,
  'td-shared': IconBuildingBank,
  'td-hydrotik': IconBuildingBank,
  'catapult': IconMusic,
  'navy-federal': IconBuildingBank,
  'paypal': SiPaypal,
  'fios': IconWorld,
  'ascap': IconMusic,
  'venmo': IconTransfer,
  'capitalone-ing': IconBuildingBank,
  'coned': IconBolt,
  'bandcamp': SiBandcamp,
  'vintage-king': IconVinyl,
  'perfect-circuit': IconDeviceDesktop,
  'reverb': IconVinyl,
  'sweetwater': IconVinyl,
};

function statusVariant(status: SourceStatus) {
  switch (status) {
    case 'complete': return 'default' as const;
    case 'downloaded': return 'secondary' as const;
    default: return 'outline' as const;
  }
}

export default function App() {
  const { theme, setTheme } = useTheme();
  const [activeUser, setActiveUser] = useState<UserId>('donovan');
  const [data, setData] = useState<TaxData | null>(null);
  const [activeSource, setActiveSource] = useState<string | null>(null);

  useEffect(() => {
    setData(null);
    setActiveSource(null);
    loadTaxData(activeUser).then(setData);
  }, [activeUser]);

  const user = USERS[activeUser];

  /* ─── Computed totals ──────────────────────────────────────────────── */

  const deductionTotal = useMemo(() => {
    if (!data) return 0;
    return data.deductions
      .filter((d) => d.status !== 'excluded')
      .reduce((sum, d) => sum + d.amount, 0);
  }, [data?.deductions]);

  const incomeTotal = useMemo(() => {
    if (!data) return 0;
    return data.income.reduce((sum, i) => sum + i.amount, 0);
  }, [data?.income]);

  const doneCount = useMemo(() => {
    if (!data) return 0;
    return data.sources.filter((s) => s.status === 'complete').length;
  }, [data?.sources]);

  /* ─── Data updaters (in-memory for now) ────────────────────────────── */

  const updateSources = useCallback((sources: SourceEntry[]) => {
    setData((prev) => (prev ? { ...prev, sources } : prev));
  }, []);

  const addSource = useCallback((input: { name: string; type: SourceType }) => {
    if (!data) return;
    const id = input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newSource: SourceEntry = {
      id,
      name: input.name,
      type: input.type,
      status: 'not_started',
      files: [],
    };
    updateSources([...data.sources, newSource]);
    toast.success('Source added', { description: input.name });
  }, [data, updateSources]);

  const updateData = useCallback(<K extends keyof TaxData>(key: K, value: TaxData[K]) => {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
  }, []);

  /* ─── Loading ──────────────────────────────────────────────────────── */

  if (!data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className={s.appShell}>
      {/* ─── Top bar ──────────────────────────────────────────────── */}
      <header className={s.topBar}>
        <div className={s.topBarLeft}>
          <span className={s.appTitle}>hy-taxes</span>
          <span className={s.yearBadge}>{TAX_YEAR}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* ─── Account Switcher (shadcn pattern) ─── */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 8px 4px 4px',
                  borderRadius: 8,
                  border: '1px solid color-mix(in srgb, var(--border) 60%, transparent)',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--foreground)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'color-mix(in srgb, var(--accent) 50%, transparent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <Avatar size="sm">
                  <AvatarFallback
                    style={{
                      background: user.color,
                      color: 'white',
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{user.name}</span>
                  {user.business && (
                    <span style={{ fontSize: 9, opacity: 0.5, fontFamily: 'monospace' }}>{user.business}</span>
                  )}
                </div>
                <IconSelector size={14} style={{ opacity: 0.4, marginLeft: 4 }} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={{ minWidth: 200 }}>
              <DropdownMenuLabel style={{ fontSize: 11, fontWeight: 500, opacity: 0.5 }}>
                Switch account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {USER_IDS.map((uid) => {
                const u = USERS[uid];
                const isActive = uid === activeUser;
                return (
                  <DropdownMenuItem
                    key={uid}
                    onClick={() => setActiveUser(uid)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px' }}
                  >
                    <Avatar size="sm">
                      <AvatarFallback
                        style={{
                          background: isActive ? u.color : 'color-mix(in srgb, var(--foreground) 15%, transparent)',
                          color: isActive ? 'white' : 'var(--muted-foreground)',
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      >
                        {u.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                      <span style={{ fontSize: 12, fontWeight: isActive ? 600 : 400 }}>{u.name}</span>
                      {u.business && (
                        <span style={{ fontSize: 9, opacity: 0.45, fontFamily: 'monospace' }}>{u.business}</span>
                      )}
                    </div>
                    {isActive && <IconCheck size={14} style={{ opacity: 0.6 }} />}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm">
            <IconDownload size={14} />
            Export
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
          </Button>
        </div>
      </header>

      {/* ─── Body: sidebar + main ─────────────────────────────────── */}
      <div className={s.bodyLayout}>
        {/* ─── Sidebar ──────────────────────────────────────────── */}
        <aside className={s.sidebarArea}>
          <div className={s.sidebarScroll}>
            <div style={{ padding: '0 16px 8px', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.4 }}>
              Sources
            </div>
            {data.sources.map((source) => (
              <div
                key={source.id}
                className={`${s.sourceItem} ${activeSource === source.id ? s.sourceItemActive : ''}`}
                onClick={() => setActiveSource(activeSource === source.id ? null : source.id)}
              >
                <div className={s.sourceAvatar}>
                  {(() => {
                    const Icon = SOURCE_ICONS[source.id];
                    return Icon ? <Icon size={14} /> : source.name.slice(0, 2);
                  })()}
                </div>
                <span className={s.sourceName}>{source.name}</span>
                <Badge variant={statusVariant(source.status)} className="text-[9px]">
                  {STATUS_LABELS[source.status]}
                </Badge>
              </div>
            ))}

            <Separator style={{ margin: '12px 0' }} />

            {/* Summary */}
            <div className={s.sidebarSummary}>
              <SegmentedRatingBar
                sources={data.sources.map((src) => src.status === 'complete')}
                size="md"
                color="primary"
              />
              <div style={{ fontSize: 11, opacity: 0.4, marginTop: 4 }}>
                {doneCount}/{data.sources.length} sources done
              </div>

              <div className={s.summaryRow}>
                <div className={s.summaryLabel}>Deductions</div>
                <div className={s.summaryValue}>{formatCurrency(deductionTotal)}</div>
              </div>
              <div className={s.summaryRow}>
                <div className={s.summaryLabel}>Income</div>
                <div className={s.summaryValue}>{formatCurrency(incomeTotal)}</div>
              </div>
            </div>
          </div>

          <div className={s.sidebarFooterArea}>
            <AddSourceDialog onAdd={addSource} />
          </div>
        </aside>

        {/* ─── Main Content ─────────────────────────────────────── */}
        <main className={s.mainContent}>
          <Tabs defaultValue="deductions">
            <div className={s.tabBar}>
              <TabsList>
                <TabsTrigger value="deductions">Deductions</TabsTrigger>
                <TabsTrigger value="utilities">Utilities</TabsTrigger>
                <TabsTrigger value="kim">Kim</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="w2s">W-2s</TabsTrigger>
                <TabsTrigger value="taxdocs">Tax Docs</TabsTrigger>
                <TabsTrigger value="status">Status</TabsTrigger>
              </TabsList>
            </div>

            <div className={s.tabContent}>
              <TabsContent value="deductions">
                <DeductionsView
                  deductions={data.deductions}
                  sources={data.sources}
                  activeSource={activeSource}
                  onChange={(d) => updateData('deductions', d)}
                />
              </TabsContent>

              <TabsContent value="utilities">
                <UtilitiesView
                  utilities={data.utilities}
                  onChange={(u) => updateData('utilities', u)}
                />
              </TabsContent>

              <TabsContent value="kim">
                <KimView
                  kim={data.kim}
                  onChange={(k) => updateData('kim', k)}
                />
              </TabsContent>

              <TabsContent value="equipment">
                <EquipmentView
                  equipment={data.equipment}
                  onChange={(e) => updateData('equipment', e)}
                />
              </TabsContent>

              <TabsContent value="income">
                <IncomeView
                  income={data.income}
                  onChange={(i) => updateData('income', i)}
                />
              </TabsContent>

              <TabsContent value="w2s">
                <W2View
                  w2s={data.w2s}
                  onChange={(w) => updateData('w2s', w)}
                />
              </TabsContent>

              <TabsContent value="taxdocs">
                <TaxDocsView
                  taxDocs={data.taxDocs}
                  onChange={(t) => updateData('taxDocs', t)}
                />
              </TabsContent>

              <TabsContent value="status">
                <StatusView
                  sources={data.sources}
                  onChange={updateSources}
                />
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
