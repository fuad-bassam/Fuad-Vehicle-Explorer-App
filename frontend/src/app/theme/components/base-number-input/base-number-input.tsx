'use client';

import { Loader, NumberInput } from '@mantine/core';

export interface BaseNumberInputProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string;
}

export function BaseNumberInput({
  label,
  value,
  onChange,
  min,
  max,
  placeholder,
  disabled,
  isLoading,
  error
}: BaseNumberInputProps) {
  return (
    <NumberInput
      label={label}
      value={value ?? ''}
      onChange={newValue => onChange(typeof newValue === 'number' ? newValue : null)}
      min={min}
      max={max}
      placeholder={placeholder}
      disabled={disabled}
      rightSection={isLoading ? <Loader size="xs" /> : undefined}
      error={error}
      allowDecimal={false}
    />
  );
}
