import type { IVehicleModel } from '@/services/vehicles/models/vehicle-model';
import type { SortDirection } from '../../../../../models/models-view';

export const filterAndSortModels = (
  models: IVehicleModel[],
  filterText: string,
  sortDirection: SortDirection
): IVehicleModel[] => {
  const keyword = filterText.trim().toLowerCase();
  const matches = keyword ? models.filter(model => model.name.toLowerCase().includes(keyword)) : models;
  const sorted = [...matches].sort((first, second) => first.name.localeCompare(second.name, undefined, { sensitivity: 'base' }));

  return sortDirection === 'asc' ? sorted : sorted.reverse();
};
