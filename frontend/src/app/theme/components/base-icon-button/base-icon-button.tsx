'use client';

import { ActionIcon } from '@mantine/core';
import { BaseIcon, type BaseIconName } from '../base-icon/base-icon';
import { BaseTooltip, type BaseTooltipProps } from '../base-tooltip/base-tooltip';
import styles from './base-icon-button.module.scss';

export interface BaseIconButtonProps {
  icon: BaseIconName;
  label: string;
  variant?: 'default' | 'floating';
  tooltipPosition?: BaseTooltipProps['position'];
  onClick?: () => void;
}

export function BaseIconButton({ icon, label, variant = 'default', tooltipPosition = 'bottom', onClick }: BaseIconButtonProps) {
  return (
    <BaseTooltip label={label} position={tooltipPosition}>
      <ActionIcon className={styles[variant]} aria-label={label} onClick={onClick}>
        <BaseIcon name={icon} size={variant === 'floating' ? 'large' : 'medium'} />
      </ActionIcon>
    </BaseTooltip>
  );
}
