import type { ReactNode } from 'react';
import { Paper } from '@mantine/core';
import { BaseSkeleton } from '../base-skeleton/base-skeleton';
import styles from './base-card.module.scss';

export interface BaseCardProps {
  children: ReactNode;
  isLoading?: boolean;
}

export function BaseCard({ children, isLoading }: BaseCardProps) {
  return (
    <Paper className={styles.card} shadow="xs">
      {isLoading ? <BaseSkeleton rows={3} /> : children}
    </Paper>
  );
}
