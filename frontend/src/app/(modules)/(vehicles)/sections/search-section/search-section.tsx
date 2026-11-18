import { BaseCard } from '@/theme/components/base-card/base-card';
import { FilterArea } from './areas/filter-area/filter-area';
import { GuideArea } from './areas/guide-area/guide-area';

export function SearchSection() {
  return (
    <>
      <BaseCard>
        <FilterArea />
      </BaseCard>
      <GuideArea />
    </>
  );
}
