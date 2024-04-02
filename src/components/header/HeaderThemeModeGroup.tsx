import { useContext } from "react";

import { ActionIcon, Group, useComputedColorScheme } from "@mantine/core";
import { ThemeModeContext } from "@/contexts/ThemeModeContext";
import { ThemeMode, ComputedThemeMode } from "@/types";
import { IconMoon, IconSettingsCog, IconSun } from "@tabler/icons-react";
import { justJotTheme } from "@/theme";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";

export default function HeaderThemeModeGroup() {
    const { themeMode, setThemeMode } = useContext(ThemeModeContext);
    const computedThemeMode = useComputedColorScheme(ComputedThemeMode.LIGHT);

    const iconProps = useIconPropsFromTheme();

    const isThemeModeLight = () => themeMode === ThemeMode.LIGHT;
    const isThemeModeDark = () => themeMode === ThemeMode.DARK;
    const isThemeModeAuto = () => themeMode === ThemeMode.AUTO;

    const themeModeBtnColour = computedThemeMode === ComputedThemeMode.LIGHT
        ? justJotTheme.other.colText
        : justJotTheme.other.colTextDark;

    return <Group className="header__theme-mode-container"
        gap="xs"
    >
        <ActionIcon className="header__theme-mode-btn"
            variant={isThemeModeAuto() ? "outline" : "subtle"}
            color={themeModeBtnColour}
            radius="xl"
            onClick={() => {setThemeMode(ThemeMode.AUTO)}}
        >
            <IconSettingsCog {...iconProps} />
        </ActionIcon>
        <ActionIcon className="header__theme-mode-btn"
            variant={isThemeModeLight() ? "outline" : "subtle"}
            color={themeModeBtnColour}
            radius="xl"
            onClick={() => {setThemeMode(ThemeMode.LIGHT)}}
        >
            <IconSun {...iconProps} />
        </ActionIcon>
        <ActionIcon className="header__theme-mode-btn"
            variant={isThemeModeDark() ? "outline" : "subtle"}
            color={themeModeBtnColour}
            radius="xl"
            onClick={() => {setThemeMode(ThemeMode.DARK)}}
        >
            <IconMoon {...iconProps} />
        </ActionIcon>
    </Group>
}