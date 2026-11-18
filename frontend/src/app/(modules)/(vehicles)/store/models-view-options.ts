import type { BaseSegmentedSwitchOption } from '@/theme/components/base-segmented-switch/base-segmented-switch';

export const viewOptions: BaseSegmentedSwitchOption[] = [
  { label: 'Table', value: 'table', icon: 'table' },
  { label: 'Grid', value: 'grid', icon: 'layout-grid' }
];

export const sortOptions: BaseSegmentedSwitchOption[] = [
  { label: 'A–Z', value: 'asc' },
  { label: 'Z–A', value: 'desc' }
];

export const loadingCardCount = 6;
