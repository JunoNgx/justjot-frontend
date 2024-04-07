import { useContext } from "react";

import { ActionIcon, Group } from "@mantine/core";
import { ThemeModeContext } from "@/contexts/ThemeModeContext";
import { ThemeMode } from "@/types";
import { IconMoon, IconSettingsCog, IconSun } from "@tabler/icons-react";
import { justJotTheme } from "@/theme";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";

export default function HeaderThemeModeGroup() {
    const { themeMode, setThemeMode } = useContext(ThemeModeContext);
    const { themeModeIconProps } = useIconPropsFromTheme();

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
            onClick={() => {setThemeMode(ThemeMode.DARK)}}
        >
            <IconMoon {...themeModeIconProps} size={justJotTheme.other.iconSizeThemeMode}
            />
        </ActionIcon>
    </Group>
}