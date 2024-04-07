import { ThemeModeContext } from '@/contexts/ThemeModeContext';
import useIconProps from '@/hooks/useIconProps';
import { ThemeMode } from '@/types';
import { Spotlight, SpotlightActionData, SpotlightActionGroupData } from '@mantine/spotlight';
import { IconMoon, IconSettingsCog, IconSun } from '@tabler/icons-react';
import { useContext } from 'react';

export default function SpotlightSearch() {
    const { setThemeMode } = useContext(ThemeModeContext);
    const { spotlightIconProps } = useIconProps();

    const themeModeActionGroup: SpotlightActionGroupData = {
        group: "Theme modes",
        actions: [
            {
                id: "theme-mode-system",
                label: "Theme mode: system",
                leftSection: <IconSettingsCog {...spotlightIconProps} />,
                onClick: () => {setThemeMode(ThemeMode.AUTO)},
            },
            {
                id: "theme-mode-light",
                label: "Theme mode: light",
                leftSection: <IconSun {...spotlightIconProps} />,
                onClick: () => {setThemeMode(ThemeMode.LIGHT)}
            },
            {
                id: "theme-mode-system",
                label: "Theme mode: dark",
                leftSection: <IconMoon {...spotlightIconProps} />,
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