import * as React from 'react';
import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: EmptyStateAction;
  className?: string;
}

export function EmptyState({ title, description, icon: Icon, action, className }: EmptyStateProps) {
  return (
    <Card className={cn('rounded-lg', className)}>
      <div className="flex flex-col items-start gap-4 p-6">
        {Icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="size-5" aria-hidden />
          </div>
        ) : null}

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium text-foreground">{title}</h3>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>

        {action ? (
          <Button variant="outline" onClick={action.onClick}>
            {action.label}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
