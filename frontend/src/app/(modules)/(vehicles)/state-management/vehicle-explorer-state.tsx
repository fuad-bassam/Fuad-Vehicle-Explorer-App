'use client';

import { createContext, useContext, useOptimistic, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { IMake } from '@/services/vehicles/models/make';
import { toQueryString } from '../helpers/search-params-helper';
import type { SortDirection, ViewMode } from '../models/models-view';
import type {
  IVehicleExplorerState,
  IVehicleExplorerStateProviderProps,
  IVehicleSelection
} from '../models/vehicle-explorer-state';
import type { IVehicleFilters } from '../models/vehicle-filters';

const VehicleExplorerStateContext = createContext<IVehicleExplorerState | null>(null);

export function VehicleExplorerStateProvider({ filters, viewMode: initialViewMode, data, children }: IVehicleExplorerStateProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, startTransition] = useTransition();
  const [selection, setSelection] = useOptimistic<IVehicleSelection>({ filters, make: data.make });
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterText, setFilterText] = useState('');

  const updateFilters = (changes: Partial<IVehicleFilters>, make?: IMake | null) => {
    const nextFilters = { ...selection.filters, ...changes };
    setFilterText('');

    startTransition(() => {
      setSelection({ filters: nextFilters, make: make === undefined ? selection.make : make });
      router.push(`${pathname}${toQueryString(nextFilters, viewMode)}`, { scroll: false });
    });
  };

  const changeViewMode = (nextViewMode: ViewMode) => {
    setViewMode(nextViewMode);
    window.history.replaceState(null, '', `${pathname}${toQueryString(selection.filters, nextViewMode)}`);
  };

  const retry = () => startTransition(() => router.refresh());

  const state: IVehicleExplorerState = {
    filters: selection.filters,
    selectedMake: selection.make,
    data,
    isLoading,
    viewMode,
    sortDirection,
    filterText,
    updateFilters,
    changeViewMode,
    changeSortDirection: setSortDirection,
    changeFilterText: setFilterText,
    retry
  };

  return <VehicleExplorerStateContext.Provider value={state}>{children}</VehicleExplorerStateContext.Provider>;
}

export function useVehicleExplorerState() {
  const state = useContext(VehicleExplorerStateContext);

  if (!state) {
    throw new Error('useVehicleExplorerState must be used inside VehicleExplorerStateProvider');
  }

  return state;
}
