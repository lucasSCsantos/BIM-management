/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type BaseProps = {
  /** Text shown in the field label. */
  label: string;
  /** Error message rendered below the control. */
  error?: string;
  /** Extra classes applied to the outer wrapper. */
  className?: string;
};

type InputFieldProps = BaseProps & {
  as?: 'input';
} & React.InputHTMLAttributes<HTMLInputElement>;

type SelectFieldProps = BaseProps & {
  as: 'select';
  /** `<option>` elements for the select control. */
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

/** Props for {@link FormField}. */
export type FormFieldProps = InputFieldProps | SelectFieldProps;

const controlClasses =
  'h-10 w-full rounded-md border bg-card px-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring';

/**
 * Generic form field: label + control + error message. Forwards its ref to the
 * underlying element so it works with React Hook Form's `register`.
 * Renders an `<input>` by default or a `<select>` when `as="select"`.
 */
export const FormField = forwardRef<HTMLInputElement | HTMLSelectElement, FormFieldProps>(
  function FormField(props, ref) {
    const { label, error, className, id, ...rest } = props;
    const controlId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const errorId = `${controlId}-error`;

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <label htmlFor={controlId} className="text-sm font-medium text-foreground">
          {label}
        </label>

        {rest.as === 'select'
          ? (() => {
              const { as: _as, children, ...selectProps } = rest as SelectFieldProps;
              return (
                <select
                  id={controlId}
                  ref={ref as React.Ref<HTMLSelectElement>}
                  aria-invalid={!!error}
                  aria-describedby={error ? errorId : undefined}
                  className={cn(controlClasses, error && 'border-danger')}
                  {...selectProps}
                >
                  {children}
                </select>
              );
            })()
          : (() => {
              const { as: _as, ...inputProps } = rest as InputFieldProps;
              return (
                <input
                  id={controlId}
                  ref={ref as React.Ref<HTMLInputElement>}
                  aria-invalid={!!error}
                  aria-describedby={error ? errorId : undefined}
                  className={cn(controlClasses, error && 'border-danger')}
                  {...inputProps}
                />
              );
            })()}

        {error ? (
          <p id={errorId} className="text-sm text-danger">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
