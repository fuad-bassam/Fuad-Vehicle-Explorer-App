import type { ViewMode } from '../models/models-view';
import type { SearchParams } from '../models/search-params';
import type { IVehicleFilters } from '../models/vehicle-filters';

const firstValue = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

const toPositiveNumber = (value: string | undefined) => {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : null;
};

export const parseVehicleFilters = (params: SearchParams): IVehicleFilters => {
  const makeId = toPositiveNumber(firstValue(params.makeId));
  const vehicleType = firstValue(params.type)?.trim();

  return {
    makeId,
    year: makeId ? toPositiveNumber(firstValue(params.year)) : null,
    vehicleType: makeId && vehicleType ? vehicleType : null,
    page: makeId ? 1 : (toPositiveNumber(firstValue(params.page)) ?? 1)
  };
};

export const parseViewMode = (params: SearchParams): ViewMode => (firstValue(params.view) === 'grid' ? 'grid' : 'table');

export const toQueryString = (filters: IVehicleFilters, viewMode: ViewMode) => {
  const params = new URLSearchParams();

  if (filters.makeId) {
    params.set('makeId', String(filters.makeId));
  }

  if (filters.year) {
    params.set('year', String(filters.year));
  }

  if (filters.vehicleType) {
    params.set('type', filters.vehicleType);
  }

  if (!filters.makeId && filters.page > 1) {
    params.set('page', String(filters.page));
  }

  if (viewMode === 'grid') {
    params.set('view', 'grid');
  }

  const query = params.toString();
  return query ? `?${query}` : '';
};
