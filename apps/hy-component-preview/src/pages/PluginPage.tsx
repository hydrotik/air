import React from 'react';
import {
  Button,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hydrotik/design-system';
import { vars } from '@hydrotik/tokens';
import {
  IconDownload,
  IconPlayerPlay,
  IconActivity,
  IconWaveSine,
  IconRipple,
  IconChartBar,
  IconClock,
  IconAntenna,
  IconScan,
  IconBolt,
  IconCheck,
  IconDeviceDesktop,
  IconMusic,
  IconHeadphones,
  IconMicrophone,
  IconMicrophone2,
  IconShield,
  IconArrowRight,
  IconSparkles,
  IconEye,
  IconChevronRight,
  IconPointFilled,
} from '@tabler/icons-react';
import * as s from './PluginPage.css';

/* ─── Data ─── */

const FEATURES = [
  {
    icon: <IconWaveSine size={20} />,
    title: 'Dual-Resolution Spectrum',
    desc: 'Blended 32K + 4K FFT delivers 1.5 Hz bass detail AND transient-sharp highs. No mode switching needed.',
  },
  {
    icon: <IconRipple size={20} />,
    title: 'Scrolling Spectrogram',
    desc: 'Time-frequency display with 4 scientific colormaps (Magma, Inferno, Viridis, Plasma). 2D or 3D waterfall.',
  },
  {
    icon: <IconPointFilled size={20} />,
    title: 'Lissajous Vectorscope',
    desc: '5 modes: L/R, Mid/Side, RTW polar, multi-band view, and mono compatibility indicator.',
  },
  {
    icon: <IconChartBar size={20} />,
    title: 'EBU R128 Loudness',
    desc: 'Momentary, Short-term, Integrated LUFS with histogram, LRA, and 7 target presets.',
  },
  {
    icon: <IconClock size={20} />,
    title: 'Timeline Loudness',
    desc: 'Scrolling loudness history with M/S/I traces, clip markers, and hover tooltip readouts.',
  },
  {
    icon: <IconActivity size={20} />,
    title: 'Volume Metering',
    desc: 'VU & PPM ballistics with Katz scales (FS, K-20, K-14, K-12). Per-channel peak hold.',
  },
  {
    icon: <IconAntenna size={20} />,
    title: 'Stereo Radar',
    desc: 'Polar display showing real-time stereo field distribution and image rotation.',
  },
  {
    icon: <IconScan size={20} />,
    title: 'Panoramic Spectrum',
    desc: 'Frequency-dependent stereo width — see which frequencies are panned left, center, or right.',
  },
  {
    icon: <IconBolt size={20} />,
    title: 'Bit Monitor & DC Offset',
    desc: 'Active bit display for true resolution detection. Per-channel DC offset metering.',
  },
];

const STATS = [
  { value: '10', label: 'Analysis Panels' },
  { value: '1.5 Hz', label: 'Bass Resolution' },
  { value: '0 ms', label: 'Latency' },
  { value: '4', label: 'Plugin Formats' },
];

const SPECS_ANALYSIS = [
  ['FFT Resolution (Low)', '1.5 Hz @ 48 kHz (32,768 samples)'],
  ['FFT Resolution (High)', '11.7 Hz @ 48 kHz (4,096 samples)'],
  ['Loudness Standard', 'EBU R128 (M / S / I)'],
  ['A-Weighting', 'IEC 61672-1'],
  ['Smoothing Modes', 'Raw, 1/12, 1/24, 1/48 octave'],
  ['Frequency Scales', 'Logarithmic, Octave, Mel'],
];

const SPECS_SYSTEM = [
  ['Audio Passthrough', 'Bit-transparent, 0 ms, 0 dB'],
  ['Channels', 'Stereo (mono compatible)'],
  ['Window Size', '900×600 – 2560×1440'],
  ['Architecture', 'Universal (Apple Silicon + Intel)'],
  ['Platform', 'macOS'],
  ['Framework', 'JUCE 8, C++17'],
];

const HOSTS = [
  { name: 'Logic Pro', format: 'AU' },
  { name: 'Ableton Live', format: 'AU, VST3' },
  { name: 'Reaper', format: 'AU, VST3' },
  { name: 'Pro Tools', format: 'AAX' },
  { name: 'Standalone', format: '—' },
];

const USE_CASES = [
  {
    icon: <IconHeadphones size={18} />,
    title: 'Mixing',
    quote:
      'The dual-resolution spectrum shows exactly where frequencies build up — 1.5 Hz resolution means you can see the difference between a kick at 55 Hz and a bass at 58 Hz. The velocity overlay highlights which frequencies are changing.',
  },
  {
    icon: <IconMusic size={18} />,
    title: 'Mastering',
    quote:
      'Set your target LUFS for the platform — Spotify (-14), Apple Music (-16), broadcast (-24) — and watch integrated loudness converge in real time. The histogram reveals whether your dynamics are healthy or crushed.',
  },
  {
    icon: <IconMicrophone2 size={18} />,
    title: 'Broadcast & Post',
    quote:
      'EBU R128 compliance in one glance. Momentary, short-term, and integrated LUFS with LRA. A-weighted spectrum for perceptual monitoring. Clip markers flag every true-peak overshoot.',
  },
  {
    icon: <IconMicrophone size={18} />,
    title: 'Sound Design',
    quote:
      'The spectrogram with spectral reassignment shows exactly where harmonics sit and how they evolve. The multi-band vectorscope shows stereo movement across frequency bands.',
  },
];

const COMPARISON = [
  {
    feature: 'Dual-resolution FFT',
    tectra: true,
    hawkeye: false,
    insight: false,
  },
  {
    feature: 'Velocity overlay',
    tectra: true,
    hawkeye: false,
    insight: false,
  },
  {
    feature: 'Multi-band vectorscope',
    tectra: true,
    hawkeye: false,
    insight: true,
  },
  {
    feature: 'Delta / target curve',
    tectra: true,
    hawkeye: false,
    insight: false,
  },
  {
    feature: 'Frequency markers',
    tectra: true,
    hawkeye: false,
    insight: false,
  },
  {
    feature: 'Piano keybed overlay',
    tectra: true,
    hawkeye: false,
    insight: false,
  },
  {
    feature: '7 loudness presets',
    tectra: true,
    hawkeye: true,
    insight: true,
  },
  {
    feature: 'Preset system',
    tectra: true,
    hawkeye: true,
    insight: true,
  },
  {
    feature: 'Surround / Immersive',
    tectra: false,
    hawkeye: false,
    insight: true,
  },
  {
    feature: '4 scientific colormaps',
    tectra: true,
    hawkeye: false,
    insight: false,
  },
];

const FEATURE_BULLETS = [
  '10 analysis panels in one window',
  'Dual-resolution FFT (1.5 Hz bass detail)',
  'EBU R128 loudness (M/S/I + histogram + LRA)',
  '4 scientific spectrogram colormaps',
  'Lissajous vectorscope with 5 modes',
  'Katz metering scales (FS/K-12/K-14/K-20)',
  'A-weighting (IEC 61672-1)',
  '1/3 octave ISO band view',
  'Velocity overlay (spectral change detection)',
  'Frequency markers & range measurement',
  '7 loudness target presets',
  'Timeline loudness with clip markers',
  'Bit-transparent passthrough',
  'Zero latency, zero gain change',
  'AU, VST3, AAX, Standalone',
  'Universal binary (Apple Silicon + Intel)',
  'Resizable 900×600 to 2560×1440',
  'Save/recall analysis presets',
  'Built-in help tooltips',
  'macOS native',
];

/* ─── Component ─── */

export function PluginPage() {
  return (
    <div className={s.wrapper}>
      {/* ─── Hero ─── */}
      <section className={s.hero}>
        <div className={s.heroBadge}>
          <IconSparkles size={12} />
          Now available for macOS
        </div>

        <h1 className={s.heroTitle}>
          <span className={s.heroAccent}>See everything.</span>
          <br />
          Change nothing.
        </h1>

        <p className={s.heroSubtitle}>
          TectraScope is a clinical, high-performance audio analysis suite for
          DAWs and standalone use — combining spectrum, spectrogram, phase,
          loudness, and metering in a single window.
        </p>

        <div className={s.heroCtas}>
          <Button size="lg">
            <IconDownload size={16} />
            Download Free Trial
          </Button>
          <Button variant="outline" size="lg">
            <IconPlayerPlay size={16} />
            Watch Demo
          </Button>
        </div>

        <div className={s.formatRow}>
          <Badge variant="secondary">AU</Badge>
          <Badge variant="secondary">VST3</Badge>
          <Badge variant="secondary">AAX</Badge>
          <Badge variant="secondary">Standalone</Badge>
          <Separator
            orientation="vertical"
            style={{ height: '16px', margin: '0 4px' }}
          />
          <Badge variant="outline">Universal Binary</Badge>
        </div>
      </section>

      {/* ─── Hero Image ─── */}
      <div className={s.heroImageWrapper}>
        <div className={s.heroGlow} />
        <img
          src="/tectrascope-hero.png"
          alt="TectraScope audio analysis plugin showing spectrum analyzer, spectrogram, Lissajous vectorscope, loudness metering, and timeline"
          className={s.heroImage}
        />
      </div>

      {/* ─── Stats ─── */}
      <section className={s.section}>
        <div className={s.statsGrid}>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className={s.statValue}>{stat.value}</div>
              <div className={s.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionHeading}>
            Every frequency. Every channel. Every detail.
          </h2>
          <p className={s.sectionSubheading}>
            Ten analysis panels working together in a single unified window. No
            compromises, no mode switching.
          </p>
        </div>

        <div className={s.featureGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={s.featureCard}>
              <div className={s.featureIcon}>{f.icon}</div>
              <div className={s.featureTitle}>{f.title}</div>
              <div className={s.featureDesc}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Feature Bullets ─── */}
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionHeading}>Everything included</h2>
          <p className={s.sectionSubheading}>
            One plugin. No add-ons. No subscriptions. Every feature from day
            one.
          </p>
        </div>

        <div className={s.bulletGrid}>
          {FEATURE_BULLETS.map((bullet) => (
            <div key={bullet} className={s.bulletItem}>
              <IconCheck size={16} className={s.bulletCheck} />
              {bullet}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Comparison ─── */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionHeading}>How TectraScope compares</h2>
          <p className={s.sectionSubheading}>
            Feature-for-feature comparison with leading audio analysis tools.
          </p>
        </div>

        <Card>
          <CardContent style={{ padding: 0 }}>
            <div className={s.comparisonWrapper}>
              <table className={s.comparisonTable}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>TectraScope</th>
                    <th>SPL HawkEye</th>
                    <th>iZotope Insight 2</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td>
                        {row.tectra ? (
                          <IconCheck size={16} style={{ color: vars.color.chart3 }} />
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>
                        {row.hawkeye ? (
                          <IconCheck size={16} style={{ color: vars.color.chart3 }} />
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>
                        {row.insight ? (
                          <IconCheck size={16} style={{ color: vars.color.chart3 }} />
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ─── Use Cases ─── */}
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionHeading}>Built for every workflow</h2>
          <p className={s.sectionSubheading}>
            From mixing rooms to mastering suites, broadcast chains to sound
            design sessions.
          </p>
        </div>

        <div className={s.useCaseGrid}>
          {USE_CASES.map((uc) => (
            <div key={uc.title} className={s.useCaseCard}>
              <div className={s.useCaseTitle}>
                {uc.icon}
                {uc.title}
              </div>
              <div className={s.useCaseQuote}>"{uc.quote}"</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Specs ─── */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionHeading}>Technical specifications</h2>
          <p className={s.sectionSubheading}>
            Professional-grade analysis backed by the numbers.
          </p>
        </div>

        <Tabs defaultValue="analysis">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <TabsList>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="analysis">
            <Card>
              <CardContent style={{ padding: 0 }}>
                <div style={{ padding: '8px 0' }}>
                  {SPECS_ANALYSIS.map(([label, value]) => (
                    <div key={label} className={s.specRow} style={{ padding: '12px 20px' }}>
                      <span className={s.specLabel}>{label}</span>
                      <span className={s.specValue}>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardContent style={{ padding: 0 }}>
                <div style={{ padding: '8px 0' }}>
                  {SPECS_SYSTEM.map(([label, value]) => (
                    <div key={label} className={s.specRow} style={{ padding: '12px 20px' }}>
                      <span className={s.specLabel}>{label}</span>
                      <span className={s.specValue}>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* ─── Hosts ─── */}
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionHeading}>Works with your DAW</h2>
          <p className={s.sectionSubheading}>
            Tested and verified across all major hosts.
          </p>
        </div>

        <div className={s.hostsGrid}>
          {HOSTS.map((host) => (
            <div key={host.name} className={s.hostCard}>
              <IconDeviceDesktop size={24} style={{ opacity: 0.6 }} />
              <div className={s.hostName}>{host.name}</div>
              <div className={s.hostFormat}>{host.format}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={s.sectionAlt}>
        <div className={s.ctaSection}>
          <h2 className={s.ctaTitle}>
            Ready to see{' '}
            <span className={s.heroAccent}>everything</span>?
          </h2>
          <p className={s.ctaSubtitle}>
            Download TectraScope today. Your audio stays untouched — just truth.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              marginTop: '32px',
              flexWrap: 'wrap',
            }}
          >
            <Button size="lg">
              <IconDownload size={16} />
              Download Free Trial
            </Button>
            <Button variant="outline" size="lg">
              View Pricing
              <IconArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className={s.footer}>
        © {new Date().getFullYear()} Hydrotik. TectraScope is a product of
        Hydrotik. macOS is a trademark of Apple Inc.
      </footer>
    </div>
  );
}
