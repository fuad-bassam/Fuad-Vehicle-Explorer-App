'use client';

import { BaseChipGroup } from '@/theme/components/base-chip-group/base-chip-group';
import { BaseTypography } from '@/theme/components/base-typography/base-typography';
import { useVehicleExplorerState } from '../../../../state-management/vehicle-explorer-state';
import { allVehicleTypes } from '../../../../store/vehicle-type-options';
import { toVehicleTypeOptions } from './helpers/vehicle-type-options-helper';
import styles from './types-area.module.scss';

export function TypesArea() {
  const { filters, selectedMake, data, isLoading, updateFilters } = useVehicleExplorerState();

  if (!filters.makeId || !selectedMake) {
    return null;
  }

  const isLoadingMake = isLoading && data.make?.id !== filters.makeId;
  const hasNoTypes = !isLoadingMake && data.vehicleTypes.length === 0;

  return (
    <div className={styles.area} data-tour="types">
      <BaseTypography text={`Vehicle types for ${selectedMake.name}`} type="subtitle" />
      {hasNoTypes ? (
        <BaseTypography text="vPIC lists no vehicle types for this make." color="muted" />
      ) : (
        <BaseChipGroup
          options={toVehicleTypeOptions(data.vehicleTypes)}
          value={filters.vehicleType ?? allVehicleTypes}
          onChange={value => updateFilters({ vehicleType: value === allVehicleTypes ? null : value })}
          isLoading={isLoadingMake}
        />
      )}
    </div>
  );
}
