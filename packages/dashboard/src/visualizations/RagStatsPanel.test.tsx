import { render, screen, within } from '@testing-library/react';
import { RagStatsPanel } from './RagStatsPanel';

describe('RagStatsPanel', () => {
  it('shows a setup hint with no stats', () => {
    render(<RagStatsPanel stats={[]} />);
    expect(screen.getByText('createRagTracer()')).toBeInTheDocument();
  });

  it('renders friendly type labels and formatted numbers', () => {
    render(
      <RagStatsPanel
        stats={[
          {
            source: 'docs',
            type: 'rag_retrieval',
            call_count: 9,
            avg_ms: 41.4,
            min_ms: 10,
            max_ms: 90,
            avg_results: 4.25,
            avg_top_score: 0.81234,
            total_chunk_tokens: 12_300,
          },
          {
            source: 'wiki',
            type: 'rag_custom',
            call_count: 1,
            avg_ms: 3,
            min_ms: 3,
            max_ms: 3,
            avg_results: null,
            avg_top_score: null,
            total_chunk_tokens: null,
          },
        ]}
      />
    );
    const [, docs, wiki] = screen.getAllByRole('row');
    expect(
      within(docs!)
        .getAllByRole('cell')
        .map((c) => c.textContent)
    ).toEqual(['docs', 'Retrieval', '9', '41ms', '4.3', '0.812', '12.3K']);
    expect(
      within(wiki!)
        .getAllByRole('cell')
        .map((c) => c.textContent)
    ).toEqual(['wiki', 'rag_custom', '1', '3ms', '—', '—', '—']);
  });
});
