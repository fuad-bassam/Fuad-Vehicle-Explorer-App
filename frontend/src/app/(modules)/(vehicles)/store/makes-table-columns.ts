import type { IMake } from '@/services/vehicles/models/make';
import type { BaseTableColumn } from '@/theme/components/base-table/base-table';

export const makesTableColumns: BaseTableColumn<IMake>[] = [
  { key: 'name', title: 'Make' },
  { key: 'id', title: 'vPIC id' }
];
