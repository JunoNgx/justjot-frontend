import {
    Anchor,
    Button,
    createTheme,
    CSSVariablesResolver,
    DEFAULT_THEME,
    mergeMantineTheme,
} from '@mantine/core';

import '@mantine/core/styles.css';
import classes from "./theme.module.scss";

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
        colBlack: "#000000",
        colWhite: "#FFFFFF",
        iconStrokeWidth: 1,
        iconSizeMenu: 16,
        iconSizeItem: 24,
        // iconSizeHeaderLogo: 24,
        iconSizeHeaderUser: 24,
        iconSizeThemeMode: 18,
    },
    components: {
        Anchor: Anchor.extend({
            defaultProps: {
                underline: "always",
            },
        }),
        Button: Button.extend({
            classNames: classes,
            defaultProps: {
                variant: "mono",
            }
        }),
    }
});

export const justJotCssVarsResolver: CSSVariablesResolver = (theme) => ({
    variables: {
        // None for now
    },
    light: {
        "--mantine-color-body": theme.other.colWhite,
        "--app-shell-border-color": theme.other.colBlack,
        "--mantine-color-text": theme.other.colBlack,
        "--mantine-color-dimmed": "#777",
        "--mantine-color-anchor": "#444",
        "--mantine-color-default-color": theme.other.colBlack,
        "--justjot-col-pri": theme.other.colBlack,
        "--justjot-col-bg": theme.other.colWhite,
    },
    dark: {
        "--mantine-color-body": theme.other.colBlack,
        "--app-shell-border-color": theme.other.colWhite,
        "--mantine-color-text": theme.other.colWhite,
        "--mantine-color-dimmed": "#999",
        "--mantine-color-anchor": "#AAA",
        "--mantine-color-default-color": theme.other.colWhite,
        "--justjot-col-pri": theme.other.colWhite,
        "--justjot-col-bg": theme.other.colBlack,
    }
});

export const justJotTheme = mergeMantineTheme(DEFAULT_THEME, overrideTheme);