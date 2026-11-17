'use client';

import type { ReactNode } from 'react';
import { Alert } from '@mantine/core';
import { BaseTypography } from '../base-typography/base-typography';
import styles from './base-alert.module.scss';

export interface BaseAlertProps {
  message: string;
  title?: string;
  type?: 'info' | 'warning' | 'error';
  children?: ReactNode;
}

const colors = {
  info: 'primary',
  warning: 'yellow',
  error: 'red'
};

export function BaseAlert({ message, title, type = 'info', children }: BaseAlertProps) {
  return (
    <Alert color={colors[type]} title={title}>
      <BaseTypography text={message} />
      {children && <div className={styles.actions}>{children}</div>}
    </Alert>
  );
}
