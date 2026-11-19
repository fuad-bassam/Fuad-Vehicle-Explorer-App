import '@mantine/core/styles.layer.css';
import './styles/globals.scss';
import type { ReactNode } from 'react';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { mantineTheme } from './mantine-theme';

export const themeHtmlProps = mantineHtmlProps;

export function ThemeHead() {
  return <ColorSchemeScript defaultColorScheme="dark" />;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
}
