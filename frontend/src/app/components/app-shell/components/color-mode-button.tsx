'use client';

import { BaseIconButton } from '@/theme/components/base-icon-button/base-icon-button';
import { useColorMode } from '@/theme/hooks/use-color-mode';

export function ColorModeButton() {
  const { isDark, setDark } = useColorMode();

  return (
    <BaseIconButton
      icon={isDark ? 'sun' : 'moon'}
      label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setDark(!isDark)}
    />
  );
}
