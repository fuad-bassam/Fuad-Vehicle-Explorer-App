import type { IVehicleType } from '@/services/vehicles/models/vehicle-type';
import type { BaseChipOption } from '@/theme/components/base-chip-group/base-chip-group';
import { allVehicleTypes, allVehicleTypesLabel } from '../../../../../store/vehicle-type-options';

export const toVehicleTypeOptions = (vehicleTypes: IVehicleType[]): BaseChipOption[] => [
  { label: allVehicleTypesLabel, value: allVehicleTypes },
  ...vehicleTypes.map(vehicleType => ({ label: vehicleType.name, value: vehicleType.name }))
];
