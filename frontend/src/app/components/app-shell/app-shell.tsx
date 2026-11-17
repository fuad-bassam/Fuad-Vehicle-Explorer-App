import type { ReactNode } from 'react';
import { BaseTypography } from '@/theme/components/base-typography/base-typography';
import { ColorModeSwitch } from './components/color-mode-switch';
import styles from './app-shell.module.scss';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div>
          <BaseTypography text="Vehicle Explorer" type="title" />
          <BaseTypography text="Makes, vehicle types and models from the NHTSA vPIC API" color="muted" />
        </div>
        <ColorModeSwitch />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
