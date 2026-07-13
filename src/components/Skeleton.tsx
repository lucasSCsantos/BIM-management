import * as React from 'react';

import { Skeleton as BaseSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export type SkeletonVariant = 'text' | 'rectangular' | 'circular';

export interface SkeletonProps extends React.ComponentPropsWithoutRef<typeof BaseSkeleton> {
  variant?: SkeletonVariant;
}

const skeletonVariants: Record<SkeletonVariant, string> = {
  text: 'h-4 rounded-md',
  rectangular: 'rounded-md',
  circular: 'rounded-full',
};

export function Skeleton({ variant = 'rectangular', className, ...props }: SkeletonProps) {
  return <BaseSkeleton className={cn(skeletonVariants[variant], className)} {...props} />;
}
