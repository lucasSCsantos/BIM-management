import { api } from '@/lib/api';
import type {
  DefaultCreateResponse,
  DefaultGetResponse,
  PaginatedResponse,
} from '@/types/api.types';
import type { RevisionListItem } from '../types/revision-list-item.types';
import type { GetRevisionsParams } from '../types/revision-api.types';
import type { Revision } from '@/types/revision.types';

type GetRevisionsResponse = PaginatedResponse<RevisionListItem>;

type GetRevisionResponse = DefaultGetResponse<Revision>;

type CreateRevisionResponse = DefaultCreateResponse<Revision>;

export async function getRevisions(params: GetRevisionsParams) {
  const queryParams = new URLSearchParams();

  queryParams.set('page', String(params.page));
  queryParams.set('pageSize', String(params.pageSize));
  queryParams.set('sortDir', params.sortDir);

  if (params.q.trim()) {
    queryParams.set('q', params.q.trim());
  }

  if (params.projectId) {
    queryParams.set('projectId', params.projectId);
  }

  if (params.status) {
    queryParams.set('status', params.status);
  }

  if (params.sortBy) {
    queryParams.set('sortBy', params.sortBy);
  }

  const queryString = queryParams.toString();

  const { data } = await api.get<GetRevisionsResponse>(
    `/revisions${queryString ? `?${queryString}` : ''}`,
  );
  return data;
}

export async function getRevision(id: string) {
  const { data } = await api.get<GetRevisionResponse>(`/revisions/${id}`);
  return data;
}

export async function createRevision(revision: Partial<Revision>) {
  const { data } = await api.post<CreateRevisionResponse>('/revisions', revision);
  return data;
}
