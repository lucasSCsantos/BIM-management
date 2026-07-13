import type { RevisionStatus } from '@/types/revision.types';

type RevisionSortBy = 'date' | 'status';

export interface GetRevisionsParams {
  q: string;
  projectId: string | null;
  status: RevisionStatus | null;
  sortBy: RevisionSortBy | null;
  sortDir: 'asc' | 'desc';
  page: number;
  pageSize: number;
}
