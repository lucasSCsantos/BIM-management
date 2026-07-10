import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1 text-sm font-medium',
  {
    variants: {
      /** Semantic color of the badge. Purely presentational. */
      variant: {
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        neutral: 'bg-neutral text-neutral-foreground',
        danger: 'bg-danger text-danger-foreground',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
);

/** Props for {@link StatusBadge}. */
export interface StatusBadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof statusBadgeVariants> {
  /** Text displayed inside the badge. */
  label: string;
}

/**
 * Generic colored badge. The consumer maps business meaning to a `variant`;
 * the component itself holds no domain logic.
 */
export function StatusBadge({ variant, label, className, ...props }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {label}
    </span>
  );
}
