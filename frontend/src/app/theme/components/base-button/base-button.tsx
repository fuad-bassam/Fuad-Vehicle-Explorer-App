'use client';

import Link from 'next/link';
import { Button } from '@mantine/core';

export interface BaseButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
  href?: string;
  onClick?: () => void;
}

const primaryColors = {
  root: {
    '--button-bg': 'var(--Background-Primary-Default)',
    '--button-hover': 'var(--Background-Primary-Hover)',
    '--button-color': 'var(--Text-Fixed-White-High-emphasis)'
  }
};

export function BaseButton({ label, variant = 'primary', disabled, isLoading, href, onClick }: BaseButtonProps) {
  const look = {
    variant: variant === 'primary' ? 'filled' : 'outline',
    vars: variant === 'primary' ? () => primaryColors : undefined,
    disabled,
    loading: isLoading
  };

  if (href) {
    return (
      <Button {...look} component={Link} href={href}>
        {label}
      </Button>
    );
  }

  return (
    <Button {...look} onClick={onClick}>
      {label}
    </Button>
  );
}
