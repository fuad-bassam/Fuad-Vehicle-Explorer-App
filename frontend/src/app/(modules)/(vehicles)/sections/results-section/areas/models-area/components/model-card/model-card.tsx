import type { IVehicleModel } from '@/services/vehicles/models/vehicle-model';
import { BaseAvatar } from '@/theme/components/base-avatar/base-avatar';
import { BaseCard } from '@/theme/components/base-card/base-card';
import { BaseTypography } from '@/theme/components/base-typography/base-typography';
import { getInitials } from '../../../../../../helpers/initials-helper';
import styles from './model-card.module.scss';

interface IModelCardProps {
  model: IVehicleModel;
  makeName: string;
  year: number | null;
  vehicleType: string | null;
}

export function ModelCard({ model, makeName, year, vehicleType }: IModelCardProps) {
  return (
    <BaseCard variant="subtle">
      <div className={styles.card}>
        <BaseAvatar name={model.name} text={getInitials(model.name)} size="lg" />
        <div className={styles.details}>
          <BaseTypography text={model.name} type="subtitle" />
          <BaseTypography text={year ? `${makeName} · ${year}` : makeName} color="muted" />
          {vehicleType && <BaseTypography text={vehicleType} type="caption" />}
          <BaseTypography text={`vPIC id ${model.id}`} type="caption" color="muted" />
        </div>
      </div>
    </BaseCard>
  );
}
