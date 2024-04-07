import { ThemeModeContext } from '@/contexts/ThemeModeContext';
import useIconPropsFromTheme from '@/hooks/useIconPropsFromTheme';
import { ThemeMode } from '@/types';
import { Spotlight, SpotlightActionData, SpotlightActionGroupData } from '@mantine/spotlight';
import { IconMoon, IconSettingsCog, IconSun } from '@tabler/icons-react';
import { useContext } from 'react';

export default function SpotlightSearch() {
    const { setThemeMode } = useContext(ThemeModeContext);
    const iconProps = useIconPropsFromTheme();

    const themeModeActionGroup: SpotlightActionGroupData = {
        group: "Theme modes",
        actions: [
            {
                id: "theme-mode-system",
                label: "Theme mode: system",
                leftSection: <IconSettingsCog {...iconProps} />,
                onClick: () => {setThemeMode(ThemeMode.AUTO)},
            },
            {
                id: "theme-mode-light",
                label: "Theme mode: light",
                leftSection: <IconSun {...iconProps} />,
                onClick: () => {setThemeMode(ThemeMode.LIGHT)}
            },
            {
                id: "theme-mode-system",
                label: "Theme mode: dark",
                leftSection: <IconMoon {...iconProps} />,
                onClick: () => {setThemeMode(ThemeMode.DARK)}
            },
        ]
    };
        
    const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
        themeModeActionGroup
    ];

    return <Spotlight
        shortcut={["mod + K", "mod + P"]}
        actions={actions}
        nothingFound="No result found."
        highlightQuery
    />
};