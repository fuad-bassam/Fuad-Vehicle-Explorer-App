import type { IVehicleModel } from '@/services/vehicles/models/vehicle-model';
import type { BaseTableColumn } from '@/theme/components/base-table/base-table';

export const modelsTableColumns: BaseTableColumn<IVehicleModel>[] = [
  { key: 'name', title: 'Model' },
  { key: 'id', title: 'vPIC id' }
];
