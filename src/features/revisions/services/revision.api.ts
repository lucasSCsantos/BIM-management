import { api } from '@/lib/api';
import type { Revision, RevisionStatus } from '@/types/revision.types';

type RevisionOrderBy = 'date' | 'projectName';

export type GetRevisionsParams = {
  page?: number;
  limit?: number;
  pageSize?: number;
  search?: string;
  projectName?: string;
  status?: RevisionStatus | RevisionStatus[];
  orderBy?: RevisionOrderBy;
  orderDirection?: 'asc' | 'desc';
};

export async function getRevisions(params: GetRevisionsParams = {}) {
  const queryParams = new URLSearchParams();

  if (params.page != null) {
    queryParams.set('page', String(params.page));
  }

  if (params.limit != null) {
    queryParams.set('limit', String(params.limit));
  } else if (params.pageSize != null) {
    queryParams.set('limit', String(params.pageSize));
  }

  if (params.search?.trim()) {
    queryParams.set('search', params.search.trim());
  }

  if (params.projectName?.trim()) {
    queryParams.set('projectName', params.projectName.trim());
  }

  if (params.status) {
    const statuses = Array.isArray(params.status) ? params.status : [params.status];

    for (const status of statuses) {
      queryParams.append('status', status);
    }
  }

  if (params.orderBy) {
    queryParams.set('orderBy', params.orderBy);
  }

  if (params.orderDirection) {
    queryParams.set('orderDirection', params.orderDirection);
  }

  const queryString = queryParams.toString();

  const { data } = await api.get<Revision[]>(`/revisions${queryString ? `?${queryString}` : ''}`);
  return data;
}

export async function getRevision(id: string) {
  const { data } = await api.get<Revision>(`/revisions/${id}`);
  return data;
}

export async function createRevision(revision: Partial<Revision>) {
  const { data } = await api.post<Revision>('/revisions', revision);
  return data;
}
