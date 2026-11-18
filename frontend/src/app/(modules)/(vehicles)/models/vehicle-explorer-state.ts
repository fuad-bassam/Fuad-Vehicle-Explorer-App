import type { ReactNode } from 'react';
import type { IMake } from '@/services/vehicles/models/make';
import type { SortDirection, ViewMode } from './models-view';
import type { IVehicleExplorerData } from './vehicle-explorer-data';
import type { IVehicleFilters } from './vehicle-filters';

export interface IVehicleSelection {
  filters: IVehicleFilters;
  make: IMake | null;
}

export interface IVehicleExplorerState {
  filters: IVehicleFilters;
  selectedMake: IMake | null;
  data: IVehicleExplorerData;
  isLoading: boolean;
  viewMode: ViewMode;
  sortDirection: SortDirection;
  filterText: string;
  modelsPage: number;
  updateFilters: (changes: Partial<IVehicleFilters>, make?: IMake | null) => void;
  changeViewMode: (viewMode: ViewMode) => void;
  changeSortDirection: (sortDirection: SortDirection) => void;
  changeFilterText: (filterText: string) => void;
  changeModelsPage: (page: number) => void;
  retry: () => void;
}

export interface IVehicleExplorerStateProviderProps {
  filters: IVehicleFilters;
  viewMode: ViewMode;
  data: IVehicleExplorerData;
  children: ReactNode;
}
