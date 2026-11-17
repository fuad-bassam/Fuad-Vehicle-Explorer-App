import { BaseCard } from '@/theme/components/base-card/base-card';
import { ModelsArea } from './areas/models-area/models-area';
import { TypesArea } from './areas/types-area/types-area';
import styles from './results-section.module.scss';

export function ResultsSection() {
  return (
    <BaseCard>
      <div className={styles.section}>
        <TypesArea />
        <ModelsArea />
      </div>
    </BaseCard>
  );
}
