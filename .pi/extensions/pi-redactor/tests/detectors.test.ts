import { detectSSN } from '../src/detectors/ssn';
import { detectEIN } from '../src/detectors/ein';
import { detectEmail } from '../src/detectors/email';
import { detectPhone } from '../src/detectors/phone';
import { detectDOB } from '../src/detectors/dob';
import { detectCreditCard, luhnCheck } from '../src/detectors/credit-card';
import { detectRouting, abaChecksum } from '../src/detectors/routing';
import { detectBankAccount } from '../src/detectors/bank-account';
import { detectAddress } from '../src/detectors/address';
import { detectName } from '../src/detectors/name';
import { detectCustom } from '../src/detectors/custom';
import { detectAll } from '../src/detectors';

// ── SSN ──

describe('detectSSN', () => {
  it('detects standard SSN with dashes', () => {
    const hits = detectSSN('My SSN is 123-45-6789.');
    expect(hits).toHaveLength(1);
    expect(hits[0].match).toBe('123-45-6789');
    expect(hits[0].category).toBe('SSN');
  });

  it('detects SSN with spaces', () => {
    const hits = detectSSN('SSN: 123 45 6789');
    expect(hits).toHaveLength(1);
    expect(hits[0].match).toBe('123 45 6789');
  });

  it('detects SSN without separators', () => {
    const hits = detectSSN('SSN: 123456789');
    expect(hits).toHaveLength(1);
  });

  it('rejects 000-xx-xxxx', () => {
    expect(detectSSN('000-12-3456')).toHaveLength(0);
  });

  it('rejects 666-xx-xxxx', () => {
    expect(detectSSN('666-12-3456')).toHaveLength(0);
  });

  it('rejects 9xx-xx-xxxx (ITIN)', () => {
    expect(detectSSN('900-12-3456')).toHaveLength(0);
  });

  it('rejects xxx-00-xxxx', () => {
    expect(detectSSN('123-00-6789')).toHaveLength(0);
  });

  it('rejects xxx-xx-0000', () => {
    expect(detectSSN('123-45-0000')).toHaveLength(0);
  });

  it('detects multiple SSNs', () => {
    const hits = detectSSN('SSNs: 123-45-6789 and 234-56-7890');
    expect(hits).toHaveLength(2);
  });
});

// ── EIN ──

describe('detectEIN', () => {
  it('detects EIN with dash', () => {
    const hits = detectEIN('EIN: 12-3456789');
    expect(hits).toHaveLength(1);
    expect(hits[0].match).toBe('12-3456789');
    expect(hits[0].category).toBe('EIN');
  });

  it('rejects EIN without separator (ambiguous with SSN)', () => {
    const hits = detectEIN('Number: 123456789');
    expect(hits).toHaveLength(0);
  });

  it('rejects invalid prefix', () => {
    expect(detectEIN('Number: 99-1234567')).toHaveLength(1); // 99 is valid
    expect(detectEIN('Number: 07-1234567')).toHaveLength(0); // 07 is not valid
  });
});

// ── Email ──

describe('detectEmail', () => {
  it('detects standard email', () => {
    const hits = detectEmail('Contact: john.doe@example.com');
    expect(hits).toHaveLength(1);
    expect(hits[0].match).toBe('john.doe@example.com');
  });

  it('detects multiple emails', () => {
    const hits = detectEmail('a@b.com and c@d.org');
    expect(hits).toHaveLength(2);
  });
});

// ── Phone ──

describe('detectPhone', () => {
  it('detects (xxx) xxx-xxxx', () => {
    const hits = detectPhone('Call (555) 123-4567');
    expect(hits).toHaveLength(1);
    expect(hits[0].category).toBe('PHONE');
  });

  it('detects xxx-xxx-xxxx', () => {
    const hits = detectPhone('Phone: 555-123-4567');
    expect(hits).toHaveLength(1);
  });

  it('detects +1 format', () => {
    const hits = detectPhone('Phone: +1 555 123 4567');
    expect(hits).toHaveLength(1);
  });
});

// ── DOB ──

describe('detectDOB', () => {
  it('detects DOB with context', () => {
    const hits = detectDOB('Date of birth: 01/15/1990');
    expect(hits).toHaveLength(1);
    expect(hits[0].category).toBe('DOB');
  });

  it('ignores dates without context', () => {
    const hits = detectDOB('Invoice date: 01/15/2024');
    expect(hits).toHaveLength(0);
  });

  it('detects ISO format with context', () => {
    const hits = detectDOB('born on 1990-01-15');
    expect(hits).toHaveLength(1);
  });
});

// ── Credit Card ──

describe('detectCreditCard', () => {
  it('validates Luhn checksum', () => {
    expect(luhnCheck('4111111111111111')).toBe(true);  // Visa test number
    expect(luhnCheck('4111111111111112')).toBe(false);
    expect(luhnCheck('5500000000000004')).toBe(true);  // MC test number
    expect(luhnCheck('378282246310005')).toBe(true);   // Amex test number
  });

  it('detects Visa test card', () => {
    const hits = detectCreditCard('Card: 4111-1111-1111-1111');
    expect(hits).toHaveLength(1);
    expect(hits[0].category).toBe('CC');
  });

  it('detects Amex', () => {
    const hits = detectCreditCard('Card: 3782 822463 10005');
    expect(hits).toHaveLength(1);
  });

  it('rejects invalid Luhn', () => {
    expect(detectCreditCard('Card: 4111-1111-1111-1112')).toHaveLength(0);
  });
});

// ── Routing ──

describe('detectRouting', () => {
  it('validates ABA checksum', () => {
    expect(abaChecksum('021000021')).toBe(true);  // JPMorgan Chase
    expect(abaChecksum('021000022')).toBe(false);
  });

  it('detects valid routing number', () => {
    const hits = detectRouting('Routing: 021000021');
    expect(hits).toHaveLength(1);
    expect(hits[0].category).toBe('ROUTING');
  });

  it('rejects invalid checksum', () => {
    expect(detectRouting('Number: 021000022')).toHaveLength(0);
  });
});

// ── Bank Account ──

describe('detectBankAccount', () => {
  it('detects account number with context', () => {
    const hits = detectBankAccount('Bank account number: 12345678901');
    expect(hits).toHaveLength(1);
    expect(hits[0].category).toBe('BANK_ACCT');
  });

  it('ignores numbers without banking context', () => {
    expect(detectBankAccount('Order number: 12345678901')).toHaveLength(0);
  });
});

// ── Address ──

describe('detectAddress', () => {
  it('detects street address', () => {
    const hits = detectAddress('Lives at 123 Main Street');
    expect(hits).toHaveLength(1);
    expect(hits[0].category).toBe('ADDRESS');
  });

  it('detects abbreviated suffix', () => {
    const hits = detectAddress('Office at 456 Oak Ave');
    expect(hits).toHaveLength(1);
  });
});

// ── Name ──

describe('detectName', () => {
  it('is off by default', () => {
    expect(detectName('Mr. John Smith', {})).toHaveLength(0);
  });

  it('detects name with context when enabled', () => {
    const hits = detectName('taxpayer John Smith filed', { detectNames: true });
    expect(hits).toHaveLength(1);
    expect(hits[0].match).toBe('John Smith');
  });

  it('respects allowlist', () => {
    const hits = detectName('taxpayer John Smith filed', {
      detectNames: true,
      nameAllowlist: ['John Smith'],
    });
    expect(hits).toHaveLength(0);
  });

  it('detects denylist names anywhere', () => {
    const hits = detectName('Filed by Jane Doe and reviewed.', {
      detectNames: true,
      nameDenylist: ['Jane Doe'],
    });
    expect(hits).toHaveLength(1);
  });
});

// ── Custom ──

describe('detectCustom', () => {
  it('runs custom patterns', () => {
    const hits = detectCustom('Passport: AB1234567', {
      customPatterns: [
        { name: 'Passport', category: 'SSN', pattern: '\\b[A-Z]{2}\\d{7}\\b', flags: 'g' },
      ],
    });
    expect(hits).toHaveLength(1);
    expect(hits[0].match).toBe('AB1234567');
  });

  it('handles invalid regex gracefully', () => {
    const hits = detectCustom('test', {
      customPatterns: [
        { name: 'Bad', category: 'SSN', pattern: '[invalid' },
      ],
    });
    expect(hits).toHaveLength(0);
  });
});

// ── detectAll ──

describe('detectAll', () => {
  it('runs all detectors and deduplicates', () => {
    const text = 'SSN: 123-45-6789, Email: john@example.com';
    const hits = detectAll(text);
    expect(hits.length).toBeGreaterThanOrEqual(2);
    const categories = hits.map((h) => h.category);
    expect(categories).toContain('SSN');
    expect(categories).toContain('EMAIL');
  });

  it('resolves overlapping matches (longer wins)', () => {
    // A phone number might partially overlap with other patterns
    const hits = detectAll('Call 555-123-4567 now');
    // Should not have duplicate detections for the same span
    const starts = hits.map((h) => h.start);
    expect(new Set(starts).size).toBe(starts.length);
  });
});
