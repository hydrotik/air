/**
 * Narrows a value a test expects to exist (an array element, a map entry). A missing value
 * fails the test with the name given, instead of a TypeError further down.
 */
export function defined<T>(value: T | undefined, what = 'value'): T {
  if (value === undefined) throw new Error(`expected ${what} to be defined`);
  return value;
}
