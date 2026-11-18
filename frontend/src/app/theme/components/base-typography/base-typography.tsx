import { BaseSkeleton } from '../base-skeleton/base-skeleton';
import styles from './base-typography.module.scss';

export interface BaseTypographyProps {
  text: string;
  type?: 'title' | 'subtitle' | 'body' | 'caption';
  color?: 'default' | 'muted';
  isLoading?: boolean;
}

const tags = {
  title: 'h1',
  subtitle: 'h2',
  body: 'p',
  caption: 'span'
} as const;

const skeletonHeights = {
  title: 26,
  subtitle: 22,
  body: 16,
  caption: 14
};

export function BaseTypography({ text, type = 'body', color = 'default', isLoading }: BaseTypographyProps) {
  if (isLoading) {
    return <BaseSkeleton width="40%" height={skeletonHeights[type]} />;
  }

  const Tag = tags[type];

  return <Tag className={`${styles.text} ${styles[type]} ${styles[color]}`}>{text}</Tag>;
}
