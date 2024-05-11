import {
    Anchor,
    Button,
    createTheme,
    CSSVariablesResolver,
    DEFAULT_THEME,
    mergeMantineTheme,
} from '@mantine/core';

import '@mantine/core/styles.css';
import classes from "@/styles/theme.module.scss";

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
    primaryColor: "gray",
    fontFamily: "Space Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif, Segoe UI Emoji",
    fontFamilyMonospace: "Space Mono, Menlo, Consolas, monospace",
    defaultRadius: 0,
    other: {
        colWhite: "#FFFFFF",
        colBlack: "#000000",
        colLogo: "#86EAD4", // Mint
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
        "--mantine-color-text": theme.other.colBlack,
        "--mantine-color-body": theme.other.colWhite,
        "--mantine-color-dimmed": "#444",
        "--mantine-color-anchor": "#444",
        "--mantine-color-code-bg": "#EEE",
    },
    dark: {
        "--mantine-color-text": theme.other.colWhite,
        "--mantine-color-body": theme.other.colBlack,
        "--mantine-color-dimmed": "#999",
        "--mantine-color-anchor": "#AAA",
        "--mantine-color-code-bg": "#222",
    }
});

export const justJotTheme = mergeMantineTheme(DEFAULT_THEME, overrideTheme);