import { useContext } from "react";
import { UserLocalSettingsContext } from "@/contexts/UserLocalSettingsContext";
import { ThemeMode } from "@/types";
import {
    IconMoon,
    IconMoonFilled,
    IconSettings,
    IconSettingsFilled,
    IconSun,
    IconSunFilled,
} from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import IconButton from "@/libs/components/IconButton";

export default function HeaderThemeModeGroup() {
    const { themeMode, setThemeMode } = useContext(UserLocalSettingsContext);
    const { themeModeIconProps } = useIconProps();

    const isThemeModeLight = () => themeMode === ThemeMode.LIGHT;
    const isThemeModeDark = () => themeMode === ThemeMode.DARK;
    const isThemeModeAuto = () => themeMode === ThemeMode.AUTO;

    return (
        <div className="Header__ThemeModeContainer">
            <IconButton
                className="Header__ThemeModeBtn"
                title="Theme mode: System"
                aria-label="Switch theme mode to follow system setting"
                aria-current={isThemeModeAuto()}
                onClick={() => {
                    setThemeMode(ThemeMode.AUTO);
                }}
            >
                {isThemeModeAuto() ? (
                    <IconSettingsFilled {...themeModeIconProps} />
                ) : (
                    <IconSettings {...themeModeIconProps} />
                )}
            </IconButton>
            <IconButton
                className="Header__ThemeModeBtn"
                title="Theme mode: Light"
                aria-label="Switch theme mode to light mode"
                aria-current={isThemeModeLight()}
                onClick={() => {
                    setThemeMode(ThemeMode.LIGHT);
                }}
            >
                {isThemeModeLight() ? (
                    <IconSunFilled {...themeModeIconProps} />
                ) : (
                    <IconSun {...themeModeIconProps} />
                )}
            </IconButton>
            <IconButton
                className="Header__ThemeModeBtn"
                title="Theme mode: Dark"
                aria-label="Switch theme mode to dark mode"
                aria-current={isThemeModeDark()}
                onClick={() => {
                    setThemeMode(ThemeMode.DARK);
                }}
            >
                {isThemeModeDark() ? (
                    <IconMoonFilled {...themeModeIconProps} />
                ) : (
                    <IconMoon {...themeModeIconProps} />
                )}
            </IconButton>
        </div>
    );
}
