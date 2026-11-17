'use client';

import { Loader, Select } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';

export interface BaseSelectProps<T> {
  label: string;
  items: T[];
  optionLabel: keyof T;
  optionValue: keyof T;
  selectedItem: T | null;
  onChange: (item: T | null) => void;
  placeholder?: string;
  disabled?: boolean;
  onSearchChange?: (text: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function BaseSelect<T>({
  label,
  items,
  optionLabel,
  optionValue,
  selectedItem,
  onChange,
  placeholder,
  disabled,
  onSearchChange,
  isLoading,
  emptyMessage
}: BaseSelectProps<T>) {
  const isSearchable = onSearchChange !== undefined;
  const search = useDebouncedCallback((text: string) => onSearchChange?.(text), 300);

  const isSelectedListed = items.some(item => item[optionValue] === selectedItem?.[optionValue]);
  const options = selectedItem && !isSelectedListed ? [selectedItem, ...items] : items;

  return (
    <Select
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      data={options.map(item => ({ value: String(item[optionValue]), label: String(item[optionLabel]) }))}
      value={selectedItem ? String(selectedItem[optionValue]) : null}
      onChange={value => onChange(options.find(item => String(item[optionValue]) === value) ?? null)}
      searchable={isSearchable}
      filter={isSearchable ? ({ options: allOptions }) => allOptions : undefined}
      onSearchChange={isSearchable ? search : undefined}
      nothingFoundMessage={emptyMessage}
      rightSection={isLoading ? <Loader size="xs" /> : undefined}
      allowDeselect={false}
    />
  );
}
