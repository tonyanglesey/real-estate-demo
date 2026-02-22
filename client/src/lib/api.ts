import type { Lead, LeadStatus, SortBy } from '../types/lead';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      // Keep fallback message when response isn't JSON.
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function getLeads(params: {
  status?: LeadStatus | 'all';
  sortBy?: SortBy;
  sortOrder?: 'asc' | 'desc';
}) {
  const query = new URLSearchParams();

  if (params.status && params.status !== 'all') query.set('status', params.status);
  if (params.sortBy) query.set('sortBy', params.sortBy);
  if (params.sortOrder) query.set('sortOrder', params.sortOrder);

  const suffix = query.toString() ? `?${query.toString()}` : '';
  return request<Lead[]>(`/leads${suffix}`);
}

export function updateLeadStatus(id: number, status: LeadStatus) {
  return request<Lead>(`/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function scoreLead(id: number) {
  return request<{ lead: Lead; ai: { score: number; reasoning: string } }>(
    `/leads/${id}/score`,
    { method: 'POST' }
  );
}

export function draftLead(id: number) {
  return request<{ lead: Lead; draft: string }>(`/leads/${id}/draft`, {
    method: 'POST',
  });
}
