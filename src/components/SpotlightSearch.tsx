import { CollectionsContext } from '@/contexts/CollectionsContext';
import { ThemeModeContext } from '@/contexts/ThemeModeContext';
import useCollectionNavActions from '@/hooks/useCollectionNavActions';
import useIconProps from '@/hooks/useIconProps';
import { ThemeMode } from '@/types';
import { Spotlight, SpotlightActionData, SpotlightActionGroupData } from '@mantine/spotlight';
import { IconFolder, IconMoon, IconSettingsCog, IconSun } from '@tabler/icons-react';
import { useContext } from 'react';

export default function SpotlightSearch() {

    const { setThemeMode } = useContext(ThemeModeContext);
    const { collections } = useContext(CollectionsContext);
    const { spotlightIconProps, spotlightIconLargeProps } = useIconProps();
    const { trySwitchToCollectionById } = useCollectionNavActions();

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

    const buildCollectionNavActions = (): SpotlightActionData[] => {
        return collections.map(collection => ({
            id: `collections-${collection.id}`,
            label: `/${collection.slug}`,
            description: `${collection.name}`,
            leftSection: <IconFolder {...spotlightIconLargeProps} />,
            onClick: () => {trySwitchToCollectionById(collection.id)},
        }));

    }

    const collectionsNavActionGroup: SpotlightActionGroupData = {
        group: "Collections",
        actions: buildCollectionNavActions(),
    };
        
    const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
        collectionsNavActionGroup,
        themeModeActionGroup,
    ];

    return <Spotlight
        shortcut={["mod + K", "mod + P"]}
        actions={actions}
        nothingFound="No result found."
        highlightQuery
    />
};