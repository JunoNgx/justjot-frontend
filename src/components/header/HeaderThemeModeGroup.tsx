import { useContext } from "react";

import { ActionIcon, Group } from "@mantine/core";
import { UserLocalSettingsContext } from "@/contexts/UserLocalSettingsContext";
import { ThemeMode } from "@/types";
import { IconMoon, IconSettingsCog, IconSun } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";

export default function HeaderThemeModeGroup() {
    const { themeMode, setThemeMode } = useContext(UserLocalSettingsContext);
    const { themeModeIconProps } = useIconProps();

    const isThemeModeLight = () => themeMode === ThemeMode.LIGHT;
    const isThemeModeDark = () => themeMode === ThemeMode.DARK;
    const isThemeModeAuto = () => themeMode === ThemeMode.AUTO;

    return <Group className="header__theme-mode-container"
        gap="xs"
    >
        <ActionIcon
            className={"header__theme-mode-btn "
                + (isThemeModeAuto() ? "header__theme-mode-btn--is-selected" : null)
            }
            variant={"subtle"}
            radius="xl"
            title="Theme mode: System"
            aria-label="Switch theme mode to follow system setting"
            aria-current={isThemeModeAuto()}
            onClick={() => {setThemeMode(ThemeMode.AUTO)}}
        >
            <IconSettingsCog {...themeModeIconProps} />
        </ActionIcon>
        <ActionIcon
            className={"header__theme-mode-btn "
                + (isThemeModeLight() ? "header__theme-mode-btn--is-selected" : null)
            }
            variant={"subtle"}
            radius="xl"
            title="Theme mode: Light"
            aria-label="Switch theme mode to light mode"
            aria-current={isThemeModeLight()}
            onClick={() => {setThemeMode(ThemeMode.LIGHT)}}
        >
            <IconSun {...themeModeIconProps} />
        </ActionIcon>
        <ActionIcon
            className={"header__theme-mode-btn "
                + (isThemeModeDark() ? "header__theme-mode-btn--is-selected" : null)
            }
            variant={"subtle"}
            radius="xl"
            title="Theme mode: Dark"
            aria-label="Switch theme mode to dark mode"
            aria-current={isThemeModeDark()}
            onClick={() => {setThemeMode(ThemeMode.DARK)}}
        >
            <IconMoon {...themeModeIconProps} />
        </ActionIcon>
    </Group>
}