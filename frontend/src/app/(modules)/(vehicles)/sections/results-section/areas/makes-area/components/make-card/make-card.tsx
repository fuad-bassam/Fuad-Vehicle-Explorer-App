import type { IMake } from '@/services/vehicles/models/make';
import { BaseAvatar } from '@/theme/components/base-avatar/base-avatar';
import { BaseCard } from '@/theme/components/base-card/base-card';
import { BaseTypography } from '@/theme/components/base-typography/base-typography';
import { getInitials } from '../../../../../../helpers/initials-helper';
import styles from './make-card.module.scss';

interface IMakeCardProps {
  make: IMake;
}

export function MakeCard({ make }: IMakeCardProps) {
  return (
    <BaseCard variant="subtle">
      <div className={styles.card}>
        <BaseAvatar name={make.name} text={getInitials(make.name)} size="lg" />
        <div className={styles.details}>
          <BaseTypography text={make.name} type="subtitle" />
          <BaseTypography text={`vPIC id ${make.id}`} type="caption" color="muted" />
        </div>
      </div>
    </BaseCard>
  );
}
