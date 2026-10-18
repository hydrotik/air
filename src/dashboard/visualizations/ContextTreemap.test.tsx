import { fireEvent, render, screen } from '@testing-library/react';
import { ContextTreemap } from './ContextTreemap';

const segment = (category: string, label: string, estimatedTokens: number) => ({
  category,
  label,
  estimatedTokens,
  charCount: estimatedTokens * 4,
});

const segments = [
  segment('sp_base', 'System Prompt', 50_000),
  segment('user_messages', 'User Messages', 30_000),
];

describe('ContextTreemap', () => {
  // jsdom defines clientWidth (always 0) on Element.prototype; shadow it for HTML elements.
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 600,
    });
  });
  afterAll(() => {
    Reflect.deleteProperty(HTMLElement.prototype, 'clientWidth');
  });

  it('shows a waiting state with no segments', () => {
    render(<ContextTreemap segments={[]} totalTokens={0} contextWindow={200_000} />);
    expect(screen.getByText('Waiting for context data…')).toBeInTheDocument();
  });

  it('draws one tile per segment plus remaining capacity, sized to the container', () => {
    const { container } = render(
      <ContextTreemap segments={segments} totalTokens={80_000} contextWindow={200_000} />
    );
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '600');
    expect(svg).toHaveAttribute('height', '200');
    expect(svg.querySelectorAll('rect')).toHaveLength(3);

    const texts = Array.from(svg.querySelectorAll('text')).map((t) => t.textContent);
    expect(texts).toEqual(
      expect.arrayContaining([
        'Available Capacity',
        '120.0K · 60.0%',
        'System Prompt',
        '50.0K · 25.0%',
        'User Messages',
        '30.0K · 15.0%',
      ])
    );
  });

  it('colours tiles by category', () => {
    const { container } = render(
      <ContextTreemap segments={segments} totalTokens={80_000} contextWindow={200_000} />
    );
    const fills = Array.from(container.querySelectorAll('rect')).map((r) => r.getAttribute('fill'));
    expect(fills).toEqual(expect.arrayContaining(['#6366f1', '#3b82f6']));
  });

  it('has no capacity tile when the window is full', () => {
    const { container } = render(
      <ContextTreemap
        segments={[segment('thinking', 'Thinking', 100_000)]}
        totalTokens={100_000}
        contextWindow={100_000}
        height={115}
      />
    );
    expect(container.querySelector('svg')).toHaveAttribute('height', '115');
    expect(container.querySelectorAll('rect')).toHaveLength(1);
    expect(screen.queryByText('Available Capacity')).toBeNull();
  });

  it('shows a tooltip with tokens and share of window on hover', () => {
    const { container } = render(
      <ContextTreemap segments={segments} totalTokens={80_000} contextWindow={200_000} />
    );
    const tooltip = container.querySelector('svg')!.nextElementSibling as HTMLElement;
    const rect = Array.from(container.querySelectorAll('rect')).find(
      (r) => r.getAttribute('fill') === '#6366f1'
    )!;

    fireEvent.mouseOver(rect);
    expect(tooltip).toHaveTextContent('System Prompt');
    expect(tooltip).toHaveTextContent('50.0K tokens · 25.0% of window');
    expect(tooltip.style.opacity).toBe('1');

    fireEvent.mouseOut(rect);
    expect(tooltip.style.opacity).toBe('0');
  });

  it('renders tooltip text literally (no HTML injection)', () => {
    const { container } = render(
      <ContextTreemap
        segments={[segment('custom_messages', '<img src=x onerror=alert(1)>', 10_000)]}
        totalTokens={10_000}
        contextWindow={20_000}
      />
    );
    const rect = Array.from(container.querySelectorAll('rect')).find(
      (r) => r.getAttribute('fill') === '#ec4899'
    )!;
    fireEvent.mouseOver(rect);
    const tooltip = container.querySelector('svg')!.nextElementSibling as HTMLElement;
    expect(tooltip.querySelector('img')).toBeNull();
    expect(tooltip).toHaveTextContent('<img src=x onerror=alert(1)>');
  });
});
