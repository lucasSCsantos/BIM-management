import { ErrorBoundary } from '@/components/ErrorBoundary';
import { EmptyState } from '@/components/EmptyState';
import { RevisionsFilters } from '@/features/revisions/components/revisions-filters';
import { RevisionsSearchBar } from '@/features/revisions/components/revisions-search-bar';
import { RevisionsTable } from '@/features/revisions/components/RevisionsTable';
import { useRevisionsFilters } from '@/features/revisions/hooks/use-revisions-filters';

export function Component() {
  const filters = useRevisionsFilters();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <RevisionsSearchBar value={filters.q} onDebouncedChange={filters.setQuery} />
        <RevisionsFilters
          projectId={filters.projectId}
          status={filters.status}
          onProjectIdChange={filters.setProjectId}
          onStatusChange={filters.setStatus}
        />
      </div>
      <ErrorBoundary
        fallback={
          <EmptyState
            title="Falha inesperada na página"
            description="Tente recarregar a rota para renderizar a listagem novamente."
            action={{
              label: 'Recarregar',
              onClick: () => window.location.reload(),
            }}
          />
        }
      >
        <RevisionsTable filters={filters} />
      </ErrorBoundary>
    </div>
  );
}
