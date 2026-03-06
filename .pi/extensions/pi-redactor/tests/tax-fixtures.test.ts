/**
 * Tax fixture integration tests.
 *
 * Simulates real W-2 and 1099-INT snippets and verifies that NO raw
 * identifiers remain after sanitization.
 */
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { sanitizePayload, rehydrate } from '../src/sanitize';

describe('Tax document fixtures', () => {
  let tempDir: string;
  const passphrase = 'tax-test-key';
  const secretKey = 'tax-hmac-secret';

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'pi-redactor-tax-'));
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  const W2_SNIPPET = `
    Form W-2 Wage and Tax Statement 2024
    Employee SSN: 123-45-6789
    Employer EIN: 12-3456789
    Employee Name: taxpayer John Smith
    Employer Name: Acme Corp
    Address: 456 Oak Ave
    Wages: $85,000.00
    Federal tax withheld: $12,750.00
    State: NY
    State wages: $85,000.00
    State tax withheld: $5,100.00
    Employee email: john.smith@acmecorp.com
    Date of birth: 03/15/1985
  `;

  const FORM_1099_INT = `
    Form 1099-INT Interest Income 2024
    Payer: First National Bank
    Payer EIN: 20-1234567
    Recipient SSN: 234-56-7890
    Recipient name: taxpayer Jane Doe
    Interest income: $1,247.83
    Account number: 9876543210
    Recipient email: jane.doe@email.com
    Bank account: checking 9876543210
    Routing number: 021000021
  `;

  it('redacts all PII from W-2 snippet', () => {
    const result = sanitizePayload(
      { text: W2_SNIPPET },
      { mappingId: 'w2-test', secretKey, baseDir: tempDir, passphrase, config: { detectNames: true } },
    );

    // Raw identifiers must NOT appear
    expect(result.redacted_text).not.toContain('123-45-6789');
    expect(result.redacted_text).not.toContain('12-3456789');
    expect(result.redacted_text).not.toContain('john.smith@acmecorp.com');

    // Tokens must appear
    expect(result.redacted_text).toContain('[SSN_1]');
    expect(result.redacted_text).toContain('[EIN_1]');
    expect(result.redacted_text).toContain('[EMAIL_1]');

    // Report must have correct categories
    expect(result.redaction_report.SSN).toBe(1);
    expect(result.redaction_report.EIN).toBe(1);
    expect(result.redaction_report.EMAIL).toBe(1);
    expect(result.has_pii).toBe(true);
  });

  it('redacts all PII from 1099-INT snippet', () => {
    const result = sanitizePayload(
      { text: FORM_1099_INT },
      { mappingId: '1099-test', secretKey, baseDir: tempDir, passphrase, config: { detectNames: true } },
    );

    // Raw identifiers must NOT appear
    expect(result.redacted_text).not.toContain('234-56-7890');
    expect(result.redacted_text).not.toContain('20-1234567');
    expect(result.redacted_text).not.toContain('jane.doe@email.com');
    expect(result.redacted_text).not.toContain('021000021');

    // Report categories
    expect(result.redaction_report.SSN).toBe(1);
    expect(result.redaction_report.EIN).toBe(1);
    expect(result.redaction_report.EMAIL).toBe(1);
    expect(result.redaction_report.ROUTING).toBeGreaterThanOrEqual(1);
    expect(result.has_pii).toBe(true);
  });

  it('handles W-2 as JSON payload', () => {
    const w2Json = {
      form: 'W-2',
      year: 2024,
      employee: {
        ssn: '123-45-6789',
        name: 'John Smith',
        email: 'john.smith@acmecorp.com',
        address: '456 Oak Ave',
      },
      employer: {
        ein: '12-3456789',
        name: 'Acme Corp',
      },
      wages: 85000,
      federal_tax: 12750,
    };

    const result = sanitizePayload(
      { text: 'Process this W-2', json: w2Json },
      { mappingId: 'w2-json-test', secretKey, baseDir: tempDir, passphrase },
    );

    const redacted = result.redacted_json as any;
    expect(redacted.employee.ssn).not.toContain('123-45-6789');
    expect(redacted.employee.ssn).toContain('[SSN_');
    expect(redacted.employer.ein).not.toContain('12-3456789');
    expect(redacted.employer.ein).toContain('[EIN_');
    expect(redacted.employee.email).not.toContain('john.smith@acmecorp.com');

    // Numeric fields preserved
    expect(redacted.wages).toBe(85000);
    expect(redacted.year).toBe(2024);
  });

  it('round-trips: sanitize then rehydrate restores originals', () => {
    const result = sanitizePayload(
      { text: W2_SNIPPET },
      { mappingId: 'w2-roundtrip', secretKey, baseDir: tempDir, passphrase, config: { detectNames: true } },
    );

    const restored = rehydrate(result.redacted_text, 'w2-roundtrip', {
      baseDir: tempDir,
      passphrase,
    }) as string;

    // Originals are back
    expect(restored).toContain('123-45-6789');
    expect(restored).toContain('12-3456789');
    expect(restored).toContain('john.smith@acmecorp.com');
  });

  it('same SSN across W-2 and 1099 in same mapping gets same token', () => {
    // Use same SSN in both forms
    const combined = `
      W-2 SSN: 123-45-6789
      1099 SSN: 123-45-6789
    `;
    const result = sanitizePayload(
      { text: combined },
      { mappingId: 'combined-test', secretKey, baseDir: tempDir, passphrase },
    );
    // Both occurrences should map to SSN_1
    expect(result.redacted_text).toBe(`
      W-2 SSN: [SSN_1]
      1099 SSN: [SSN_1]
    `);
  });

  it('ensures no raw 9-digit or formatted SSN patterns leak', () => {
    const text = 'SSN 123-45-6789 and 123 45 6789 repeated: 123-45-6789';
    const result = sanitizePayload(
      { text },
      { mappingId: 'leak-test', secretKey, baseDir: tempDir, passphrase },
    );

    // Regex scan for any SSN-like pattern in the redacted output
    const ssnPattern = /\b(?!000|666|9\d{2})\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}\b/;
    expect(ssnPattern.test(result.redacted_text)).toBe(false);
  });
});
