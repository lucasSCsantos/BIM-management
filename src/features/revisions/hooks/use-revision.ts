import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRevision, getRevision, getRevisions } from '../services/revision.api';
import type { RevisionListItem } from '../types/revision-list-item.types';
import type { DefaultListResponse } from '@/types/api.types';

type RevisionsParams = Parameters<typeof getRevisions>[0];

export type RevisionsQueryData = DefaultListResponse<RevisionListItem>;

export function useRevisions(params?: RevisionsParams) {
  return useQuery({
    queryKey: ['revisions', params],
    queryFn: () => getRevisions(params),
  });
}

export function useRevision(id: string) {
  return useQuery({
    queryKey: ['revisions', id],
    queryFn: () => getRevision(id),
  });
}

export function useCreateRevision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRevision,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['revisions'] });
    },
  });
}
