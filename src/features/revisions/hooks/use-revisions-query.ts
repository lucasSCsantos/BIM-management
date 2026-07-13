import { useQuery } from '@tanstack/react-query';

import { getRevisions } from '../services/revision.api';
import type { RevisionsFiltersState } from './use-revisions-filters';

export function useRevisionsQuery(filters: RevisionsFiltersState) {
  const { q, projectId, status, sortBy, sortDir, page, pageSize } = filters;
  const queryFilters = { q, projectId, status, sortBy, sortDir, page, pageSize };

  return useQuery({
    queryKey: ['revisions', queryFilters],
    queryFn: () => getRevisions(queryFilters),
  });
}
