import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type BaseFormFieldProps = {
  label: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  className?: string;
};

type InputFieldProps = BaseFormFieldProps &
  Omit<React.ComponentPropsWithoutRef<typeof Input>, 'className' | 'children'> & {
    as?: 'input';
    children?: never;
  };

type SelectFieldProps = BaseFormFieldProps &
  Omit<React.ComponentPropsWithoutRef<'select'>, 'className' | 'children'> & {
    as: 'select';
    children: React.ReactNode;
  };

export type FormFieldProps = InputFieldProps | SelectFieldProps;

const fieldClasses =
  'h-8 w-full rounded-lg border border-input bg-background px-2 py-1 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20 dark:bg-input/30 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40';

export const FormField = React.forwardRef<HTMLInputElement | HTMLSelectElement, FormFieldProps>(
  function FormField(
    { as = 'input', label, error, containerClassName, labelClassName, className, id, ...props },
    ref,
  ) {
    const generatedId = React.useId();
    const fieldId = id ?? generatedId;

    return (
      <div className={cn('flex w-full flex-col gap-2', containerClassName)}>
        <Label htmlFor={fieldId} className={cn('text-sm font-medium', labelClassName)}>
          {label}
        </Label>

        {as === 'select' ? (
          <select
            id={fieldId}
            ref={ref as React.Ref<HTMLSelectElement>}
            aria-invalid={Boolean(error)}
            className={cn(fieldClasses, className)}
            {...(props as React.ComponentPropsWithoutRef<'select'>)}
          />
        ) : (
          <Input
            id={fieldId}
            ref={ref as React.Ref<HTMLInputElement>}
            aria-invalid={Boolean(error)}
            className={cn(fieldClasses, className)}
            {...(props as React.ComponentPropsWithoutRef<typeof Input>)}
          />
        )}

        {error ? <p className="text-sm text-danger">{error}</p> : null}
      </div>
    );
  },
);
