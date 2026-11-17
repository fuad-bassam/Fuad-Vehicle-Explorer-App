'use client';

import { Loader, TextInput } from '@mantine/core';

export interface BaseTextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string;
}

export function BaseTextInput({ label, value, onChange, placeholder, disabled, isLoading, error }: BaseTextInputProps) {
  return (
    <TextInput
      label={label}
      value={value}
      onChange={event => onChange(event.currentTarget.value)}
      placeholder={placeholder}
      disabled={disabled}
      rightSection={isLoading ? <Loader size="xs" /> : undefined}
      error={error}
    />
  );
}
