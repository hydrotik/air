import { render, screen } from '@testing-library/react';
import { ProviderRegistryPanel } from './ProviderRegistryPanel';
import { NOW } from '../__testing__/fixtures';

describe('ProviderRegistryPanel', () => {
  beforeEach(() => jest.spyOn(Date, 'now').mockReturnValue(NOW));
  afterEach(() => jest.restoreAllMocks());

  it('shows a setup hint with no providers', () => {
    render(<ProviderRegistryPanel rag={[]} mcp={[]} />);
    expect(screen.getByText('.air.json')).toBeInTheDocument();
    expect(screen.getByText('/api/providers/rag')).toBeInTheDocument();
  });

  it('lists RAG providers with type, model, event count and recency', () => {
    render(
      <ProviderRegistryPanel
        rag={[
          {
            name: 'product-docs',
            type: 'pinecone',
            description: 'Product manuals',
            embeddingModel: 'embed-3-small',
            eventCount: 42,
            lastSeen: NOW - 10 * 60_000,
            active: true,
          },
        ]}
        mcp={[]}
      />
    );
    expect(screen.getByText('RAG Providers')).toBeInTheDocument();
    expect(screen.queryByText('MCP Servers')).toBeNull();
    expect(screen.getByText('product-docs')).toBeInTheDocument();
    expect(screen.getByText('Product manuals')).toBeInTheDocument();
    expect(screen.getByText('pinecone')).toBeInTheDocument();
    expect(screen.getByText('embed-3-small')).toBeInTheDocument();
    expect(screen.getByText('42 events')).toBeInTheDocument();
    expect(screen.getByText('10m ago')).toBeInTheDocument();
  });

  it('lists MCP servers, showing "never" for unseen ones', () => {
    render(
      <ProviderRegistryPanel
        rag={[]}
        mcp={[
          { name: 'filesystem', eventCount: 0, active: false },
          { name: 'browser', eventCount: 3, lastSeen: NOW - 2 * 3_600_000, active: false },
        ]}
      />
    );
    expect(screen.getByText('MCP Servers')).toBeInTheDocument();
    expect(screen.getByText('never')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
    expect(screen.getByText('0 events')).toBeInTheDocument();
  });

  it('colours the status dot by activity', () => {
    render(
      <ProviderRegistryPanel
        rag={[]}
        mcp={[
          { name: 'live', eventCount: 1, active: true },
          { name: 'stale', eventCount: 1, active: false },
          { name: 'idle', eventCount: 0, active: false },
        ]}
      />
    );
    const dot = (name: string) =>
      screen.getByText(name).parentElement!.parentElement!.firstElementChild;
    expect(dot('live')).toHaveStyle({ background: '#22c55e' });
    expect(dot('stale')).toHaveStyle({ background: '#f59e0b' });
    expect(dot('idle')).toHaveStyle({ background: '#64748b' });
  });
});
