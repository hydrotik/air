/** Stand-in for the token package: any `vars.a.b.c` path resolves to `var(--a-b-c)`. */
function tokenProxy(path: string[]): unknown {
  return new Proxy(
    {},
    {
      get(_target, key) {
        if (key === Symbol.toPrimitive || key === 'toString')
          return () => `var(--${path.join('-')})`;
        if (typeof key !== 'string') return undefined;
        return tokenProxy([...path, key]);
      },
    }
  );
}

export const vars = tokenProxy([]);
