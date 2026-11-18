import type { ReactNode } from 'react';
import { BaseTypography } from '../base-typography/base-typography';
import styles from './base-empty-state.module.scss';

export interface BaseEmptyStateProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function BaseEmptyState({ title, description, children }: BaseEmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <BaseTypography text={title} type="subtitle" />
      {description && <BaseTypography text={description} color="muted" />}
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}
