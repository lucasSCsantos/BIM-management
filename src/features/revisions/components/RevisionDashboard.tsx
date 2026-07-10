import { DataTable } from '@/components/DataTable';
import { useRevisions } from '../hooks/use-revision';

export function RevisionDashboard() {
  const { data: revisions, isLoading, isSuccess } = useRevisions();

  if (isLoading) {
    return null;
  }

  if (!isSuccess) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Revisões</h1>
      <DataTable
        columns={
          revisions.data[0]
            ? Object.keys(revisions.data[0]).map((key) => ({
                key,
                header: key.charAt(0).toUpperCase() + key.slice(1),
              }))
            : []
        }
        rows={revisions?.data ?? []}
        loading={isLoading}
        skeletonRows={5}
        emptyMessage="Nenhum documento encontrado."
        onRowClick={(revision) => {
          console.log('Revisão clicada:', revision);
        }}
      />
    </div>
  );
}
