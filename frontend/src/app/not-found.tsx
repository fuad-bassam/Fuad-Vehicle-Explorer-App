import { BaseCard } from '@/theme/components/base-card/base-card';
import { BaseEmptyState } from '@/theme/components/base-empty-state/base-empty-state';

export default function NotFound() {
  return (
    <BaseCard>
      <BaseEmptyState title="Page not found" description="The page you are looking for does not exist." />
    </BaseCard>
  );
}
