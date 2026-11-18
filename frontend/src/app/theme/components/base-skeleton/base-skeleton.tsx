import { Skeleton } from '@mantine/core';
import styles from './base-skeleton.module.scss';

export interface BaseSkeletonProps {
  width?: number | string;
  height?: number;
  rows?: number;
  radius?: 'sm' | 'md' | 'xl';
}

export function BaseSkeleton({ width = '100%', height = 16, rows = 1, radius = 'sm' }: BaseSkeletonProps) {
  return (
    <div className={styles.skeleton} aria-busy="true">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} width={width} height={height} radius={radius} />
      ))}
    </div>
  );
}
