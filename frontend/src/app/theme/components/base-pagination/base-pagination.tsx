'use client';

import { Pagination } from '@mantine/core';
import styles from './base-pagination.module.scss';

export interface BasePaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  disabled?: boolean;
}

export function BasePagination({ page, totalPages, onChange, disabled }: BasePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <Pagination total={totalPages} value={page} onChange={onChange} disabled={disabled} siblings={1} boundaries={1} size="sm" />
    </div>
  );
}
