'use client';

import { Switch } from '@mantine/core';

export interface BaseSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function BaseSwitch({ label, checked, onChange, disabled }: BaseSwitchProps) {
  return (
    <Switch
      label={label}
      checked={checked}
      onChange={event => onChange(event.currentTarget.checked)}
      disabled={disabled}
    />
  );
}
