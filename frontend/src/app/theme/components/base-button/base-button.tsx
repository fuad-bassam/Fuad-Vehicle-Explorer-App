'use client';

import { Button } from '@mantine/core';

export interface BaseButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const primaryColors = {
  root: {
    '--button-bg': 'var(--Background-Primary-Default)',
    '--button-hover': 'var(--Background-Primary-Hover)',
    '--button-color': 'var(--Text-Fixed-White-High-emphasis)'
  }
};

export function BaseButton({ label, variant = 'primary', disabled, isLoading, onClick }: BaseButtonProps) {
  return (
    <Button
      variant={variant === 'primary' ? 'filled' : 'outline'}
      vars={variant === 'primary' ? () => primaryColors : undefined}
      disabled={disabled}
      loading={isLoading}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
