import { computeCost, MODEL_PRICING } from './events';

describe('computeCost', () => {
  it('returns null for unknown models', () => {
    expect(computeCost('unknown-model', 1000, 500)).toBeNull();
  });

  it('computes cost for exact model match', () => {
    const result = computeCost('gpt-4o', 1_000_000, 1_000_000);
    expect(result).not.toBeNull();
    expect(result!.input).toBe(2.5);
    expect(result!.output).toBe(10);
    expect(result!.total).toBeCloseTo(2.5 + 10); // no cache tokens passed = 0 cost
  });

  it('computes cost with cache tokens', () => {
    const result = computeCost('claude-4-sonnet', 500_000, 200_000, 300_000, 100_000);
    expect(result).not.toBeNull();
    expect(result!.input).toBeCloseTo(1.5);      // 500k * $3/1M
    expect(result!.output).toBeCloseTo(3.0);      // 200k * $15/1M
    expect(result!.cacheRead).toBeCloseTo(0.09);  // 300k * $0.3/1M
    expect(result!.cacheWrite).toBeCloseTo(0.375); // 100k * $3.75/1M
  });

  it('computes zero cost for zero tokens', () => {
    const result = computeCost('gpt-4o', 0, 0, 0, 0);
    expect(result).not.toBeNull();
    expect(result!.total).toBe(0);
  });

  it('matches fuzzy model prefix', () => {
    const result = computeCost('claude-4-sonnet-20260101', 1_000_000, 0);
    // Should match 'claude-4-sonnet' prefix
    expect(result).not.toBeNull();
    expect(result!.input).toBe(3);
  });

  it('total equals sum of components', () => {
    const result = computeCost('gpt-4.1', 1_000_000, 1_000_000, 500_000, 0);
    expect(result).not.toBeNull();
    const expectedTotal = result!.input + result!.output + result!.cacheRead + result!.cacheWrite;
    expect(result!.total).toBeCloseTo(expectedTotal);
  });
});

describe('MODEL_PRICING', () => {
  it('has entries for major providers', () => {
    // Anthropic
    expect(MODEL_PRICING['claude-4-sonnet']).toBeDefined();
    expect(MODEL_PRICING['claude-4-opus']).toBeDefined();
    // OpenAI
    expect(MODEL_PRICING['gpt-4o']).toBeDefined();
    expect(MODEL_PRICING['gpt-4.1']).toBeDefined();
    // Google
    expect(MODEL_PRICING['gemini-2.5-pro']).toBeDefined();
  });

  it('all prices are positive numbers', () => {
    for (const [model, pricing] of Object.entries(MODEL_PRICING)) {
      expect(pricing.inputPer1M).toBeGreaterThan(0);
      expect(pricing.outputPer1M).toBeGreaterThan(0);
      // cacheRead is optional
      if (pricing.cacheReadPer1M !== undefined) {
        expect(pricing.cacheReadPer1M).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('output price >= input price for all models', () => {
    for (const [model, pricing] of Object.entries(MODEL_PRICING)) {
      expect(pricing.outputPer1M).toBeGreaterThanOrEqual(pricing.inputPer1M);
    }
  });
});
