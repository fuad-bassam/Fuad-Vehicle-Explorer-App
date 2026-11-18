import { createTheme, type MantineColorsTuple } from '@mantine/core';

const primary: MantineColorsTuple = [
  '#eaf1ff',
  '#d6e3ff',
  '#bdd2ff',
  '#8fb2ff',
  '#6293ff',
  '#3474ff',
  '#205cdf',
  '#0047ba',
  '#03339b',
  '#011e66'
];

const neutralDark: MantineColorsTuple = [
  '#c3c8d5',
  '#a5aec1',
  '#8894ac',
  '#667593',
  '#494e59',
  '#373c47',
  '#2c2e32',
  '#252628',
  '#1b1c1e',
  '#101112'
];

export const mantineTheme = createTheme({
  primaryColor: 'primary',
  primaryShade: { light: 6, dark: 6 },
  colors: { primary, dark: neutralDark },
  defaultRadius: 'md',
  cursorType: 'pointer',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
});
