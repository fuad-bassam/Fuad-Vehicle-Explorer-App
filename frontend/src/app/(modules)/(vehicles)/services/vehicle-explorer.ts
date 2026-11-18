import type { IApiResponse } from '@/services/core/models/service-operation-result';
import { getMake, getModels, getVehicleTypes } from '@/services/vehicles/vehicles';
import type { IVehicleExplorerData, IVehicleExplorerError } from '../models/vehicle-explorer-data';
import type { IVehicleFilters } from '../models/vehicle-filters';
import { emptyExplorerData } from '../store/empty-explorer-data';

const toError = (response: IApiResponse<unknown>): IVehicleExplorerError => ({
  message: response.errors.join(' '),
  type: response.status === 400 || response.status === 404 ? 'warning' : 'error'
});

export async function loadVehicleExplorer(filters: IVehicleFilters): Promise<IVehicleExplorerData> {
  if (!filters.makeId) {
    return emptyExplorerData;
  }

  const [make, vehicleTypes, models] = await Promise.all([
    getMake(filters.makeId),
    getVehicleTypes(filters.makeId),
    filters.year ? getModels(filters.makeId, filters.year, filters.vehicleType) : null
  ]);

  const failed = [make, vehicleTypes, models].find(response => response && !response.isSuccessful);

  return {
    make: make.result,
    vehicleTypes: vehicleTypes.result ?? [],
    models: models?.result ?? [],
    error: failed ? toError(failed) : null
  };
}
