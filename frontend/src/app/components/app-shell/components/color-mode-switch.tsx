'use client';

import { BaseSwitch } from '@/theme/components/base-switch/base-switch';
import { useColorMode } from '@/theme/hooks/use-color-mode';

export function ColorModeSwitch() {
  const { isDark, setDark } = useColorMode();

  return <BaseSwitch label="Dark mode" checked={isDark} onChange={setDark} />;
}
