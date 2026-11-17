import type { ReactNode } from 'react';
import { Paper } from '@mantine/core';
import { BaseSkeleton } from '../base-skeleton/base-skeleton';
import styles from './base-card.module.scss';

export interface BaseCardProps {
  children?: ReactNode;
  variant?: 'default' | 'subtle';
  isLoading?: boolean;
}

export function BaseCard({ children, variant = 'default', isLoading }: BaseCardProps) {
  return (
    <Paper className={`${styles.card} ${styles[variant]}`} shadow={variant === 'default' ? 'xs' : undefined}>
      {isLoading ? <BaseSkeleton rows={3} /> : children}
    </Paper>
  );
}
