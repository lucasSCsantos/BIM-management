import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const skeletonVariants = cva('animate-pulse bg-muted', {
  variants: {
    /** Visual shape of the placeholder. */
    variant: {
      rect: 'rounded-md',
      text: 'rounded-sm h-4',
      circle: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'rect',
  },
});

/** Props for {@link Skeleton}. */
export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

/**
 * Loading placeholder with a pulse animation.
 * Pass `className` to control width/height and `variant` for the shape.
 */
export function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div aria-hidden="true" className={cn(skeletonVariants({ variant }), className)} {...props} />
  );
}
