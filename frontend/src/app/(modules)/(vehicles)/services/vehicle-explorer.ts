import type { IApiResponse } from '@/services/core/models/service-operation-result';
import { getMake, getMakesPage, getModels, getVehicleTypes } from '@/services/vehicles/vehicles';
import type { IVehicleExplorerData, IVehicleExplorerError } from '../models/vehicle-explorer-data';
import type { IVehicleFilters } from '../models/vehicle-filters';
import { emptyExplorerData } from '../store/empty-explorer-data';
import { pageSize } from '../store/paging-options';

const toError = (response: IApiResponse<unknown>): IVehicleExplorerError => ({
  message: response.errors.join(' '),
  type: response.status === 400 || response.status === 404 ? 'warning' : 'error'
});

export async function loadVehicleExplorer(filters: IVehicleFilters): Promise<IVehicleExplorerData> {
  if (!filters.makeId) {
    const makesPage = await getMakesPage(filters.page, pageSize);

    return {
      ...emptyExplorerData,
      makesPage: makesPage.result,
      error: makesPage.isSuccessful ? null : toError(makesPage)
    };
  }

  const [make, vehicleTypes, models] = await Promise.all([
    getMake(filters.makeId),
    getVehicleTypes(filters.makeId),
    getModels(filters.makeId, filters.year, filters.vehicleType)
  ]);

  const failed = [make, vehicleTypes, models].find(response => !response.isSuccessful);

  return {
    make: make.result,
    vehicleTypes: vehicleTypes.result ?? [],
    models: models.result ?? [],
    makesPage: null,
    error: failed ? toError(failed) : null
  };
}
