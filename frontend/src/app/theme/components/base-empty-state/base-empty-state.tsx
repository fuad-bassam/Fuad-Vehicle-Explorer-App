import { BaseTypography } from '../base-typography/base-typography';
import styles from './base-empty-state.module.scss';

export interface BaseEmptyStateProps {
  title: string;
  description?: string;
}

export function BaseEmptyState({ title, description }: BaseEmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <BaseTypography text={title} type="subtitle" />
      {description && <BaseTypography text={description} color="muted" />}
    </div>
  );
}
