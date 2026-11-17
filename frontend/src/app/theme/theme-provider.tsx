import '@mantine/core/styles.css';
import './styles/globals.scss';
import type { ReactNode } from 'react';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { mantineTheme } from './mantine-theme';

export const themeHtmlProps = mantineHtmlProps;

export function ThemeHead() {
  return <ColorSchemeScript defaultColorScheme="light" />;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}
