'use client';

import { Chip, Group } from '@mantine/core';
import { BaseSkeleton } from '../base-skeleton/base-skeleton';

export interface BaseChipOption {
  label: string;
  value: string;
}

export interface BaseChipGroupProps {
  options: BaseChipOption[];
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export function BaseChipGroup({ options, value, onChange, isLoading }: BaseChipGroupProps) {
  if (isLoading) {
    return <BaseSkeleton width="60%" height={28} radius="xl" />;
  }

  return (
    <Chip.Group multiple={false} value={value} onChange={onChange}>
      <Group gap="xs">
        {options.map(option => (
          <Chip key={option.value} value={option.value}>
            {option.label}
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  );
}
