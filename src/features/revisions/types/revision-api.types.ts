import type { RevisionStatus } from '@/types/revision.types';

type RevisionOrderBy = 'date' | 'projectName';

export interface GetRevisionsParams {
  page?: number;
  limit?: number;
  pageSize?: number;
  search?: string;
  projectName?: string;
  status?: RevisionStatus | RevisionStatus[];
  orderBy?: RevisionOrderBy;
  orderDirection?: 'asc' | 'desc';
}
