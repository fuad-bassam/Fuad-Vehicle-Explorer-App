import { IconLayoutGrid, IconMessageQuestion, IconMoon, IconSun, IconTable } from '@tabler/icons-react';
import styles from './base-icon.module.scss';

const icons = {
  'layout-grid': IconLayoutGrid,
  'message-question': IconMessageQuestion,
  moon: IconMoon,
  sun: IconSun,
  table: IconTable
};

export type BaseIconName = keyof typeof icons;

export interface BaseIconProps {
  name: BaseIconName;
  size?: 'small' | 'medium' | 'large';
}

export function BaseIcon({ name, size = 'medium' }: BaseIconProps) {
  const Icon = icons[name];

  return <Icon className={styles[size]} stroke={1.8} aria-hidden />;
}
