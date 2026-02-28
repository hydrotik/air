import { style, globalStyle, keyframes, createVar } from '@vanilla-extract/css';
import { vars } from '@hydrotik/tokens';

/* ═══════════════════════════════════════════════════════════════════════════ */
/* Editorial Data — High-density editorial layout                             */
/* Inspired by longform data journalism. Uses design system tokens with       */
/* +1px density modifier on font sizes as the "high-density" variant.         */
/* ═══════════════════════════════════════════════════════════════════════════ */

/* ── Density modifier: +1px on all base sizes ── */
export const densityShift = createVar();

/* ── Page root ── */
export const page = style({
  vars: { [densityShift]: '1px' },
  width: '100%',
  minHeight: '100vh',
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontFamily: vars.font.family.sans,
  fontWeight: vars.font.weight.normal,
  lineHeight: vars.font.lineHeight.relaxed,
  overflowX: 'hidden',
});

/* ── Container (article width) ── */
export const container = style({
  maxWidth: '780px',
  margin: '0 auto',
  padding: `0 ${vars.space['8']}`,
});

export const wideContainer = style({
  maxWidth: '860px',
  margin: '0 auto',
  padding: `0 ${vars.space['5']}`,
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* HEADER                                                                 */
/* ═══════════════════════════════════════════════════════════════════════ */
export const header = style({
  textAlign: 'center',
  padding: `${vars.space['20']} ${vars.space['10']} ${vars.space['12']}`,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

export const headerLabel = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(${vars.font.size.xs} + ${densityShift})`,
  letterSpacing: '4px',
  textTransform: 'uppercase',
  color: vars.color.primary,
  marginBottom: vars.space['7'],
});

export const headerTitle = style({
  fontFamily: vars.font.family.sans,
  fontSize: `clamp(calc(28px + 1px), 4.5vw, calc(48px + 1px))`,
  fontWeight: vars.font.weight.bold,
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.tight,
  maxWidth: '800px',
  margin: `0 auto ${vars.space['5']}`,
});

export const headerTitleAccent = style({
  color: vars.color.primary,
  fontStyle: 'italic',
});

export const headerSubtitle = style({
  fontFamily: vars.font.family.sans,
  fontSize: `calc(${vars.font.size.lg} + ${densityShift})`,
  fontStyle: 'italic',
  color: vars.color.chart2,
  marginBottom: vars.space['7'],
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const headerAuthor = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(${vars.font.size.xs} + ${densityShift})`,
  letterSpacing: '2px',
  color: vars.color.textMuted,
  marginBottom: vars.space['2'],
});

export const headerDate = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  color: vars.color.textMuted,
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* STATS BAR                                                              */
/* ═══════════════════════════════════════════════════════════════════════ */
export const statsBar = style({
  display: 'flex',
  justifyContent: 'center',
  gap: vars.space['10'],
  padding: `${vars.space['7']} ${vars.space['10']}`,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  flexWrap: 'wrap',
});

export const stat = style({
  textAlign: 'center',
});

export const statVal = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(${vars.font.size['2xl']} + ${densityShift})`,
  fontWeight: vars.font.weight.medium,
  color: vars.color.primary,
});

export const statLabel = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(9px + 1px)`,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: vars.color.textMuted,
  marginTop: vars.space['1'],
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* NARRATIVE BODY TEXT                                                     */
/* ═══════════════════════════════════════════════════════════════════════ */
export const narrative = style({
  padding: `${vars.space['12']} 0 ${vars.space['14']}`,
});

export const bodyText = style({
  fontSize: `calc(${vars.font.size.md} + ${densityShift})`,
  marginBottom: vars.space['5'],
  color: vars.color.text,
  lineHeight: vars.font.lineHeight.relaxed,
});

export const leadText = style({
  fontFamily: vars.font.family.sans,
  fontSize: `calc(${vars.font.size.xl} + ${densityShift})`,
  fontStyle: 'italic',
  color: vars.color.chart2,
  lineHeight: '1.7',
  marginBottom: vars.space['8'],
});

export const bodyLink = style({
  color: vars.color.chart2,
  textDecoration: 'underline',
  textDecorationColor: 'rgba(96, 165, 250, 0.3)',
  textUnderlineOffset: '3px',
  transition: `text-decoration-color ${vars.motion.duration.normal}`,
  ':hover': {
    textDecorationColor: vars.color.chart2,
  },
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* SECTION BREAKS                                                         */
/* ═══════════════════════════════════════════════════════════════════════ */
export const sectionBreak = style({
  textAlign: 'center',
  padding: `${vars.space['12']} 0 ${vars.space['10']}`,
});

export const sectionNum = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  letterSpacing: '4px',
  color: vars.color.textMuted,
  textTransform: 'uppercase',
});

export const sectionTitle = style({
  fontFamily: vars.font.family.sans,
  fontSize: `clamp(calc(24px + 1px), 3vw, calc(34px + 1px))`,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
  marginTop: vars.space['2'],
});

export const sectionRule = style({
  width: '60px',
  height: '1px',
  background: vars.color.textMuted,
  margin: `${vars.space['4']} auto 0`,
  opacity: 0.4,
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* DATA CALLOUTS                                                          */
/* ═══════════════════════════════════════════════════════════════════════ */
export const callout = style({
  background: vars.color.surface,
  borderLeft: `3px solid ${vars.color.primary}`,
  padding: `${vars.space['5']} ${vars.space['6']}`,
  margin: `${vars.space['7']} 0`,
  borderRadius: vars.radii.sm,
});

export const calloutLabel = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  letterSpacing: '2px',
  color: vars.color.primary,
  textTransform: 'uppercase',
  marginBottom: vars.space['2_5'],
});

export const calloutText = style({
  marginBottom: vars.space['2'],
  fontSize: `calc(${vars.font.size.sm} + ${densityShift})`,
  color: vars.color.text,
});

export const calloutFigure = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(${vars.font.size.lg} + ${densityShift})`,
  color: vars.color.primary,
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* PULL QUOTES                                                            */
/* ═══════════════════════════════════════════════════════════════════════ */
export const pullQuote = style({
  textAlign: 'center',
  padding: `${vars.space['9']} ${vars.space['5']}`,
  margin: `${vars.space['8']} 0`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

export const pullQuoteText = style({
  fontFamily: vars.font.family.sans,
  fontSize: `calc(${vars.font.size['2xl']} + ${densityShift})`,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.primary,
  lineHeight: vars.font.lineHeight.normal,
  fontStyle: 'italic',
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* VIZ LINK CARD                                                          */
/* ═══════════════════════════════════════════════════════════════════════ */
export const vizLink = style({
  display: 'block',
  textAlign: 'center',
  padding: vars.space['5'],
  margin: `${vars.space['8']} 0`,
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  textDecoration: 'none',
  borderRadius: vars.radii.md,
  transition: `border-color ${vars.motion.duration.normal}, background ${vars.motion.duration.normal}`,
  cursor: 'pointer',
  ':hover': {
    borderColor: vars.color.primary,
    background: vars.color.surfaceElevated,
  },
});

export const vizLinkLabel = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  letterSpacing: '2px',
  color: vars.color.primary,
  textTransform: 'uppercase',
});

export const vizLinkTitle = style({
  fontFamily: vars.font.family.sans,
  fontSize: `calc(${vars.font.size.lg} + ${densityShift})`,
  color: vars.color.text,
  marginTop: vars.space['1'],
});

export const vizLinkDesc = style({
  fontSize: `calc(${vars.font.size.xs} + ${densityShift})`,
  color: vars.color.textMuted,
  marginTop: vars.space['1'],
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* TIMELINE — Super Component                                             */
/* ═══════════════════════════════════════════════════════════════════════ */
export const timelineWrap = style({
  marginTop: vars.space['12'],
});

export const timelineStats = style({
  display: 'flex',
  justifyContent: 'center',
  gap: vars.space['7'],
  padding: `${vars.space['4']} 0 ${vars.space['6']}`,
  flexWrap: 'wrap',
});

export const timelineStat = style({
  textAlign: 'center',
});

export const timelineStatVal = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(${vars.font.size.lg} + ${densityShift})`,
  fontWeight: vars.font.weight.medium,
  color: vars.color.primary,
});

export const timelineStatLabel = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(9px + 1px)`,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: vars.color.textMuted,
  marginTop: '2px',
});

export const timelineBox = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  padding: `${vars.space['5']} ${vars.space['4']} ${vars.space['4']}`,
  marginBottom: vars.space['6'],
  overflow: 'hidden',
  borderRadius: vars.radii.md,
});

export const timelineCtrl = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: vars.space['4'],
  padding: `0 ${vars.space['1']}`,
  flexWrap: 'wrap',
  gap: vars.space['2'],
});

export const timelineCov = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  color: vars.color.textMuted,
  letterSpacing: '1px',
});

export const timelineCovAccent = style({
  color: vars.color.chart2,
});

export const timelineScroll = style({
  width: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  WebkitOverflowScrolling: 'touch',
  paddingBottom: vars.space['2'],
});

export const timelineChart = style({
  position: 'relative',
  height: '340px',
});

export const timelineBar = style({
  position: 'absolute',
  bottom: '44px',
  borderRadius: '1px 1px 0 0',
  cursor: 'pointer',
  transition: `background ${vars.motion.duration.fast}, box-shadow ${vars.motion.duration.fast}`,
  zIndex: 2,
});

export const timelineBarPrimary = style({
  background: vars.color.primary,
  opacity: 0.7,
  ':hover': {
    opacity: 1,
    boxShadow: `0 0 10px rgba(59,130,246,0.4)`,
  },
});

export const timelineBarSecondary = style({
  background: vars.color.chart2,
  opacity: 0.25,
  ':hover': {
    opacity: 0.45,
    boxShadow: `0 0 8px rgba(96,165,250,0.3)`,
  },
});

export const timelineGridLine = style({
  position: 'absolute',
  left: 0,
  right: 0,
  height: '1px',
  background: 'rgba(255,255,255,0.04)',
  zIndex: 0,
});

export const timelineGridLabel = style({
  position: 'absolute',
  left: '4px',
  fontFamily: vars.font.family.mono,
  fontSize: '9px',
  color: 'rgba(255,255,255,0.2)',
  transform: 'translateY(-50%)',
  zIndex: 1,
});

export const timelineXAxis = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '40px',
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const timelineYearLabel = style({
  position: 'absolute',
  bottom: '10px',
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  color: vars.color.textMuted,
  letterSpacing: '1px',
});

export const timelineEventLine = style({
  position: 'absolute',
  bottom: '44px',
  width: '1px',
  background: vars.color.destructive,
  opacity: 0.4,
  zIndex: 1,
});

export const timelineEventDot = style({
  position: 'absolute',
  width: '9px',
  height: '9px',
  borderRadius: '50%',
  background: vars.color.destructive,
  border: `1px solid ${vars.color.surface}`,
  cursor: 'pointer',
  zIndex: 5,
  transition: `transform ${vars.motion.duration.fast}`,
  boxShadow: `0 0 6px rgba(239,68,68,0.4)`,
  ':hover': {
    transform: 'scale(1.6)',
  },
});

export const timelineEventFlag = style({
  position: 'absolute',
  fontFamily: vars.font.family.mono,
  fontSize: '8px',
  letterSpacing: '1px',
  color: vars.color.destructive,
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  zIndex: 4,
  cursor: 'pointer',
});

export const timelineHint = style({
  textAlign: 'center',
  fontFamily: vars.font.family.mono,
  fontSize: '9px',
  color: vars.color.textMuted,
  opacity: 0.4,
  marginTop: vars.space['1_5'],
  letterSpacing: '1px',
});

/* ── Year Grid (alternative view) ── */
export const yearGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
  gap: vars.space['2'],
  marginTop: vars.space['3'],
});

export const yearCard = style({
  background: vars.color.surface,
  border: `1px solid ${vars.color.borderSubtle}`,
  padding: `${vars.space['2_5']} ${vars.space['3']}`,
  cursor: 'pointer',
  transition: `border-color ${vars.motion.duration.fast}`,
  textAlign: 'center',
  borderRadius: vars.radii.sm,
  ':hover': {
    borderColor: vars.color.primary,
    background: vars.color.surfaceElevated,
  },
});

export const yearCardDark = style({
  opacity: 0.35,
  borderStyle: 'dashed',
  ':hover': {
    opacity: 0.65,
  },
});

export const yearCardYear = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(${vars.font.size.xs} + ${densityShift})`,
  color: vars.color.text,
  letterSpacing: '1px',
});

export const yearCardAmount = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(${vars.font.size.sm} + ${densityShift})`,
  color: vars.color.primary,
  fontWeight: vars.font.weight.medium,
  marginTop: '2px',
});

export const yearCardWires = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(9px + 1px)`,
  color: vars.color.textMuted,
  marginTop: '2px',
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* ROSTER — Super Component (Names grid)                                  */
/* Uses our DataGrid internally but here are supporting classes            */
/* ═══════════════════════════════════════════════════════════════════════ */
export const rosterWrap = style({
  marginTop: vars.space['12'],
});

export const rosterHead = style({
  textAlign: 'center',
  marginBottom: vars.space['2'],
});

export const rosterTitle = style({
  fontFamily: vars.font.family.sans,
  fontSize: `clamp(calc(20px + 1px), 2.5vw, calc(28px + 1px))`,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text,
});

export const rosterSub = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  color: vars.color.textMuted,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginTop: vars.space['2_5'],
});

export const rosterLegend = style({
  background: `rgba(59,130,246,0.04)`,
  border: `1px solid ${vars.color.borderSubtle}`,
  padding: `${vars.space['2']} ${vars.space['4']}`,
  margin: `${vars.space['3']} auto ${vars.space['7']}`,
  maxWidth: '620px',
  borderRadius: vars.radii.sm,
});

export const rosterLegendTitle = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(9px + 1px)`,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: vars.color.primary,
  marginBottom: vars.space['2'],
});

export const rosterLegendItem = style({
  fontFamily: vars.font.family.sans,
  fontSize: `calc(10px + 1px)`,
  color: vars.color.textMuted,
  lineHeight: '1.4',
});

export const rosterLegendBold = style({
  color: vars.color.text,
  fontWeight: vars.font.weight.normal,
});

/* ── Roster Category ── */
export const rosterCategory = style({
  marginBottom: vars.space['7'],
});

export const rosterCategoryHeader = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: vars.color.primary,
  marginBottom: vars.space['2'],
  paddingBottom: vars.space['1_5'],
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
});

export const rosterCategoryCount = style({
  color: vars.color.textMuted,
  fontWeight: vars.font.weight.normal,
  fontSize: `calc(9px + 1px)`,
});

/* ── Roster Entity Row ── */
export const rosterGrid = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const rosterRow = style({
  display: 'grid',
  gridTemplateColumns: '38px 1fr 80px 72px',
  gap: vars.space['1'],
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  background: 'rgba(255,255,255,0.012)',
  borderLeft: '2px solid transparent',
  transition: `all ${vars.motion.duration.fast}`,
  alignItems: 'baseline',
  ':hover': {
    background: 'rgba(59,130,246,0.04)',
    borderLeftColor: vars.color.primary,
  },
});

export const rosterRowHighlight = style({
  borderLeftColor: `${vars.color.destructive} !important`,
});

export const rosterRank = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  color: vars.color.textMuted,
  textAlign: 'right',
  paddingRight: vars.space['1_5'],
});

export const rosterName = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(${vars.font.size.xs} + ${densityShift})`,
  color: vars.color.text,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  cursor: 'default',
});

export const rosterNameClickable = style({
  color: vars.color.chart2,
  cursor: 'pointer',
  ':hover': {
    color: vars.color.primary,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },
});

export const rosterNameHighlight = style({
  color: `${vars.color.warning} !important`,
});

export const rosterDollars = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  color: vars.color.primary,
  textAlign: 'right',
});

/* ── Source Rating (pip bar) ── */
export const rosterSourceBar = style({
  display: 'flex',
  gap: '1px',
  justifyContent: 'center',
});

export const rosterPip = style({
  width: '5px',
  height: '8px',
  borderRadius: '1px',
});

export const rosterPipOn = style({
  background: vars.color.chart2,
  opacity: 0.8,
});

export const rosterPipOff = style({
  background: `rgba(96,165,250,0.12)`,
});

/* ── Column Headers for roster ── */
export const rosterColHeaders = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(8px + 1px)`,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: vars.color.textMuted,
  opacity: 0.4,
  padding: `0 ${vars.space['2']} ${vars.space['1']}`,
  display: 'grid',
  gridTemplateColumns: '38px 1fr 80px 72px',
  gap: vars.space['1'],
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* VEHICLE ENTITIES                                                       */
/* ═══════════════════════════════════════════════════════════════════════ */
export const vehicleGrid = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const vehicleRow = style({
  display: 'grid',
  gridTemplateColumns: '140px 90px 1fr 80px',
  gap: vars.space['2'],
  padding: `${vars.space['1_5']} ${vars.space['2']}`,
  background: 'rgba(255,255,255,0.012)',
  borderLeft: `2px solid rgba(96,165,250,0.2)`,
  alignItems: 'baseline',
  ':hover': {
    background: 'rgba(59,130,246,0.04)',
  },
});

export const vehicleName = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(${vars.font.size.xs} + ${densityShift})`,
  color: vars.color.chart2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  ':hover': {
    color: vars.color.primary,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },
});

export const vehicleRole = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(9px + 1px)`,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '1px',
});

export const vehicleDesc = style({
  fontFamily: vars.font.family.sans,
  fontSize: `calc(10px + 1px)`,
  color: vars.color.textMuted,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const vehicleVol = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  color: vars.color.primary,
  textAlign: 'right',
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* SOURCE BAR (footer pills)                                              */
/* ═══════════════════════════════════════════════════════════════════════ */
export const srcBar = style({
  marginTop: vars.space['8'],
  paddingTop: vars.space['5'],
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  textAlign: 'center',
});

export const srcBarLabel = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(9px + 1px)`,
  color: vars.color.textMuted,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginBottom: vars.space['2_5'],
});

export const srcPills = style({
  display: 'flex',
  justifyContent: 'center',
  gap: vars.space['4'],
  flexWrap: 'wrap',
});

export const srcPill = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  color: vars.color.textMuted,
});

export const srcPillAccent = style({
  color: vars.color.primary,
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* FOOTER                                                                 */
/* ═══════════════════════════════════════════════════════════════════════ */
export const footer = style({
  textAlign: 'center',
  padding: `${vars.space['12']} ${vars.space['10']}`,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
});

export const footerText = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  color: vars.color.textMuted,
  lineHeight: vars.font.lineHeight.relaxed,
  maxWidth: '700px',
  margin: '0 auto',
});

export const footerDisclaimer = style({
  color: vars.color.textMuted,
  marginTop: vars.space['3'],
  opacity: 0.7,
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* SAR TAG                                                                */
/* ═══════════════════════════════════════════════════════════════════════ */
export const sarTag = style({
  display: 'inline-block',
  fontFamily: vars.font.family.mono,
  fontSize: `calc(9px + 1px)`,
  letterSpacing: '1px',
  color: vars.color.destructive,
  border: `1px solid ${vars.color.destructive}`,
  padding: '1px 6px',
  verticalAlign: 'middle',
  marginLeft: vars.space['1'],
  borderRadius: vars.radii.sm,
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* POPUP / TOOLTIP                                                        */
/* ═══════════════════════════════════════════════════════════════════════ */
export const popup = style({
  position: 'fixed',
  zIndex: 1000,
  background: vars.color.surfaceElevated,
  border: `1px solid ${vars.color.primary}`,
  padding: `${vars.space['4']} ${vars.space['5']} ${vars.space['4']}`,
  minWidth: '320px',
  maxWidth: '420px',
  boxShadow: vars.shadow.xl,
  opacity: 0,
  transform: 'translateY(4px)',
  transition: `opacity ${vars.motion.duration.fast}, transform ${vars.motion.duration.fast}`,
  pointerEvents: 'none',
  borderRadius: vars.radii.md,
});

export const popupVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
  pointerEvents: 'auto',
});

export const popupClose = style({
  position: 'absolute',
  top: '6px',
  right: '10px',
  fontFamily: vars.font.family.mono,
  fontSize: vars.font.size.lg,
  color: vars.color.textMuted,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  lineHeight: 1,
  ':hover': {
    color: vars.color.primary,
  },
});

export const popupMonth = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(10px + 1px)`,
  letterSpacing: '2px',
  color: vars.color.primary,
  textTransform: 'uppercase',
  marginBottom: vars.space['1'],
});

export const popupAmount = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(${vars.font.size['2xl']} + ${densityShift})`,
  color: vars.color.chart4,
  fontWeight: vars.font.weight.medium,
});

export const popupWireCount = style({
  fontFamily: vars.font.family.mono,
  fontSize: `calc(${vars.font.size.xs} + ${densityShift})`,
  color: vars.color.chart2,
  marginBottom: vars.space['2'],
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* DATA TABLE (used inline within narrative sections)                      */
/* ═══════════════════════════════════════════════════════════════════════ */
export const dataTableWrap = style({
  margin: `${vars.space['7']} 0`,
  overflowX: 'auto',
});

export const dataTableNote = style({
  fontSize: `calc(${vars.font.size.xs} + ${densityShift})`,
  color: vars.color.textMuted,
  marginTop: vars.space['2'],
  opacity: 0.7,
});

export const dataTableCode = style({
  color: vars.color.chart2,
  fontSize: `calc(10px + 1px)`,
  fontFamily: vars.font.family.mono,
});
