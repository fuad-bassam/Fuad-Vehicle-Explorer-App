'use client';

import { SegmentedControl } from '@mantine/core';

export interface BaseSegmentedSwitchOption {
  label: string;
  value: string;
}

export interface BaseSegmentedSwitchProps {
  options: BaseSegmentedSwitchOption[];
  value: string;
  onChange: (value: string) => void;
}

export function BaseSegmentedSwitch({ options, value, onChange }: BaseSegmentedSwitchProps) {
  return <SegmentedControl data={options} value={value} onChange={onChange} size="xs" />;
}
