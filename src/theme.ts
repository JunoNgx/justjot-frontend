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
        colOffWhite: "#E0E0E0",
        colOffBlack: "#121212",
        colLogo: "#86EAD4", // Mint
        infoModalIconStrokeWidth: 1.5, // Only used by `infoModal`
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
        // Not working, bug in Mantine?
        Modal: {
            defaultProps: {
                closeButtonProps: {
                    strokeWidth: 5,
                }
            }
        },
        Notification: {
            defaultProps: {
                closeButtonProps: {
                    strokeWidth: 5,
                }
            }
        }
    }
});

export const justJotCssVarsResolver: CSSVariablesResolver = (theme) => ({
    variables: {
        "--input-font-family": theme.fontFamilyMonospace,
    },
    light: {
        "--mantine-color-text": theme.other.colOffBlack,
        "--mantine-color-body": theme.other.colOffWhite,
        "--mantine-color-dimmed": "#444",
        "--mantine-color-anchor": "#444",
        "--mantine-color-code-bg": "#EEE",
    },
    dark: {
        "--mantine-color-text": theme.other.colOffWhite,
        "--mantine-color-body": theme.other.colOffBlack,
        "--mantine-color-dimmed": "#999",
        "--mantine-color-anchor": "#AAA",
        "--mantine-color-code-bg": "#222",
    }
});

export const justJotTheme = mergeMantineTheme(DEFAULT_THEME, overrideTheme);