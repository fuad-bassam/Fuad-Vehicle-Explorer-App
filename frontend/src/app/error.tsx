'use client';

import { BaseAlert } from '@/theme/components/base-alert/base-alert';
import { BaseButton } from '@/theme/components/base-button/base-button';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <BaseAlert type="error" title="Something went wrong" message="The page could not be loaded.">
      <BaseButton label="Try again" onClick={reset} />
    </BaseAlert>
  );
}
