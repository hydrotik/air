/**
 * Stand-in for vanilla-extract `.css.ts` modules. Every export resolves to its own name,
 * so `className={panel}` renders as `class="panel"` and stays queryable in tests.
 */
const handler: ProxyHandler<Record<string, unknown>> = {
  get(_target, key) {
    if (key === '__esModule') return true;
    if (typeof key !== 'string') return undefined;
    if (key === 'default') return styles;
    return key;
  },
};

const styles = new Proxy({}, handler);

module.exports = styles;
