/* ═══════════════════════════════════════════════════════════════════════════ */
/* Editorial Data — High-density data journalism layout                       */
/* Recreates the visual structure and density of a forensic finance narrative  */
/* using our design system tokens and components. All text is obfuscated.      */
/* ═══════════════════════════════════════════════════════════════════════════ */

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  DataGrid,
  useDataGrid,
  ToggleGroup,
  ToggleGroupItem,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  SegmentedRatingBar,
  FlagTag,
} from '@hydrotik/design-system';
import type { ColumnDef } from '@hydrotik/design-system';
import * as s from './EditorialPage.css';

/* ─── Helpers ──────────────────────────────────────────────────────────── */
function fmt(n: number): string {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K';
  return '$' + n.toFixed(0);
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* TIMELINE CHART — Super Component                                       */
/* Interactive bar chart showing monthly/annual volume with event markers  */
/* ═══════════════════════════════════════════════════════════════════════ */

interface MonthData {
  month: string;
  label: string;
  amount: number;
  wires: number;
  year: number;
}

interface EventData {
  month: string;
  label: string;
  monthIndex: number;
}

// Generate obfuscated timeline data: 158 months from 2005-2018
const TIMELINE_DATA: MonthData[] = (() => {
  const data: MonthData[] = [];
  const startYear = 2005;
  const endYear = 2018;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let seed = 42;
  function seededRandom() { seed = (seed * 16807 + 0) % 2147483647; return seed / 2147483647; }

  for (let y = startYear; y <= endYear; y++) {
    for (let m = 0; m < 12; m++) {
      if (y === endYear && m > 5) break;
      const base = y <= 2008 ? 15e6 : y <= 2012 ? 8e6 : y <= 2015 ? 12e6 : 5e6;
      const spike = (y === 2007 && m >= 3 && m <= 8) ? 3 : (y === 2011 && m >= 1 && m <= 4) ? 2.5 : 1;
      const amount = Math.round(base * spike * (0.3 + seededRandom() * 1.4));
      const wires = Math.round(20 + seededRandom() * 80 * spike);
      data.push({
        month: `${y}-${String(m+1).padStart(2,'0')}`,
        label: `${months[m]} ${y}`,
        amount,
        wires,
        year: y,
      });
    }
  }
  return data;
})();

const TIMELINE_EVENTS: EventData[] = [
  { month: '2006-07', label: 'CASE OPENED', monthIndex: 18 },
  { month: '2008-06', label: 'SETTLEMENT', monthIndex: 41 },
  { month: '2011-01', label: 'FUND RESTRUCTURE', monthIndex: 72 },
  { month: '2013-09', label: 'AUDIT INITIATED', monthIndex: 104 },
  { month: '2015-03', label: 'BANK CLOSURE', monthIndex: 122 },
  { month: '2017-11', label: 'FILING SEALED', monthIndex: 154 },
];

const YEAR_DATA = (() => {
  const years: { year: number; amount: number; wires: number }[] = [];
  for (let y = 2005; y <= 2018; y++) {
    const yd = TIMELINE_DATA.filter(d => d.year === y);
    years.push({
      year: y,
      amount: yd.reduce((s, d) => s + d.amount, 0),
      wires: yd.reduce((s, d) => s + d.wires, 0),
    });
  }
  return years;
})();

function TimelineChart() {
  const [view, setView] = useState<'monthly' | 'annual'>('monthly');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const maxAmount = Math.max(...TIMELINE_DATA.map(d => d.amount));
  const chartWidth = TIMELINE_DATA.length * 7;

  const gridLines = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className={s.timelineBox}>
      <div className={s.timelineCtrl}>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => { if (v) setView(v as 'monthly' | 'annual'); }}
        >
          <ToggleGroupItem value="monthly" style={{ fontSize: '10px', padding: '3px 10px', letterSpacing: '1px', height: '26px', borderRadius: '2px' }}>
            MONTHLY
          </ToggleGroupItem>
          <ToggleGroupItem value="annual" style={{ fontSize: '10px', padding: '3px 10px', letterSpacing: '1px', height: '26px', borderRadius: '2px' }}>
            ANNUAL
          </ToggleGroupItem>
        </ToggleGroup>
        <div className={s.timelineCov}>
          <span className={s.timelineCovAccent}>7,897</span> dated records across <span className={s.timelineCovAccent}>158</span> months
        </div>
      </div>

      {view === 'monthly' ? (
        <>
          <div className={s.timelineScroll}>
            <div className={s.timelineChart} style={{ width: `${chartWidth}px`, minWidth: '100%' }}>
              {/* Grid lines */}
              {gridLines.map((pct) => (
                <React.Fragment key={pct}>
                  <div className={s.timelineGridLine} style={{ bottom: `${44 + (296 * pct)}px` }} />
                  <div className={s.timelineGridLabel} style={{ bottom: `${44 + (296 * pct)}px` }}>
                    {fmt(maxAmount * pct)}
                  </div>
                </React.Fragment>
              ))}

              {/* X axis */}
              <div className={s.timelineXAxis}>
                {Array.from({ length: 14 }, (_, i) => (
                  <div
                    key={2005 + i}
                    className={s.timelineYearLabel}
                    style={{ left: `${(i * 12 * 7) + 20}px` }}
                  >
                    {2005 + i}
                  </div>
                ))}
              </div>

              {/* Bars */}
              {TIMELINE_DATA.map((d, i) => {
                const height = Math.max(2, (d.amount / maxAmount) * 296);
                return (
                  <TooltipProvider key={d.month}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`${s.timelineBar} ${s.timelineBarPrimary}`}
                          style={{
                            left: `${i * 7 + 40}px`,
                            width: '5px',
                            height: `${height}px`,
                            opacity: hoveredBar === i ? 1 : 0.7,
                          }}
                          onMouseEnter={() => setHoveredBar(i)}
                          onMouseLeave={() => setHoveredBar(null)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                          <div style={{ fontWeight: 500 }}>{d.label}</div>
                          <div>{fmt(d.amount)} · {d.wires} records</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}

              {/* Event markers */}
              {TIMELINE_EVENTS.map((ev) => {
                const x = ev.monthIndex * 7 + 42;
                return (
                  <React.Fragment key={ev.month}>
                    <div className={s.timelineEventLine} style={{ left: `${x}px`, height: '296px' }} />
                    <div className={s.timelineEventDot} style={{ left: `${x - 4}px`, top: '8px' }} />
                    <div className={s.timelineEventFlag} style={{ left: `${x + 8}px`, top: '4px' }}>
                      {ev.label}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className={s.timelineHint}>← scroll to explore full timeline →</div>
        </>
      ) : (
        <div className={s.yearGrid}>
          {YEAR_DATA.map((yd) => (
            <div key={yd.year} className={`${s.yearCard} ${yd.amount < 30e6 ? s.yearCardDark : ''}`}>
              <div className={s.yearCardYear}>{yd.year}</div>
              <div className={s.yearCardAmount}>{fmt(yd.amount)}</div>
              <div className={s.yearCardWires}>{yd.wires} records</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* ENTITY ROSTER — Super Component (DataGrid-based)                       */
/* High-density names grid with rank, dollars, source rating pips          */
/* Uses our DataGrid with custom cell renderers for the editorial look     */
/* ═══════════════════════════════════════════════════════════════════════ */

interface RosterEntity {
  rank: number;
  name: string;
  category: string;
  dollars: number;
  flagged: boolean;
  sources: boolean[];
  clickable: boolean;
}

// Generate 69 obfuscated entities
const ROSTER_DATA: RosterEntity[] = (() => {
  const categories = ['Principal Subjects', 'Intermediaries', 'Fund Managers', 'Legal Counsel', 'Related Entities'];
  const firstNames = [
    'Aldric','Belen','Cassian','Delphine','Emeric','Fionnuala','Gareth','Heloise',
    'Isidore','Jovana','Kael','Lysandra','Maren','Nicanor','Orielle','Phelan',
    'Quillan','Rosalind','Severin','Thalia','Uriel','Valentina','Wren','Xandria',
    'Ysolde','Zephyr','Anselm','Briony','Cormac','Daria','Elara','Fabian',
    'Giselle','Henrik','Ilona','Jasper','Katarina','Leander','Mirabel','Nolan',
    'Octavia','Pavel','Rhiannon','Soren','Tamsin','Ulric','Vesper','Willem',
    'Avalon','Brennan','Cordelia','Dante','Elowen','Finnegan','Gaia','Hugo',
    'Ines','Jorik','Kira','Lachlan','Maeve','Nikolas','Orion','Petra',
    'Quintus','Runa','Stellan','Tova','Udo',
  ];
  const lastNames = [
    'Ashworth','Blackstone','Carrington','Drexel','Enright','Fairclough','Graystone',
    'Hargrove','Ingham','Jesperson','Kensington','Langford','Montclair','Northway',
    'Oxley','Pemberton','Queensbury','Rothwell','Stanhope','Thornfield','Underhill',
    'Valdez','Whitehall','Yardley','Ashford','Beaumont','Covington','Dalrymple',
    'Edgeworth','Fitzroy','Gloucester','Hawthorne','Iverston','Jolliffe','Kempton',
    'Lytton','Merriweather','Norcross','Oakeshott','Prescott','Quentin','Radcliffe',
    'Sutherland','Trevelyan','Upton','Vane','Wolseley','Exeter','Allerton','Brampton',
    'Cranbourne','Devereux','Elmsford','Falkner','Godwin','Holyrood','Inchbald','Jardine',
    'Kilburn','Lansdowne','Maitland','Nevinson','Oldfield','Paget','Rowntree','Sinclair',
    'Trelawney','Upchurch','Vickers',
  ];

  let seed = 73;
  function srand() { seed = (seed * 16807 + 0) % 2147483647; return seed / 2147483647; }

  return firstNames.slice(0, 69).map((fn, i) => {
    const cat = categories[Math.min(Math.floor(i / 14), 4)];
    const dollars = Math.round((srand() * 800 + 0.5) * 1e6 * (i < 10 ? 1 : i < 25 ? 0.4 : i < 45 ? 0.15 : 0.03));
    const flagged = srand() > 0.65;
    const sourceCount = Math.round(srand() * (i < 15 ? 7 : i < 35 ? 5 : i < 45 ? 4 : 2)) + (i < 15 ? 3 : 1);
    const sources = Array.from({ length: 10 }, (_, j) => j < Math.min(sourceCount, 10));
    return {
      rank: i + 1,
      name: `${fn} ${lastNames[i]}`,
      category: cat,
      dollars,
      flagged,
      sources,
      clickable: srand() > 0.4,
    };
  });
})();

/* ── Categorized entity roster (manual grid, not DataGrid) ── */
function EntityRosterSection() {
  const categories = [...new Set(ROSTER_DATA.map(e => e.category))];

  return (
    <div className={s.rosterWrap}>
      <div className={s.rosterHead}>
        <h3 className={s.rosterTitle}>The Names</h3>
        <Separator style={{ width: '60px', margin: '12px auto 0' }} />
        <div className={s.rosterSub}>69 entities of interest ranked across all data sources</div>
      </div>

      <div className={s.rosterLegend}>
        <div className={s.rosterLegendTitle}>Legend</div>
        <div className={s.rosterLegendItem}><span className={s.rosterLegendBold}>#</span> — Rank out of 2,000 scored entities. Lower = deeper footprint.</div>
        <div className={s.rosterLegendItem}><span className={s.rosterLegendBold}>Direct $</span> — Verified amounts from ledger records and transfer logs.</div>
        <div className={s.rosterLegendItem}><span className={s.rosterLegendBold}>Sources</span> — Lit squares = presence across 10 datasets (financials, transfers, filings, statements, reports, contacts, testimony, publications, records, archives).</div>
        <div className={s.rosterLegendItem}><span className={s.rosterLegendBold}>Blue names</span> — Clickable. Shows reference numbers from source documents.</div>
      </div>

      {categories.map((cat) => {
        const entities = ROSTER_DATA.filter(e => e.category === cat);
        return (
          <div key={cat} className={s.rosterCategory}>
            <div className={s.rosterCategoryHeader}>
              {cat}
              <span className={s.rosterCategoryCount}>{entities.length} entities</span>
            </div>
            <div className={s.rosterColHeaders}>
              <span style={{ textAlign: 'right' }}>#</span>
              <span>Name</span>
              <span style={{ textAlign: 'right' }}>Direct $</span>
              <span style={{ textAlign: 'center' }}>Sources</span>
            </div>
            <div className={s.rosterGrid}>
              {entities.map((ent) => (
                <div
                  key={ent.rank}
                  className={`${s.rosterRow} ${ent.flagged ? s.rosterRowHighlight : ''}`}
                >
                  <span className={s.rosterRank}>{ent.rank}</span>
                  <span className={`${s.rosterName} ${ent.clickable ? s.rosterNameClickable : ''} ${ent.flagged ? s.rosterNameHighlight : ''}`}>
                    {ent.name}
                    {ent.flagged && <FlagTag label="FLAG" />}
                  </span>
                  <span className={s.rosterDollars}>{fmt(ent.dollars)}</span>
                  <SegmentedRatingBar sources={ent.sources} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* ENTITY ROSTER — DataGrid Version (for the DataGrid section)            */
/* Shows same data but using the DataGrid component for enterprise feel   */
/* ═══════════════════════════════════════════════════════════════════════ */
function EntityDataGrid() {
  const columns: ColumnDef<RosterEntity>[] = useMemo(() => [
    {
      id: 'rank',
      header: '#',
      accessorKey: 'rank',
      width: 50,
      cell: ({ value }) => (
        <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '11px', opacity: 0.6 }}>
          {value}
        </span>
      ),
    },
    {
      id: 'name',
      header: 'Entity',
      accessorKey: 'name',
      width: 200,
      cell: ({ row }) => (
        <span style={{
          fontFamily: 'var(--font-family-mono)',
          fontSize: '12px',
          color: row.original.clickable ? 'var(--color-chart2, #60a5fa)' : 'inherit',
          cursor: row.original.clickable ? 'pointer' : 'default',
        }}>
          {row.original.name}
          {row.original.flagged && (
            <FlagTag label="FLAG" marginLeft="6px" />
          )}
        </span>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
      width: 140,
      cell: ({ value }) => (
        <Badge variant="secondary" style={{ fontSize: '10px', padding: '1px 6px' }}>
          {value}
        </Badge>
      ),
    },
    {
      id: 'dollars',
      header: 'Direct $',
      accessorKey: 'dollars',
      width: 100,
      cell: ({ value }) => (
        <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '11px', color: 'var(--color-primary, #3b82f6)' }}>
          {fmt(value as number)}
        </span>
      ),
    },
    {
      id: 'sources',
      header: 'Sources',
      accessorKey: 'sources',
      width: 90,
      cell: ({ row }) => <SegmentedRatingBar sources={row.original.sources} />,
    },
    {
      id: 'flagged',
      header: 'Status',
      accessorKey: 'flagged',
      width: 80,
      cell: ({ value }) => value ? (
        <Badge variant="destructive" style={{ fontSize: '9px', padding: '0 4px' }}>FLAGGED</Badge>
      ) : (
        <span style={{ fontSize: '9px', opacity: 0.4 }}>CLEAR</span>
      ),
    },
  ], []);

  return (
    <DataGrid
      data={ROSTER_DATA}
      columns={columns}
      enableSorting
      enableMultiSort
      enablePagination
      enableRowSelection
      enableGlobalFilter
      enableColumnResizing
      enableColumnVisibility
      showColumnFilters
      density="compact"
      height={480}
      pageSizeOptions={[15, 30, 50, 69]}
      initialState={{
        pagination: { pageIndex: 0, pageSize: 15 },
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* VEHICLE ENTITIES — Super Component                                     */
/* Grid of financial vehicles with role, description, volume              */
/* ═══════════════════════════════════════════════════════════════════════ */

interface VehicleEntity {
  name: string;
  role: string;
  description: string;
  volume: number;
}

const VEHICLE_DATA: VehicleEntity[] = [
  { name: 'Meridian Trust Co.', role: 'CENTRAL SHELL', description: 'Primary routing entity for tier-1 transfers', volume: 298_960_177 },
  { name: 'Austral Financial LLC', role: 'CENTRAL SHELL', description: 'High-volume inflow aggregator', volume: 227_036_879 },
  { name: 'Cirrus Holdings', role: 'SHELL', description: 'Secondary distribution vehicle', volume: 214_130_718 },
  { name: 'Benevolence Intl.', role: 'SHELL', description: 'Charitable entity with outflow gaps', volume: 66_149_177 },
  { name: 'Fiduciary Capital', role: 'SHELL', description: 'Mid-tier bridge entity', volume: 41_238_061 },
  { name: 'Chrysalis Trust', role: 'SHELL', description: 'Low-volume but high-connectivity', volume: 16_432_379 },
  { name: 'Apex Ventures LLC', role: 'SHELL', description: 'Small-transaction vehicle', volume: 1_322_777 },
  { name: 'NovaStar LLC', role: 'SHELL', description: 'Outflow-only entity', volume: 757_057 },
];

function VehicleSection() {
  return (
    <div style={{ marginTop: '24px' }}>
      <div className={s.rosterCategoryHeader}>
        Financial Vehicles
        <span className={s.rosterCategoryCount}>{VEHICLE_DATA.length} entities</span>
      </div>
      <div className={s.rosterColHeaders} style={{ gridTemplateColumns: '140px 90px 1fr 80px' }}>
        <span>Entity</span>
        <span>Role</span>
        <span>Description</span>
        <span style={{ textAlign: 'right' }}>Volume</span>
      </div>
      <div className={s.vehicleGrid}>
        {VEHICLE_DATA.map((v) => (
          <div key={v.name} className={s.vehicleRow}>
            <span className={s.vehicleName}>{v.name}</span>
            <span className={s.vehicleRole}>{v.role}</span>
            <span className={s.vehicleDesc}>{v.description}</span>
            <span className={s.vehicleVol}>{fmt(v.volume)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* SHELL ENTITY TABLE DATA (obfuscated)                                   */
/* ═══════════════════════════════════════════════════════════════════════ */
interface ShellEntity {
  name: string;
  inflows: string;
  outflows: string;
  net: string;
  wires: number;
}

const SHELL_DATA: ShellEntity[] = [
  { name: 'Meridian Trust Company', inflows: '$692.0M', outflows: '$642.9M', net: '+$49.1M', wires: 586 },
  { name: 'Cirrus Holdings', inflows: '$618.0M', outflows: '$698.0M', net: '−$79.9M', wires: 368 },
  { name: 'Austral Financial LLC', inflows: '$606.9M', outflows: '$194.7M', net: '+$412.3M', wires: 762 },
  { name: 'Blueprint LLC', inflows: '$119.7M', outflows: '$129.2M', net: '−$9.5M', wires: 96 },
  { name: 'Benevolence Intl.', inflows: '$102.9M', outflows: '$133.9M', net: '−$31.0M', wires: 252 },
  { name: 'Catalyst Inc.', inflows: '$18.0M', outflows: '$173.6M', net: '−$155.6M', wires: 81 },
  { name: 'Apex70 LLC', inflows: '$30.0M', outflows: '$131.5M', net: '−$101.5M', wires: 13 },
  { name: 'The 2017 Arbor Trust', inflows: '$45.0M', outflows: '$30.0M', net: '+$15.0M', wires: 12 },
];

/* ═══════════════════════════════════════════════════════════════════════ */
/* KEY PERSONS TABLE DATA (obfuscated)                                    */
/* ═══════════════════════════════════════════════════════════════════════ */
interface KeyPerson {
  name: string;
  volume: string;
  files: string;
  flagged: boolean;
}

const KEY_PERSONS: KeyPerson[] = [
  { name: 'Aldric Ashworth', volume: '$785.4M', files: '304,946', flagged: true },
  { name: 'Belen Blackstone', volume: '$507.9M', files: '3,951', flagged: true },
  { name: 'Cassian Carrington', volume: '$385.4M', files: '164', flagged: true },
  { name: 'Delphine Drexel', volume: '$328.5M', files: '4,413', flagged: true },
  { name: 'Emeric Enright', volume: '$250.8M', files: '1,723', flagged: false },
  { name: 'Fionnuala Fairclough', volume: '$44.2M', files: '10,854', flagged: false },
  { name: 'Gareth Graystone', volume: '$30.8M', files: '270', flagged: false },
  { name: 'Heloise Hargrove', volume: '$4.5M', files: '559', flagged: true },
  { name: 'Isidore Ingham', volume: '$3.8M', files: '1,186', flagged: false },
];

/* ═══════════════════════════════════════════════════════════════════════ */
/* SHELL ENTITY DataGrid (inline table replacement)                       */
/* ═══════════════════════════════════════════════════════════════════════ */
function ShellEntityGrid() {
  const columns: ColumnDef<ShellEntity>[] = useMemo(() => [
    { id: 'name', header: 'Shell Entity', accessorKey: 'name', width: 200 },
    {
      id: 'inflows', header: 'Inflows', accessorKey: 'inflows', width: 100,
      cell: ({ value }) => <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '12px', color: 'var(--color-primary, #3b82f6)' }}>{value}</span>,
    },
    {
      id: 'outflows', header: 'Outflows', accessorKey: 'outflows', width: 100,
      cell: ({ value }) => <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '12px', color: 'var(--color-primary, #3b82f6)' }}>{value}</span>,
    },
    {
      id: 'net', header: 'Net', accessorKey: 'net', width: 100,
      cell: ({ value }) => {
        const isNeg = String(value).startsWith('−');
        return (
          <span style={{
            fontFamily: 'var(--font-family-mono)', fontSize: '12px',
            color: isNeg ? 'var(--color-destructive, #ef4444)' : 'var(--color-success, #22c55e)',
          }}>
            {value}
          </span>
        );
      },
    },
    {
      id: 'wires', header: 'Wires', accessorKey: 'wires', width: 80,
      cell: ({ value }) => <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '12px', color: 'var(--color-primary, #3b82f6)' }}>{value}</span>,
    },
  ], []);

  return (
    <div className={s.dataTableWrap}>
      <DataGrid
        data={SHELL_DATA}
        columns={columns}
        enableSorting
        enablePagination={false}
        borderless
        density="editorial"
        headerBorder="thick"
        rowSeparator="subtle"
        transparent
        showToolbar={false}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* KEY PERSONS DataGrid                                                   */
/* ═══════════════════════════════════════════════════════════════════════ */
function KeyPersonsGrid() {
  const columns: ColumnDef<KeyPerson>[] = useMemo(() => [
    { id: 'name', header: 'Person', accessorKey: 'name', width: 200,
      cell: ({ row }) => (
        <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '12px' }}>
          {row.original.name}
        </span>
      ),
    },
    {
      id: 'volume', header: 'Volume', accessorKey: 'volume', width: 100,
      cell: ({ value }) => <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '12px', color: 'var(--color-primary, #3b82f6)' }}>{value}</span>,
    },
    {
      id: 'files', header: 'Files', accessorKey: 'files', width: 90,
      cell: ({ value }) => <span style={{ fontFamily: 'var(--font-family-mono)', fontSize: '12px', color: 'var(--color-primary, #3b82f6)' }}>{value}</span>,
    },
    {
      id: 'flagged', header: 'Report', accessorKey: 'flagged', width: 100,
      cell: ({ value }) => value ? (
        <FlagTag label="FLAGGED" marginLeft="0" />
      ) : null,
    },
  ], []);

  return (
    <div className={s.dataTableWrap}>
      <DataGrid
        data={KEY_PERSONS}
        columns={columns}
        enableSorting
        enablePagination={false}
        borderless
        density="editorial"
        headerBorder="thick"
        rowSeparator="subtle"
        transparent
        showToolbar={false}
      />
      <p className={s.dataTableNote}>
        Flags derived from <code className={s.dataTableCode}>compliance_match</code> column
        in <code className={s.dataTableCode}>fund_flows_audited</code> — transactions matched
        to regulatory suspicious activity report exhibits at MODERATE confidence or above.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* MAIN PAGE                                                              */
/* ═══════════════════════════════════════════════════════════════════════ */
export function EditorialPage() {
  return (
    <div className={s.page}>

      {/* ── HEADER ── */}
      <div className={s.header}>
        <div className={s.headerLabel}>Data Narrative 19 — Forensic Finance Project</div>
        <h1 className={s.headerTitle}>
          I Audited $2.1 Billion in Corporate Financial Records. Here's Every Name the{' '}
          <em className={s.headerTitleAccent}>Money Touched.</em>
        </h1>
        <div className={s.headerSubtitle}>
          The Season 1 finale. 10,964 transactions across 14 institutions, 8 shell entities, and 123 connected nodes.
        </div>
        <div className={s.headerAuthor}>Donovan Adams</div>
        <div className={s.headerDate}>February 2026</div>
      </div>

      {/* ── STATS BAR ── */}
      <div className={s.statsBar}>
        <div className={s.stat}><div className={s.statVal}>$2.146B</div><div className={s.statLabel}>Total Corpus</div></div>
        <div className={s.stat}><div className={s.statVal}>10,964</div><div className={s.statLabel}>Transactions</div></div>
        <div className={s.stat}><div className={s.statVal}>14</div><div className={s.statLabel}>Institutions</div></div>
        <div className={s.stat}><div className={s.statVal}>8</div><div className={s.statLabel}>Shell Entities</div></div>
        <div className={s.stat}><div className={s.statVal}>313</div><div className={s.statLabel}>Financial Links</div></div>
      </div>

      {/* ── NARRATIVE BODY ── */}
      <div className={s.container}>
        <div className={s.narrative}>

          <p className={s.leadText}>
            I started this project because the documents were public and the trail was cold. One file at a time, one name at a time. I wanted to do more than read them. I wanted to follow the money — across every wire, every shell, every institution — and find out where it all led. A shell upon a shell inside a shell.
          </p>

          <p className={s.bodyText}>
            Thousands of pages of wire transfer records, bank statements, clearing logs, canceled checks, and compliance narratives — all released by regulatory bodies and various court proceedings. The raw material for a forensic audit was sitting on government servers. So I built one.
          </p>

          <p className={s.bodyText}>
            Over the course of this project, I processed <a href="#" className={s.bodyLink}>10 distinct payment types</a> across 14 financial institutions. The <a href="#" className={s.bodyLink}>publication ledger</a> holds 10,964 unique transactions totaling $2.146 billion (Unverified). That figure breaks down into four tiers: $1.61 billion in wire transfers, clearing, and settlement transactions; $343 million in statement entries; $7.6 million in checks and cash instruments; and $185 million in contextual document references.
          </p>

          <p className={s.bodyText}>
            The first three tiers alone total $1.96 billion. That's 104.4% of the aggregate values reported in the institutions' own compliance filings. The data doesn't just corroborate the suspicious activity reports. It slightly exceeds them.
          </p>

          {/* VIZ LINK CARD */}
          <div className={s.vizLink}>
            <div className={s.vizLinkLabel}>Interactive Companion</div>
            <div className={s.vizLinkTitle}>Blueprint of a Financial Machine — Full Visualization</div>
            <div className={s.vizLinkDesc}>123 nodes, 313 edges. Click any entity for inflows, outflows, flags, and file references.</div>
          </div>

          {/* ── SECTION I: The Institutions ── */}
          <div className={s.sectionBreak}>
            <div className={s.sectionNum}>I</div>
            <h2 className={s.sectionTitle}>The Institutions</h2>
            <div className={s.sectionRule} />
          </div>

          <p className={s.bodyText}>
            Five institutions carried the bulk of the volume. Meridian Bank handled $851.9 million (Unverified). Apex Chase processed $670.8 million. Continental America moved $486.4 million. Harbor Bank handled $206.6 million. Northern Trust rounded out the top five at $86.7 million.
          </p>

          <p className={s.bodyText}>
            These aren't controversial claims. The institutions themselves filed the reports. Meridian Bank paid a <a href="#" className={s.bodyLink}>$150 million fine</a> to state regulators for compliance failures tied to these accounts. Apex Chase settled for $290 million in a class action and another $75 million with territorial authorities. The question was never whether the money moved. The question is where it went.
          </p>

          <p className={s.bodyText}>
            What the payment records show is that institutional money didn't go directly to subjects in most cases. It routed through a layer of shell entities first. Meridian Bank alone pushed $93.8 million into Cirrus Holdings across 72 wire transfers, $82.7 million into Austral Financial LLC across 103 wires, and $58.4 million into Meridian Trust Company across 44 wires.
          </p>

          <p className={s.bodyText}>
            The institutions were the on-ramp. The shells were the highway.
          </p>

          {/* ── SECTION II: The Shell Entities ── */}
          <div className={s.sectionBreak}>
            <div className={s.sectionNum}>II</div>
            <h2 className={s.sectionTitle}>The Shell Entities</h2>
            <div className={s.sectionRule} />
          </div>

          <p className={s.bodyText}>
            Eight shell entities sit at the center of this machine. Each one registered to key subjects or their associates. Each one receiving inflows from institutions and distributing outflows to operators and key persons. Together they touched $4.37 billion in gross volume (Unverified) — a number that includes both sides of inter-shell transfers, inflating the figure. The net corpus remains $2.146 billion.
          </p>

          {/* Shell entity DataGrid */}
          <ShellEntityGrid />

          <p className={s.bodyText}>
            Look at Austral Financial LLC. It took in $606.9 million and only pushed out $194.7 million. That's a $412.3 million net positive. Where is that money? It didn't leave through the documented wire transfer channels in the corpus. That's a forensic question worth asking.
          </p>

          <p className={s.bodyText}>
            Now look at Catalyst Inc. It shows $18 million in documented inflows but $173.6 million in outflows. That's $155.6 million more going out than coming in. The money had to enter from somewhere. The source documents either don't capture it, it came through a payment type not yet extracted, or it arrived through channels the releases don't cover.
          </p>

          <div className={s.pullQuote}>
            <p className={s.pullQuoteText}>
              The shells moved money between themselves 8 times, totaling $260.4 million. That's internal circulation with no external economic purpose visible in the documents.
            </p>
          </div>

          {/* ── SECTION III: The Operators ── */}
          <div className={s.sectionBreak}>
            <div className={s.sectionNum}>III</div>
            <h2 className={s.sectionTitle}>The Operators</h2>
            <div className={s.sectionRule} />
          </div>

          <p className={s.bodyText}>
            Between the shells and the key persons sits a layer of operators — legal counsel, accountants, and financial managers who physically executed the transactions. Eight names dominate this tier.
          </p>

          <p className={s.bodyText}>
            Aldric Ashworth handled $320.1 million in total volume. He's the most connected operator in the network with both inflows ($142.7 million) and outflows ($177.5 million). Ashworth served as the primary attorney and was named co-executor of the estate.
          </p>

          <div className={s.callout}>
            <div className={s.calloutLabel}>Operator Volume Summary</div>
            <p className={s.calloutText}>Aldric Ashworth: <span className={s.calloutFigure}>$320.1M</span> · Belen Blackstone: <span className={s.calloutFigure}>$294.0M</span></p>
            <p className={s.calloutText}>Cassian Carrington: <span className={s.calloutFigure}>$255.9M</span> · Delphine Drexel: <span className={s.calloutFigure}>$221.1M</span></p>
            <p className={s.calloutText}>Emeric Enright: <span className={s.calloutFigure}>$182.5M</span> · Fionnuala Fairclough: <span className={s.calloutFigure}>$147.0M</span></p>
            <p className={s.calloutText}>Gareth Graystone: <span className={s.calloutFigure}>$130.5M</span> · Heloise Hargrove: <span className={s.calloutFigure}>$107.7M</span></p>
          </div>

          {/* ── SECTION IV: Key Persons ── */}
          <div className={s.sectionBreak}>
            <div className={s.sectionNum}>IV</div>
            <h2 className={s.sectionTitle}>The Key Persons</h2>
            <div className={s.sectionRule} />
          </div>

          <p className={s.bodyText}>
            Nine names sit at the terminal end of this financial structure. These are the entities the money reached — or in some cases, the entities who fed money back into it.
          </p>

          {/* Key persons DataGrid */}
          <KeyPersonsGrid />

          <p className={s.bodyText}>
            The single largest direct institution-to-person flow in the network: Apex Chase sent $97.3 million to Cassian Carrington across 33 transactions. Carrington then shows $65.2 million flowing to Belen Blackstone in 55 payments. Meridian Bank sent another $36.5 million directly to Blackstone in 7 transfers.
          </p>

          {/* ── SECTION V: The Gaps ── */}
          <div className={s.sectionBreak}>
            <div className={s.sectionNum}>V</div>
            <h2 className={s.sectionTitle}>The Gaps</h2>
            <div className={s.sectionRule} />
          </div>

          <p className={s.bodyText}>
            A forensic accounting analysis looks at net positions and asks one question: where's the difference?
          </p>

          <p className={s.bodyText}>
            Austral Financial LLC has a $412.3 million net positive position. That means $412.3 million more entered the entity than left it through documented channels. Either the money is still in the account (unlikely for a dissolved entity), it exited through a payment type not captured in this corpus, or the outflow documents are sealed or redacted.
          </p>

          <p className={s.bodyText}>
            Across all 8 shell entities, total documented inflows are $2.23 billion and total documented outflows are $2.13 billion. The aggregate net position is roughly $99 million positive. But the entity-level gaps are far larger and cancel each other out in the aggregate — which is exactly what you'd expect in a structure designed to obscure the trail.
          </p>

          <div className={s.pullQuote}>
            <p className={s.pullQuoteText}>
              The aggregate balances. The entity-level books don't. That's not an accident. That's architecture.
            </p>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* TIMELINE — Super Component                                     */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className={s.wideContainer}>
        <div className={s.sectionBreak}>
          <div className={s.sectionNum}>THE TIMELINE</div>
          <h2 className={s.sectionTitle}>When the Money Moved</h2>
          <div className={s.sectionRule} />
        </div>
        <p className={s.bodyText} style={{ textAlign: 'center', marginBottom: '32px' }}>
          158 months of financial activity. 7,897 dated transactions. 6 red-flag events. Every bar is interactive.
        </p>

        <div className={s.timelineStats}>
          <div className={s.timelineStat}><div className={s.timelineStatVal}>10,964</div><div className={s.timelineStatLabel}>Transactions</div></div>
          <div className={s.timelineStat}><div className={s.timelineStatVal}>$2.146B</div><div className={s.timelineStatLabel}>Total Volume</div></div>
          <div className={s.timelineStat}><div className={s.timelineStatVal}>2005–2018</div><div className={s.timelineStatLabel}>Span</div></div>
          <div className={s.timelineStat}><div className={s.timelineStatVal}>1,008</div><div className={s.timelineStatLabel}>Entities</div></div>
        </div>

        <TimelineChart />

        {/* ── ENTITY ROSTER (manual high-density grid) ── */}
        <EntityRosterSection />

        {/* ── VEHICLE ENTITIES ── */}
        <VehicleSection />

        {/* ── Source Bar ── */}
        <div className={s.srcBar}>
          <div className={s.srcBarLabel}>Source Corpus</div>
          <div className={s.srcPills}>
            <div className={s.srcPill}><span className={s.srcPillAccent}>10,964</span> publication ledger</div>
            <div className={s.srcPill}><span className={s.srcPillAccent}>7,343</span> extracted payments</div>
            <div className={s.srcPill}><span className={s.srcPillAccent}>2,129</span> fund flows</div>
            <div className={s.srcPill}><span className={s.srcPillAccent}>1,011</span> statements</div>
            <div className={s.srcPill}><span className={s.srcPillAccent}>481</span> verified wires</div>
          </div>
        </div>

        {/* ── ENTITY DATAGRID (full DataGrid version) ── */}
        <div style={{ marginTop: '48px' }}>
          <div className={s.sectionBreak}>
            <div className={s.sectionNum}>INTERACTIVE</div>
            <h2 className={s.sectionTitle}>Entity Explorer</h2>
            <div className={s.sectionRule} />
          </div>
          <p className={s.bodyText} style={{ textAlign: 'center', marginBottom: '24px' }}>
            Full DataGrid view of all 69 entities. Sort, search, filter, resize columns, and select rows.
          </p>
          <EntityDataGrid />
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className={s.footer}>
        <p className={s.footerText}>
          Forensic Finance Project — Data Narrative 19<br />
          All analysis is independent and pro bono. The author has no affiliation with any party named in these documents.<br />
          Source: Regulatory transparency releases, court filings, compliance reports, travel manifests.<br />
          Repository: github.com/hydrotik/hydrotik
        </p>
        <p className={`${s.footerText} ${s.footerDisclaimer}`}>
          All dollar amounts are tagged (Unverified) and derived from publicly released documents subject to redaction and transcription variance.
          This is a design system demonstration with obfuscated data — not a real forensic analysis.
        </p>
      </div>
    </div>
  );
}
