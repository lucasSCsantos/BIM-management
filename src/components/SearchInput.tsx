import * as React from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface SearchInputProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Input>,
  'onChange' | 'value' | 'defaultValue'
> {
  delay?: number;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onDebouncedChange?: (value: string) => void;
  containerClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      className,
      containerClassName,
      delay = 350,
      value,
      defaultValue = '',
      onChange,
      onDebouncedChange,
      ...props
    },
    ref,
  ) {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = isControlled ? value : internalValue;
    const hasMountedRef = React.useRef(false);

    React.useEffect(() => {
      if (isControlled) {
        setInternalValue(value ?? '');
      }
    }, [isControlled, value]);

    React.useEffect(() => {
      if (!hasMountedRef.current) {
        hasMountedRef.current = true;
        return;
      }

      const timer = window.setTimeout(() => {
        onDebouncedChange?.(currentValue);
      }, delay);

      return () => window.clearTimeout(timer);
    }, [currentValue, delay, onDebouncedChange]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }

      onChange?.(event);
    };

    return (
      <div className={cn('relative w-full', containerClassName)}>
        <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={ref}
          type="search"
          value={currentValue}
          onChange={handleChange}
          className={cn('px-2 pl-8', className)}
          {...props}
        />
      </div>
    );
  },
);
