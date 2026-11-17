import { BaseCard } from '@/theme/components/base-card/base-card';
import { BaseEmptyState } from '@/theme/components/base-empty-state/base-empty-state';

export default function HomePage() {
  return (
    <BaseCard>
      <BaseEmptyState title="Pick a make and a model year" description="The search is coming in the next step." />
    </BaseCard>
  );
}
