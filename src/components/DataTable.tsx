import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './Skeleton';

/** Describes a single column of {@link DataTable}. */
export interface Column<T> {
  /** Unique key; used as React key and to read `row[key]` when no `render`. */
  key: string;
  /** Column header text. */
  header: string;
  /** Custom cell renderer. Falls back to `String(row[key])` when omitted. */
  render?: (row: T) => ReactNode;
}

/** Props for {@link DataTable}. */
export interface DataTableProps<T> {
  /** Column definitions. */
  columns: Column<T>[];
  /** Row data. */
  rows: T[];
  /** Shows skeleton rows while true. */
  loading?: boolean;
  /** Number of skeleton rows to render while loading. @default 5 */
  skeletonRows?: number;
  /** Message shown when there are no rows and not loading. */
  emptyMessage?: ReactNode;
  /** Optional row click handler. */
  onRowClick?: (row: T) => void;
  className?: string;
}

/**
 * Generic, domain-agnostic table. Renders columns/rows as provided, with
 * built-in loading (skeleton) and empty states.
 */
export function DataTable<T>({
  columns,
  rows,
  loading = false,
  skeletonRows = 5,
  emptyMessage = 'Nenhum resultado encontrado.',
  onRowClick,
  className,
}: DataTableProps<T>) {
  const isEmpty = !loading && rows.length === 0;

  return (
    <div
      className={cn('w-full overflow-hidden rounded-lg border border-border bg-card', className)}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-4 py-3 text-sm font-semibold text-muted-foreground"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                  <tr key={`skeleton-${rowIndex}`} className="border-b border-border">
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-3">
                        <Skeleton variant="text" className="w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              : rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn(
                      'border-b border-border last:border-b-0',
                      onRowClick && 'cursor-pointer transition-colors hover:bg-muted',
                    )}
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-3 text-base text-foreground">
                        {column.render
                          ? column.render(row)
                          : String((row as Record<string, unknown>)[column.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {isEmpty ? (
        <div className="px-4 py-12 text-center text-base text-muted-foreground">{emptyMessage}</div>
      ) : null}
    </div>
  );
}
