import { forwardRef, useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Props for {@link SearchInput}. */
export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  /** Called with the input value after `delay` ms of inactivity. */
  onDebouncedChange: (value: string) => void;
  /** Debounce delay in milliseconds. @default 350 */
  delay?: number;
}

/**
 * Search field with a built-in debounce. Manages its own value internally
 * and notifies the parent only after the configured `delay`.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { onDebouncedChange, delay = 350, className, placeholder = 'Buscar...', ...props },
  ref,
) {
  const [value, setValue] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setValue(next);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => onDebouncedChange(next), delay);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        ref={ref}
        type="search"
        role="searchbox"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-input bg-card pl-9 pr-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        {...props}
      />
    </div>
  );
});
