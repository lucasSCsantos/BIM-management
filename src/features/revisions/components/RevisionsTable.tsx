import { CircleAlert, ArchiveX } from 'lucide-react';
import { Link } from 'react-router';

import { EmptyState } from '@/components/EmptyState';
import { StatusBadge } from '@/components/StatusBadge';
import { formatDate } from '@/utils/format-date';
import { useRevisions } from '../hooks/use-revision';
import type { RevisionListItem } from '../types/revision-list-item.types';
import type { RevisionStatus } from '@/types/revision.types';
import { DataTable, type DataTableColumn } from '@/components/DataTable';
import { useState } from 'react';

const statusVariantByRevisionStatus: Record<RevisionStatus, 'neutral' | 'success' | 'danger'> = {
  DRAFT: 'neutral',
  APPROVED: 'success',
  OBSOLETE: 'danger',
};

const columns: Array<DataTableColumn<RevisionListItem>> = [
  {
    key: 'projectName',
    header: 'Projeto',
    render: (revision) => renderLinkedCell(revision.projectName, `/revisions/${revision.id}`),
  },
  {
    key: 'disciplineName',
    header: 'Disciplina',
    render: (revision) => renderLinkedCell(revision.disciplineName, `/revisions/${revision.id}`),
  },
  {
    key: 'modelName',
    header: 'Modelo',
    render: (revision) => renderLinkedCell(revision.modelName, `/revisions/${revision.id}`),
  },
  {
    key: 'revision',
    header: 'Revisão',
    render: (revision) => renderLinkedCell(`R${revision.revision}`, `/revisions/${revision.id}`),
  },
  {
    key: 'reviewer',
    header: 'Responsável',
    render: (revision) => renderLinkedCell(revision.reviewer, `/revisions/${revision.id}`),
  },
  {
    key: 'createdAt',
    header: 'Data',
    render: (revision) =>
      renderLinkedCell(formatDate(revision.createdAt), `/revisions/${revision.id}`),
  },
  {
    key: 'status',
    header: 'Situação',
    render: (revision) => {
      return renderLinkedCell(
        <StatusBadge variant={statusVariantByRevisionStatus[revision.status]}>
          {revision.status}
        </StatusBadge>,
        `/revisions/${revision.id}`,
      );
    },
  },
];

function renderLinkedCell(value: React.ReactNode, to: string) {
  return (
    <Link to={to} className="block w-full text-foreground transition-colors hover:text-primary">
      {value}
    </Link>
  );
}

function RevisionsLoadingState() {
  return <DataTable columns={columns} rows={[]} isLoading loadingRowCount={5} />;
}

function RevisionsErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <EmptyState
      title="Falha ao carregar revisões"
      description="Não foi possível buscar a lista de revisões no momento."
      icon={CircleAlert}
      action={{
        label: 'Tentar novamente',
        onClick: onRetry,
      }}
    />
  );
}

function RevisionsEmptyState() {
  return (
    <EmptyState
      title="Nenhuma revisão cadastrada ainda"
      description="Quando houver revisões registradas, elas aparecerão nesta tabela."
      icon={ArchiveX}
    />
  );
}

export function RevisionsTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useRevisions({ page });

  const revisions = data?.data ?? [];
  const meta = data?.meta;

  if (isLoading) {
    return <RevisionsLoadingState />;
  }

  if (isError) {
    return <RevisionsErrorState onRetry={() => void refetch()} />;
  }

  if (revisions.length === 0) {
    return <RevisionsEmptyState />;
  }

  return (
    <DataTable
      columns={columns}
      rows={revisions}
      pagination={meta ? { ...meta, onPageChange: setPage } : undefined}
      loadingRowCount={5}
      emptyMessage="Nenhuma revisão cadastrada ainda"
    />
  );
}
