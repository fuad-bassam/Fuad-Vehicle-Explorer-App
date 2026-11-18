import type { IPagedList } from '@/services/core/models/paged-list';
import type { IMake } from '@/services/vehicles/models/make';
import type { IVehicleModel } from '@/services/vehicles/models/vehicle-model';
import type { IVehicleType } from '@/services/vehicles/models/vehicle-type';

export interface IVehicleExplorerError {
  message: string;
  type: 'warning' | 'error';
}

export interface IVehicleExplorerData {
  make: IMake | null;
  vehicleTypes: IVehicleType[];
  models: IVehicleModel[];
  makesPage: IPagedList<IMake> | null;
  error: IVehicleExplorerError | null;
}
