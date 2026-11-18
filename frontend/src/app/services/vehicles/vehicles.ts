import { apiGet } from '../core/api-service';
import type { IPagedList } from '../core/models/paged-list';
import type { IMake } from './models/make';
import type { IVehicleModel } from './models/vehicle-model';
import type { IVehicleType } from './models/vehicle-type';

export const searchMakes = (keyword: string) => apiGet<IMake[]>('api/makes', { keyword });

export const getMakesPage = (page: number, pageSize: number) => apiGet<IPagedList<IMake>>('api/makes/all', { page, pageSize });

export const getMake = (makeId: number) => apiGet<IMake>(`api/makes/${makeId}`);

export const getVehicleTypes = (makeId: number) => apiGet<IVehicleType[]>(`api/makes/${makeId}/vehicle-types`);

export const getModels = (makeId: number, year: number, vehicleType: string | null) =>
  apiGet<IVehicleModel[]>(`api/makes/${makeId}/models`, { year, vehicleType });
