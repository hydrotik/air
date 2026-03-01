// Proxy-based mock for vanilla-extract .css.ts files.
// Returns '' for string access (style classes) and a callable function
// for recipe() exports (which return functions).
const handler = {
  get(_target, prop) {
    if (prop === '__esModule') return true;
    if (prop === 'default') return '';
    // Return a function that returns '' — covers both style() strings
    // and recipe() callable patterns
    const fn = function () { return ''; };
    fn.toString = () => '';
    // Allow fn.classNames-like sub-access
    return new Proxy(fn, {
      get(_t, p) {
        if (p === Symbol.toPrimitive || p === 'toString' || p === 'valueOf') {
          return () => '';
        }
        return '';
      },
      apply() {
        return '';
      },
    });
  },
};

module.exports = new Proxy({}, handler);
