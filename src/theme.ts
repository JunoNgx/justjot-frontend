import {
    createTheme,
    DEFAULT_THEME,
    mergeMantineTheme,
} from '@mantine/core';

import '@mantine/core/styles.css';

const overrideTheme = createTheme({
    colors: {
        black: [
            "#f5f5f5",
            "#e7e7e7",
            "#cdcdcd",
            "#b2b2b2",
            "#9a9a9a",
            "#8b8b8b",
            "#848484",
            "#717171",
            "#656565",
            "#575757"
        ]
    },
    primaryColor: "black",
    fontFamily: "Space Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif, Segoe UI Emoji",
    fontFamilyMonospace: "Space Mono, Menlo, Consolas, monospace",
    defaultRadius: 0,
    other: {
        colText: "#000", // --mantine-colortext; --mantine-color-black
        colTextDark: "#C9C9C9", // --mantine-color-dark-0
        colLogo: "#86EAD4", // Mint
        iconStrokeWidth: 1.5,
        iconSizeMenu: 16,
        iconSizeItem: 24,
        iconSizeHeaderLogo: 32,
        iconSizeHeaderUser: 24,
        iconSizeThemeMode: 18,
    }
});

export const justJotTheme = mergeMantineTheme(DEFAULT_THEME, overrideTheme);