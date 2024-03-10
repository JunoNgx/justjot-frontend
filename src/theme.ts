import {
    createTheme,
    DEFAULT_THEME,
    mergeMantineTheme,
} from '@mantine/core';

import '@mantine/core/styles.css';

const overrideTheme = createTheme({
    primaryColor: "teal",
    fontFamily: "IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif, Segoe UI Emoji", 
    fontFamilyMonospace: "Cousine, Menlo, Consolas, monospace",
    defaultRadius: 0,
});

export const justJotTheme = mergeMantineTheme(DEFAULT_THEME, overrideTheme);