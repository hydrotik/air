import type { Detection, DetectorFn } from '../types';

/**
 * Detect credit card numbers with Luhn checksum validation.
 *
 * Matches: 4111-1111-1111-1111, 4111 1111 1111 1111, 4111111111111111
 * Validates: Visa (4), MasterCard (5/2), Amex (34/37), Discover (6011/65).
 */
const CC_REGEX = /\b(?:\d[ \-]?){13,19}\b/g;

/** Luhn checksum validation. */
function luhnCheck(num: string): boolean {
  const digits = num.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let alternate = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

/** Check if the prefix matches a known card issuer. */
function isKnownIssuer(digits: string): boolean {
  if (digits.startsWith('4')) return true;                        // Visa
  if (/^5[1-5]/.test(digits)) return true;                       // MasterCard
  if (/^2[2-7]/.test(digits)) return true;                       // MasterCard (2-series)
  if (/^3[47]/.test(digits)) return true;                        // Amex
  if (digits.startsWith('6011') || digits.startsWith('65')) return true; // Discover
  if (digits.startsWith('35')) return true;                       // JCB
  if (/^3(?:0[0-5]|[68])/.test(digits)) return true;             // Diners
  return false;
}

export const detectCreditCard: DetectorFn = (text) => {
  const results: Detection[] = [];
  CC_REGEX.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = CC_REGEX.exec(text)) !== null) {
    const raw = m[0];
    const digits = raw.replace(/\D/g, '');
    if (digits.length < 13 || digits.length > 19) continue;
    if (!isKnownIssuer(digits)) continue;
    if (!luhnCheck(digits)) continue;
    results.push({
      category: 'CC',
      match: raw,
      start: m.index,
      end: m.index + raw.length,
    });
  }
  return results;
};

// Export for testing
export { luhnCheck };
