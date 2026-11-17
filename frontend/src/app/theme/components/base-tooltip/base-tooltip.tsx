'use client';

import type { ReactNode } from 'react';
import { Tooltip } from '@mantine/core';

export interface BaseTooltipProps {
  label: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function BaseTooltip({ label, children, position = 'top' }: BaseTooltipProps) {
  return (
    <Tooltip label={label} position={position} withArrow>
      <div>{children}</div>
    </Tooltip>
  );
}
