import type { LeadStatus, SortBy } from '@/types/lead';

interface FiltersBarProps {
  statuses: Array<LeadStatus | 'all'>;
  sortOptions: Array<{ label: string; value: SortBy }>;
  statusFilter: LeadStatus | 'all';
  sortBy: SortBy;
  sortOrder: 'asc' | 'desc';
  onStatusChange: (status: LeadStatus | 'all') => void;
  onSortByChange: (sortBy: SortBy) => void;
  onSortOrderChange: (sortOrder: 'asc' | 'desc') => void;
  formatStatus: (status: LeadStatus | 'all') => string;
}

export function FiltersBar({
  statuses,
  sortOptions,
  statusFilter,
  sortBy,
  sortOrder,
  onStatusChange,
  onSortByChange,
  onSortOrderChange,
  formatStatus,
}: FiltersBarProps) {
  return (
    <section className="controls" aria-label="Dashboard controls">
      <div className="pill-group" role="tablist" aria-label="Status filter">
        {statuses.map((status) => (
          <button
            key={status}
            className={`pill ${statusFilter === status ? 'active' : ''}`}
            onClick={() => onStatusChange(status)}
          >
            {formatStatus(status)}
          </button>
        ))}
      </div>

      <div className="sort-controls">
        <label>
          Sort
          <select value={sortBy} onChange={(event) => onSortByChange(event.target.value as SortBy)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Order
          <select
            value={sortOrder}
            onChange={(event) => onSortOrderChange(event.target.value as 'asc' | 'desc')}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>
    </section>
  );
}
