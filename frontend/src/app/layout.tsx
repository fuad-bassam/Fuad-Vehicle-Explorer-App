import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppShell } from '@/components/app-shell/app-shell';
import { ThemeHead, ThemeProvider, themeHtmlProps } from '@/theme/theme-provider';

export const metadata: Metadata = {
  title: 'Vehicle Explorer',
  description: 'Pick a car make and model year to see its vehicle types and models.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" {...themeHtmlProps}>
      <head>
        <ThemeHead />
      </head>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
