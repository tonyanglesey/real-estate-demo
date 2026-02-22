export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost' | 'closed';

export type SortBy = 'created_at' | 'ai_score' | 'budget_min' | 'budget_max';

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  inquiry_message: string;
  property_type: 'single-family' | 'multi-unit' | 'commercial' | 'condo' | string;
  budget_min: number | null;
  budget_max: number | null;
  timeline: string | null;
  status: LeadStatus;
  ai_score: number | null;
  ai_reasoning: string | null;
  ai_draft: string | null;
  created_at: string;
  updated_at: string;
}
