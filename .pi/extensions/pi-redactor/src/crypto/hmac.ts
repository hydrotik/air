/**
 * HMAC-SHA256 hashing for deterministic token mapping.
 *
 * We hash original values so we never store them as keys.
 * The secret key is local-only and never leaves the machine.
 */
import { createHmac } from 'node:crypto';

/**
 * Compute HMAC-SHA256 of a value using the given secret key.
 * Returns a hex-encoded digest.
 */
export function hmacHash(value: string, secretKey: string): string {
  return createHmac('sha256', secretKey).update(value, 'utf8').digest('hex');
}
