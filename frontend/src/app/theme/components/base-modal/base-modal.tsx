'use client';

import type { ReactNode } from 'react';
import { Modal } from '@mantine/core';

export interface BaseModalProps {
  opened: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function BaseModal({ opened, title, onClose, children }: BaseModalProps) {
  return (
    <Modal opened={opened} title={title} onClose={onClose} centered>
      {children}
    </Modal>
  );
}
