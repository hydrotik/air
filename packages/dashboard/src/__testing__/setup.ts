import '@testing-library/jest-dom';

/**
 * jsdom gaps the dashboard charts hit. Recharts' ResponsiveContainer only renders its
 * chart once a ResizeObserver reports a non-zero size, so the stub reports a fixed box.
 */
export const OBSERVED_SIZE = { width: 800, height: 300 };

class ResizeObserverStub {
  private readonly callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe(target: Element): void {
    const contentRect = {
      ...OBSERVED_SIZE,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: OBSERVED_SIZE.width,
      bottom: OBSERVED_SIZE.height,
    } as DOMRectReadOnly;
    this.callback([{ target, contentRect } as ResizeObserverEntry], this as never);
  }
  unobserve(): void {}
  disconnect(): void {}
}

if (!('ResizeObserver' in globalThis)) {
  (globalThis as { ResizeObserver?: unknown }).ResizeObserver = ResizeObserverStub;
}

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

// jsdom's SVGElement lacks the layout methods d3 calls; stub them on the prototype.
const svgProto = (globalThis.SVGElement as typeof SVGElement | undefined)?.prototype as unknown as
  | { getBBox?: () => DOMRect | object; getComputedTextLength?: () => number }
  | undefined;
if (svgProto) {
  svgProto.getBBox ??= () => ({ x: 0, y: 0, width: 0, height: 0 });
  svgProto.getComputedTextLength ??= () => 0;
}
