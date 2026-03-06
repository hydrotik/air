import { evaluatePolicy, previewSummary } from '../src/policy';
import type { Detection } from '../src/types';

const ssn: Detection = { category: 'SSN', match: '123-45-6789', start: 0, end: 11 };
const email: Detection = { category: 'EMAIL', match: 'a@b.com', start: 0, end: 7 };
const cc: Detection = { category: 'CC', match: '4111111111111111', start: 0, end: 16 };

describe('evaluatePolicy', () => {
  it('blocks on hard PII by default', () => {
    const decision = evaluatePolicy([ssn]);
    expect(decision.blocked).toBe(true);
    expect(decision.shouldRedact).toBe(true);
    expect(decision.triggeredCategories).toContain('SSN');
  });

  it('blocks on CC by default', () => {
    const decision = evaluatePolicy([cc]);
    expect(decision.blocked).toBe(true);
  });

  it('does not block soft PII', () => {
    const decision = evaluatePolicy([email]);
    expect(decision.blocked).toBe(false);
    expect(decision.shouldRedact).toBe(true);
  });

  it('allows hard PII when allowSensitive=true', () => {
    const decision = evaluatePolicy([ssn], { allowSensitive: true });
    expect(decision.blocked).toBe(false);
    expect(decision.shouldRedact).toBe(true);
  });

  it('skips redaction when redact=false AND allowSensitive=true', () => {
    const decision = evaluatePolicy([ssn], { allowSensitive: true, redact: false });
    expect(decision.blocked).toBe(false);
    expect(decision.shouldRedact).toBe(false);
  });

  it('still redacts when redact=false without allowSensitive', () => {
    // redact: false is meaningless without allowSensitive — blocked anyway
    const decision = evaluatePolicy([ssn], { redact: false });
    expect(decision.blocked).toBe(true);
    expect(decision.shouldRedact).toBe(true);
  });

  it('returns no-op for empty detections', () => {
    const decision = evaluatePolicy([]);
    expect(decision.blocked).toBe(false);
    expect(decision.shouldRedact).toBe(false);
    expect(decision.triggeredCategories).toHaveLength(0);
  });

  it('handles mixed hard + soft PII', () => {
    const decision = evaluatePolicy([ssn, email]);
    expect(decision.blocked).toBe(true);
    expect(decision.triggeredCategories).toContain('SSN');
    expect(decision.triggeredCategories).toContain('EMAIL');
  });
});

describe('previewSummary', () => {
  it('reports no detections', () => {
    expect(previewSummary([])).toContain('No sensitive data');
  });

  it('reports categories and counts (never raw values)', () => {
    const summary = previewSummary([ssn, ssn, email]);
    expect(summary).toContain('SSN: 2');
    expect(summary).toContain('EMAIL: 1');
    // Must NOT contain actual values
    expect(summary).not.toContain('123-45-6789');
    expect(summary).not.toContain('a@b.com');
  });

  it('labels hard vs soft PII', () => {
    const summary = previewSummary([ssn, email]);
    expect(summary).toContain('HARD');
    expect(summary).toContain('SOFT');
  });
});
