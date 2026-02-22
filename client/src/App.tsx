import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { FiltersBar } from '@/components/dashboard/FiltersBar';
import { Header } from '@/components/dashboard/Header';
import { LeadDetails } from '@/components/dashboard/LeadDetails';
import { LeadsList } from '@/components/dashboard/LeadsList';
import { draftLead, getLeads, scoreLead, updateLeadStatus } from './lib/api';
import type { Lead, LeadStatus, SortBy } from './types/lead';

const STATUSES: Array<LeadStatus | 'all'> = ['all', 'new', 'contacted', 'qualified', 'lost', 'closed'];

const SORT_OPTIONS: Array<{ label: string; value: SortBy }> = [
  { label: 'Newest', value: 'created_at' },
  { label: 'AI Score', value: 'ai_score' },
  { label: 'Budget Min', value: 'budget_min' },
  { label: 'Budget Max', value: 'budget_max' },
];

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const dateTime = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function formatStatus(status: LeadStatus | 'all') {
  return status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1);
}

function formatBudget(min: number | null, max: number | null) {
  if (min && max) return `${money.format(min)} - ${money.format(max)}`;
  if (min) return `${money.format(min)}+`;
  if (max) return `Up to ${money.format(max)}`;
  return 'Not specified';
}

function formatDateTime(value: string) {
  return dateTime.format(new Date(value));
}

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortBy>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [scoring, setScoring] = useState(false);
  const [drafting, setDrafting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [editableDraft, setEditableDraft] = useState('');

  useEffect(() => {
    let active = true;

    async function loadLeads() {
      setLoading(true);
      setError(null);
      try {
        const data = await getLeads({ status: statusFilter, sortBy, sortOrder });

        if (!active) return;

        setLeads(data);
        setSelectedLeadId((current) => {
          if (data.length === 0) return null;
          if (current && data.some((lead) => lead.id === current)) return current;
          return data[0].id;
        });
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load leads');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadLeads();
    return () => {
      active = false;
    };
  }, [statusFilter, sortBy, sortOrder]);

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.id === selectedLeadId) || null,
    [leads, selectedLeadId]
  );

  useEffect(() => {
    setEditableDraft(selectedLead?.ai_draft || '');
  }, [selectedLead?.id, selectedLead?.ai_draft]);

  function replaceLead(updatedLead: Lead) {
    setLeads((current) => current.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)));
  }

  async function handleStatusUpdate(nextStatus: LeadStatus) {
    if (!selectedLead) return;
    setUpdatingStatus(true);
    setActionError(null);
    try {
      const updated = await updateLeadStatus(selectedLead.id, nextStatus);
      replaceLead(updated);
    } catch (updateError) {
      setActionError(updateError instanceof Error ? updateError.message : 'Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleScore() {
    if (!selectedLead) return;
    setScoring(true);
    setActionError(null);
    try {
      const result = await scoreLead(selectedLead.id);
      replaceLead(result.lead);
    } catch (scoreError) {
      setActionError(scoreError instanceof Error ? scoreError.message : 'Failed to score lead');
    } finally {
      setScoring(false);
    }
  }

  async function handleDraft() {
    if (!selectedLead) return;
    setDrafting(true);
    setActionError(null);
    try {
      const result = await draftLead(selectedLead.id);
      replaceLead(result.lead);
      setEditableDraft(result.draft);
    } catch (draftError) {
      setActionError(draftError instanceof Error ? draftError.message : 'Failed to draft follow-up');
    } finally {
      setDrafting(false);
    }
  }

  return (
    <main className="app-shell">
      <div className="ambient" aria-hidden="true" />
      <section className="dashboard">
        <Header />

        <FiltersBar
          statuses={STATUSES}
          sortOptions={SORT_OPTIONS}
          statusFilter={statusFilter}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onStatusChange={setStatusFilter}
          onSortByChange={setSortBy}
          onSortOrderChange={setSortOrder}
          formatStatus={formatStatus}
        />

        <section className="content-grid">
          <LeadsList
            leads={leads}
            loading={loading}
            error={error}
            selectedLeadId={selectedLeadId}
            onSelectLead={setSelectedLeadId}
            formatBudget={formatBudget}
          />

          <LeadDetails
            selectedLead={selectedLead}
            statuses={STATUSES}
            updatingStatus={updatingStatus}
            scoring={scoring}
            drafting={drafting}
            actionError={actionError}
            editableDraft={editableDraft}
            onStatusUpdate={handleStatusUpdate}
            onScore={handleScore}
            onDraft={handleDraft}
            onDraftChange={setEditableDraft}
            formatStatus={formatStatus}
            formatBudget={formatBudget}
            formatDateTime={formatDateTime}
          />
        </section>
      </section>
    </main>
  );
}

export default App;
