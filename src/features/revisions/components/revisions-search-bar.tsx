import { SearchInput } from '@/components/SearchInput';

type RevisionsSearchBarProps = {
  value: string;
  onDebouncedChange: (value: string) => void;
};

export function RevisionsSearchBar({ value, onDebouncedChange }: RevisionsSearchBarProps) {
  return (
    <SearchInput
      value={value}
      onDebouncedChange={onDebouncedChange}
      placeholder="Buscar por projeto ou situação"
    />
  );
}
