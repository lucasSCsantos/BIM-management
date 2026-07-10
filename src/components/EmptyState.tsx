import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Optional call-to-action button for {@link EmptyState}. */
export interface EmptyStateAction {
  /** Button label, e.g. "Tentar novamente". */
  label: string;
  /** Click handler. */
  onClick: () => void;
}

/** Props for {@link EmptyState}. */
export interface EmptyStateProps {
  /** Main heading of the state. */
  title: string;
  /** Supporting description text. */
  description?: string;
  /** Icon component from lucide-react. */
  icon?: LucideIcon;
  /** Optional action rendered as a button. */
  action?: EmptyStateAction;
  className?: string;
}

/**
 * Generic placeholder for "no results", "error" or "not found" states.
 */
export function EmptyState({ title, description, icon: Icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card px-6 py-12 text-center',
        className,
      )}
    >
      {Icon ? (
        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Icon className="size-6" aria-hidden="true" />
        </div>
      ) : null}

      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-foreground text-balance">{title}</h3>
        {description ? (
          <p className="text-sm text-muted-foreground text-pretty">{description}</p>
        ) : null}
      </div>

      {action ? (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-base font-medium text-primary-foreground outline-none transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
