import type { ReactNode } from 'react';
import { BaseTypography } from '@/theme/components/base-typography/base-typography';
import { ColorModeButton } from './components/color-mode-button';
import styles from './app-shell.module.scss';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <BaseTypography text="Vehicle Explorer" type="title" />
            <BaseTypography text="Makes, vehicle types and models from the NHTSA vPIC API" color="muted" />
          </div>
          <ColorModeButton />
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
}
