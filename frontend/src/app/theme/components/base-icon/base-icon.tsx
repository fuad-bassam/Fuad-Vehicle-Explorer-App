import { IconMessageQuestion, IconMoon, IconSun } from '@tabler/icons-react';
import styles from './base-icon.module.scss';

const icons = {
  'message-question': IconMessageQuestion,
  moon: IconMoon,
  sun: IconSun
};

export type BaseIconName = keyof typeof icons;

export interface BaseIconProps {
  name: BaseIconName;
  size?: 'medium' | 'large';
}

export function BaseIcon({ name, size = 'medium' }: BaseIconProps) {
  const Icon = icons[name];

  return <Icon className={styles[size]} stroke={1.8} aria-hidden />;
}
