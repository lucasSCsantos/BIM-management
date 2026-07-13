import { ChevronDown, ChevronUp, CircleAlert } from 'lucide-react';
import { Link } from 'react-router';

import { EmptyState } from '@/components/EmptyState';
import { StatusBadge } from '@/components/StatusBadge';
import { formatDate } from '@/utils/format-date';
import { useRevisionsQuery } from '../hooks/use-revisions-query';
import type { RevisionsFilters, RevisionsSortBy } from '../hooks/use-revisions-filters';
import type { RevisionListItem } from '../types/revision-list-item.types';
import type { RevisionStatus } from '@/types/revision.types';
import { DataTable, type DataTableColumn } from '@/components/DataTable';
import { Button } from '@/components/ui/button';

const statusVariantByRevisionStatus: Record<RevisionStatus, 'neutral' | 'success' | 'danger'> = {
  DRAFT: 'neutral',
  APPROVED: 'success',
  OBSOLETE: 'danger',
};

type RevisionsTableProps = {
  filters: RevisionsFilters;
};

function getColumns({
  sortBy,
  sortDir,
  setSort,
}: Pick<RevisionsTableProps['filters'], 'sortBy' | 'sortDir' | 'setSort'>) {
  return [
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
      header: (
        <SortHeader
          label="Data"
          sortBy="date"
          activeSortBy={sortBy}
          sortDir={sortDir}
          setSort={setSort}
        />
      ),
      render: (revision) =>
        renderLinkedCell(formatDate(revision.createdAt), `/revisions/${revision.id}`),
    },
    {
      key: 'status',
      header: (
        <SortHeader
          label="Situação"
          sortBy="status"
          activeSortBy={sortBy}
          sortDir={sortDir}
          setSort={setSort}
        />
      ),
      render: (revision) => {
        return renderLinkedCell(
          <StatusBadge variant={statusVariantByRevisionStatus[revision.status]}>
            {revision.status}
          </StatusBadge>,
          `/revisions/${revision.id}`,
        );
      },
    },
  ] satisfies Array<DataTableColumn<RevisionListItem>>;
}

function SortHeader({
  label,
  sortBy,
  activeSortBy,
  sortDir,
  setSort,
}: {
  label: string;
  sortBy: RevisionsSortBy;
  activeSortBy: RevisionsSortBy | null;
  sortDir: 'asc' | 'desc';
  setSort: (sortBy: RevisionsSortBy) => void;
}) {
  const isActive = sortBy === activeSortBy;
  const Icon = sortDir === 'asc' ? ChevronUp : ChevronDown;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="-ml-2 text-sm text-muted-foreground hover:text-foreground"
      onClick={() => setSort(sortBy)}
    >
      {label}
      {isActive ? <Icon aria-label={sortDir === 'asc' ? 'Crescente' : 'Decrescente'} /> : null}
    </Button>
  );
}

function renderLinkedCell(value: React.ReactNode, to: string) {
  return (
    <Link to={to} className="block w-full text-foreground transition-colors hover:text-primary">
      {value}
    </Link>
  );
}

function RevisionsLoadingState({ columns }: { columns: Array<DataTableColumn<RevisionListItem>> }) {
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

export function RevisionsTable({ filters }: RevisionsTableProps) {
  const { data, isLoading, isError, refetch } = useRevisionsQuery(filters);
  const columns = getColumns(filters);

  const revisions = data?.data ?? [];
  const meta = data?.meta;

  if (isLoading) {
    return <RevisionsLoadingState columns={columns} />;
  }

  if (isError) {
    return <RevisionsErrorState onRetry={() => void refetch()} />;
  }

  return (
    <DataTable
      columns={columns}
      rows={revisions}
      pagination={meta ? { ...meta, onPageChange: filters.setPage } : undefined}
      loadingRowCount={5}
      emptyMessage="Nenhuma revisão encontrada para os filtros selecionados"
    />
  );
}
