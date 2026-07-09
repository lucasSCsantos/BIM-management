export interface Revision {
  id: string;
  modelId: string;
  revision: number;
  status: RevisionStatus;
  reviewer: string;
  notes: string;
  createdAt: string;
}

export type RevisionStatus = 'DRAFT' | 'APPROVED' | 'OBSOLETE';
