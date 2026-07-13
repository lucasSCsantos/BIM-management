import * as React from 'react';

import { Badge as BaseBadge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusBadgeVariant = 'success' | 'warning' | 'neutral' | 'danger';

const statusBadgeClasses: Record<StatusBadgeVariant, string> = {
  success: 'border-success/20 bg-success/10 text-success',
  warning: 'border-warning/20 bg-warning/10 text-warning',
  neutral: 'border-border bg-muted text-muted-foreground',
  danger: 'border-danger/20 bg-danger/10 text-danger',
};

export interface StatusBadgeProps extends Omit<
  React.ComponentPropsWithoutRef<typeof BaseBadge>,
  'variant'
> {
  variant?: StatusBadgeVariant;
}

export function StatusBadge({ variant = 'neutral', className, ...props }: StatusBadgeProps) {
  return (
    <BaseBadge
      variant="outline"
      className={cn(
        'h-6 rounded-lg px-2 py-1 text-sm font-medium',
        statusBadgeClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

export type { StatusBadgeVariant };
