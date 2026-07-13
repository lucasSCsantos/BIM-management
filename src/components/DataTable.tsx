import * as React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/Skeleton';
import { cn } from '@/lib/utils';
import type { PaginatedResponseMeta } from '@/types/api.types';

export type DataTableColumn<T> = {
  key: string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
};

export type DataTablePaginationProps = PaginatedResponseMeta & {
  onPageChange: (page: number) => void;
};

export interface DataTableProps<T> {
  columns: Array<DataTableColumn<T>>;
  rows: T[];
  isLoading?: boolean;
  loadingRowCount?: number;
  emptyMessage?: React.ReactNode;
  pagination?: DataTablePaginationProps;
  className?: string;
}

function resolveCellValue(value: unknown): React.ReactNode {
  if (
    React.isValidElement(value) ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'bigint'
  ) {
    return value;
  }

  if (typeof value === 'boolean') {
    return value ? 'Sim' : 'Não';
  }

  if (value == null) {
    return '—';
  }

  return String(value);
}

function getPaginationState(pagination: DataTablePaginationProps) {
  const totalItems = Math.max(0, pagination.total);
  const totalPages = Math.max(0, pagination.totalPages);
  const currentPage = totalPages > 0 ? Math.min(Math.max(pagination.page, 1), totalPages) : 0;

  if (totalPages === 0) {
    return {
      currentPage,
      totalPages,
      startItem: 0,
      endItem: 0,
    };
  }

  return {
    currentPage,
    totalPages,
    startItem: totalItems === 0 ? 0 : (currentPage - 1) * pagination.limit + 1,
    endItem: Math.min(currentPage * pagination.limit, totalItems),
  };
}

function PaginationSummary({
  startItem,
  endItem,
  totalItems,
}: {
  startItem: number;
  endItem: number;
  totalItems: number;
}) {
  return (
    <p className="text-sm text-muted-foreground">
      Mostrando {startItem}–{endItem} de {totalItems}
    </p>
  );
}

function PaginationControls({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: DataTablePaginationProps & { currentPage: number; totalPages: number }) {
  const isFirstPage = !hasPreviousPage || currentPage <= 1;
  const isLastPage = !hasNextPage || currentPage >= totalPages;

  const handlePageChange = (nextPage: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    onPageChange(nextPage);
  };

  const controlClassName = 'transition-opacity';
  const disabledClassName = 'pointer-events-none opacity-50';

  return (
    <Pagination className="mx-0 w-auto justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text="Anterior"
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : 0}
            onClick={handlePageChange(currentPage - 1)}
            className={cn(controlClassName, isFirstPage && disabledClassName)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            text="Próxima"
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : 0}
            onClick={handlePageChange(currentPage + 1)}
            className={cn(controlClassName, isLastPage && disabledClassName)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function DataTable<T>({
  columns,
  rows,
  isLoading = false,
  loadingRowCount = 3,
  emptyMessage = 'No items found.',
  pagination,
  className,
}: DataTableProps<T>) {
  const visibleRowCount = Math.max(loadingRowCount, 1);
  const colSpan = Math.max(columns.length, 1);
  const paginationState = pagination ? getPaginationState(pagination) : null;
  const shouldRenderPagination = Boolean(
    pagination &&
    !isLoading &&
    rows.length > 0 &&
    paginationState &&
    paginationState.totalPages > 0,
  );

  return (
    <div className={cn('w-full', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: visibleRowCount }).map((_, rowIndex) => (
              <TableRow key={`loading-row-${rowIndex}`}>
                {columns.map((column, columnIndex) => (
                  <TableCell key={`${column.key}-${columnIndex}`}>
                    <Skeleton
                      variant="text"
                      className={cn('h-4', columnIndex === 0 ? 'w-3/4' : 'w-full')}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(row)
                      : resolveCellValue((row as Record<string, unknown>)[column.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={colSpan}
                className="py-8 text-center text-sm text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {shouldRenderPagination && pagination && paginationState ? (
        <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <PaginationSummary
            startItem={paginationState.startItem}
            endItem={paginationState.endItem}
            totalItems={pagination.total}
          />
          <PaginationControls
            {...pagination}
            currentPage={paginationState.currentPage}
            totalPages={paginationState.totalPages}
          />
        </div>
      ) : null}
    </div>
  );
}
