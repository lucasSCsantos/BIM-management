import { ErrorBoundary } from '@/components/ErrorBoundary';
import { EmptyState } from '@/components/EmptyState';
import { RevisionsTable } from '@/features/revisions/components/RevisionsTable';

export function Component() {
  return (
    <div className="flex flex-col gap-6">
      {/* TODO: busca e filtros entram aqui */}
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
        <RevisionsTable />
      </ErrorBoundary>
    </div>
  );
}
