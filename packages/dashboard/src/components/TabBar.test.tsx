import { fireEvent, render, screen } from '@testing-library/react';
import { TabBar } from './TabBar';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'errors', label: 'Errors' },
  { id: 'drift', label: 'Drift' },
];

describe('TabBar', () => {
  it('renders one tab per entry, marking the active one selected', () => {
    render(<TabBar tabs={tabs} activeTab="errors" onTabChange={() => {}} />);
    const rendered = screen.getAllByRole('tab');
    expect(rendered.map((t) => t.textContent)).toEqual(['Overview', 'Errors', 'Drift']);
    expect(screen.getByRole('tab', { name: 'Errors' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'false');
  });

  it('adds the active class only to the active tab', () => {
    render(<TabBar tabs={tabs} activeTab="overview" onTabChange={() => {}} />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveClass('compactTabActive');
    expect(screen.getByRole('tab', { name: 'Drift' })).not.toHaveClass('compactTabActive');
  });

  it('reports the clicked tab id', () => {
    const onTabChange = jest.fn();
    render(<TabBar tabs={tabs} activeTab="overview" onTabChange={onTabChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Drift' }));
    expect(onTabChange).toHaveBeenCalledWith('drift');
  });
});
