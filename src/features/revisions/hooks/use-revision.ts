import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRevision, getRevision } from '../services/revision.api';

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
