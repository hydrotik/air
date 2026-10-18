import { render, screen, within } from '@testing-library/react';
import { McpStatsPanel } from './McpStatsPanel';

describe('McpStatsPanel', () => {
  it('shows a setup hint with no stats', () => {
    render(<McpStatsPanel stats={[]} />);
    expect(screen.getByText(/No MCP calls recorded/)).toBeInTheDocument();
    expect(screen.getByText('instrumentMcp()')).toBeInTheDocument();
  });

  it('renders a row per server/method with rounded averages', () => {
    render(
      <McpStatsPanel
        stats={[
          {
            server_name: 'fs',
            method: 'tools/call',
            tool_name: 'readFile',
            call_count: 14,
            avg_ms: 33.7,
            min_ms: 4,
            max_ms: 90,
            errors: 2,
          },
          {
            server_name: 'web',
            method: 'resources/read',
            tool_name: null,
            call_count: 1,
            avg_ms: 5,
            min_ms: 5,
            max_ms: 5,
            errors: 0,
          },
        ]}
      />
    );
    expect(screen.getAllByRole('columnheader').map((h) => h.textContent)).toEqual([
      'Server',
      'Method',
      'Tool/Resource',
      'Calls',
      'Avg',
      'Min',
      'Max',
      'Errors',
    ]);
    const [, fs, web] = screen.getAllByRole('row');
    expect(
      within(fs!)
        .getAllByRole('cell')
        .map((c) => c.textContent)
    ).toEqual(['fs', 'tools/call', 'readFile', '14', '34ms', '4ms', '90ms', '2']);
    expect(within(within(fs!).getAllByRole('cell')[7]!).getByText('2')).toHaveStyle({
      color: '#ef4444',
    });
    expect(within(web!).getAllByRole('cell')[2]).toHaveTextContent('—');
  });
});
