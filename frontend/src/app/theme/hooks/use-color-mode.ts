import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

export function useColorMode() {
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return {
    isDark: colorScheme === 'dark',
    setDark: (isDark: boolean) => setColorScheme(isDark ? 'dark' : 'light')
  };
}
