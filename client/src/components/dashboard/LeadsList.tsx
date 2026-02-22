import type { Lead } from '@/types/lead';

interface LeadsListProps {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  selectedLeadId: number | null;
  onSelectLead: (id: number) => void;
  formatBudget: (min: number | null, max: number | null) => string;
}

export function LeadsList({
  leads,
  loading,
  error,
  selectedLeadId,
  onSelectLead,
  formatBudget,
}: LeadsListProps) {
  return (
    <section className="lead-list" aria-label="Lead list">
      {loading ? <p className="state">Loading leads...</p> : null}
      {!loading && error ? <p className="state error">{error}</p> : null}
      {!loading && !error && leads.length === 0 ? <p className="state">No leads found for this filter.</p> : null}

      {!loading && !error
        ? leads.map((lead) => (
            <article
              key={lead.id}
              className={`lead-card ${lead.id === selectedLeadId ? 'selected' : ''}`}
              onClick={() => onSelectLead(lead.id)}
            >
              <div className="lead-card-top">
                <h2>{lead.name}</h2>
                <span className={`status-chip ${lead.status}`}>{lead.status}</span>
              </div>

              <p className="lead-meta">{lead.email}</p>
              <p className="lead-meta">{lead.property_type}</p>
              <p className="lead-budget">{formatBudget(lead.budget_min, lead.budget_max)}</p>

              <div className="score-row">
                <span>AI score</span>
                <strong>{lead.ai_score ?? '--'}</strong>
              </div>
            </article>
          ))
        : null}
    </section>
  );
}
