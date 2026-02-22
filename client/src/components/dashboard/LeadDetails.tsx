import { Button } from '@/components/ui/button';
import type { Lead, LeadStatus } from '@/types/lead';

interface LeadDetailsProps {
  selectedLead: Lead | null;
  statuses: Array<LeadStatus | 'all'>;
  updatingStatus: boolean;
  scoring: boolean;
  drafting: boolean;
  actionError: string | null;
  editableDraft: string;
  onStatusUpdate: (status: LeadStatus) => void;
  onScore: () => void;
  onDraft: () => void;
  onDraftChange: (value: string) => void;
  formatStatus: (status: LeadStatus | 'all') => string;
  formatBudget: (min: number | null, max: number | null) => string;
  formatDateTime: (value: string) => string;
}

export function LeadDetails({
  selectedLead,
  statuses,
  updatingStatus,
  scoring,
  drafting,
  actionError,
  editableDraft,
  onStatusUpdate,
  onScore,
  onDraft,
  onDraftChange,
  formatStatus,
  formatBudget,
  formatDateTime,
}: LeadDetailsProps) {
  return (
    <section className="detail-panel" aria-label="Lead details">
      {!selectedLead ? (
        <p className="state">Select a lead to view details.</p>
      ) : (
        <>
          <header className="detail-header">
            <div>
              <p className="eyebrow">Lead #{selectedLead.id}</p>
              <h2>{selectedLead.name}</h2>
            </div>
            <span className={`status-chip ${selectedLead.status}`}>{selectedLead.status}</span>
          </header>

          <div className="detail-grid">
            <div>
              <p className="label">Email</p>
              <p>{selectedLead.email}</p>
            </div>
            <div>
              <p className="label">Phone</p>
              <p>{selectedLead.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="label">Property Type</p>
              <p>{selectedLead.property_type}</p>
            </div>
            <div>
              <p className="label">Timeline</p>
              <p>{selectedLead.timeline || 'N/A'}</p>
            </div>
            <div>
              <p className="label">Budget</p>
              <p>{formatBudget(selectedLead.budget_min, selectedLead.budget_max)}</p>
            </div>
            <div>
              <p className="label">Updated</p>
              <p>{formatDateTime(selectedLead.updated_at)}</p>
            </div>
          </div>

          <section>
            <p className="label">Inquiry</p>
            <p className="inquiry">{selectedLead.inquiry_message}</p>
          </section>

          <section className="actions">
            <label>
              Status
              <select
                value={selectedLead.status}
                disabled={updatingStatus}
                onChange={(event) => onStatusUpdate(event.target.value as LeadStatus)}
              >
                {statuses.filter((status) => status !== 'all').map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </label>

            <Button className="action-btn" disabled={scoring} onClick={onScore}>
              {scoring ? 'Scoring...' : 'Score with Claude'}
            </Button>

            <Button className="action-btn secondary" variant="secondary" disabled={drafting} onClick={onDraft}>
              {drafting ? 'Drafting...' : 'Draft Follow-Up'}
            </Button>
          </section>

          {actionError ? <p className="state error">{actionError}</p> : null}

          <section className="ai-panel">
            <div>
              <p className="label">AI Score</p>
              <p className="big-score">{selectedLead.ai_score ?? '--'}</p>
            </div>
            <div>
              <p className="label">AI Reasoning</p>
              <p>{selectedLead.ai_reasoning || 'No reasoning generated yet.'}</p>
            </div>
          </section>

          <section>
            <p className="label">AI Follow-Up Draft</p>
            <textarea
              value={editableDraft}
              onChange={(event) => onDraftChange(event.target.value)}
              placeholder={'Click "Draft Follow-Up" to generate an email draft.'}
              rows={8}
            />
          </section>
        </>
      )}
    </section>
  );
}
