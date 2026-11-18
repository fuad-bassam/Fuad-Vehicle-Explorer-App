'use client';

import { SegmentedControl } from '@mantine/core';
import { BaseIcon, type BaseIconName } from '../base-icon/base-icon';
import styles from './base-segmented-switch.module.scss';

export interface BaseSegmentedSwitchOption {
  label: string;
  value: string;
  icon?: BaseIconName;
}

export interface BaseSegmentedSwitchProps {
  options: BaseSegmentedSwitchOption[];
  value: string;
  onChange: (value: string) => void;
}

export function BaseSegmentedSwitch({ options, value, onChange }: BaseSegmentedSwitchProps) {
  return (
    <SegmentedControl
      data={options.map(option => ({
        value: option.value,
        label: option.icon ? (
          <span className={styles.label}>
            <BaseIcon name={option.icon} size="small" />
            {option.label}
          </span>
        ) : (
          option.label
        )
      }))}
      value={value}
      onChange={onChange}
      size="sm"
    />
  );
}
