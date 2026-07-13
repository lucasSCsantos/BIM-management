import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import type { RevisionStatus } from '@/types/revision.types';

const PAGE_SIZE = 10;
const revisionStatuses: RevisionStatus[] = ['DRAFT', 'APPROVED', 'OBSOLETE'];
const sortFields = ['date', 'status'] as const;

export type RevisionsSortBy = (typeof sortFields)[number];

export type RevisionsFiltersState = {
  q: string;
  projectId: string | null;
  status: RevisionStatus | null;
  sortBy: RevisionsSortBy | null;
  sortDir: 'asc' | 'desc';
  page: number;
  pageSize: number;
};

export type RevisionsFilters = RevisionsFiltersState & {
  setQuery: (q: string) => void;
  setProjectId: (projectId: string | null) => void;
  setStatus: (status: RevisionStatus | null) => void;
  setSort: (sortBy: RevisionsSortBy | null) => void;
  setPage: (page: number) => void;
};

function getPositiveInteger(value: string | null, fallback: number) {
  const parsedValue = Number.parseInt(value ?? '', 10);

  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
}

export function useRevisionsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<RevisionsFiltersState>(() => {
    const statusParam = searchParams.get('status');
    const sortByParam = searchParams.get('sortBy');

    return {
      q: searchParams.get('q') ?? '',
      projectId: searchParams.get('projectId'),
      status: revisionStatuses.includes(statusParam as RevisionStatus)
        ? (statusParam as RevisionStatus)
        : null,
      sortBy: sortFields.includes(sortByParam as RevisionsSortBy)
        ? (sortByParam as RevisionsSortBy)
        : null,
      sortDir: searchParams.get('sortDir') === 'asc' ? 'asc' : 'desc',
      page: getPositiveInteger(searchParams.get('page'), 1),
      pageSize: PAGE_SIZE,
    };
  }, [searchParams]);

  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>, shouldResetPage = false) => {
      setSearchParams((currentSearchParams) => {
        const nextSearchParams = new URLSearchParams(currentSearchParams);

        for (const [key, value] of Object.entries(updates)) {
          if (value) {
            nextSearchParams.set(key, value);
          } else {
            nextSearchParams.delete(key);
          }
        }

        if (shouldResetPage) {
          nextSearchParams.delete('page');
        }

        return nextSearchParams;
      });
    },
    [setSearchParams],
  );

  const setQuery = useCallback(
    (q: string) => updateSearchParams({ q: q.trim() || null }, true),
    [updateSearchParams],
  );

  const setProjectId = useCallback(
    (projectId: string | null) => updateSearchParams({ projectId }, true),
    [updateSearchParams],
  );

  const setStatus = useCallback(
    (status: RevisionStatus | null) => updateSearchParams({ status }, true),
    [updateSearchParams],
  );

  const setSort = useCallback(
    (sortBy: RevisionsSortBy | null) => {
      if (!sortBy) {
        updateSearchParams({ sortBy: null, sortDir: null }, true);
        return;
      }

      const sortDir = filters.sortBy === sortBy && filters.sortDir === 'desc' ? 'asc' : 'desc';

      updateSearchParams({ sortBy, sortDir }, true);
    },
    [filters.sortBy, filters.sortDir, updateSearchParams],
  );

  const setPage = useCallback(
    (page: number) => updateSearchParams({ page: page > 1 ? String(page) : null }),
    [updateSearchParams],
  );

  return useMemo<RevisionsFilters>(
    () => ({
      ...filters,
      setQuery,
      setProjectId,
      setStatus,
      setSort,
      setPage,
    }),
    [filters, setPage, setProjectId, setQuery, setSort, setStatus],
  );
}
