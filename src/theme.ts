import {
    createTheme,
    DEFAULT_THEME,
    mergeMantineTheme,
} from '@mantine/core';

import '@mantine/core/styles.css';

const overrideTheme = createTheme({
    primaryColor: "teal",
    fontFamily: "Space Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif, Segoe UI Emoji", 
    fontFamilyMonospace: "Cousine, Menlo, Consolas, monospace",
    defaultRadius: 0,
    other: {
        colText: "#000", // --mantine-colortext; --mantine-color-black
        colTextDark: "#C9C9C9" // --mantine-color-dark-0
    }
});

export const justJotTheme = mergeMantineTheme(DEFAULT_THEME, overrideTheme);