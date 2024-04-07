import { CollectionsContext } from '@/contexts/CollectionsContext';
import { ThemeModeContext } from '@/contexts/ThemeModeContext';
import useCollectionNavActions from '@/hooks/useCollectionNavActions';
import useIconProps from '@/hooks/useIconProps';
import { ThemeMode } from '@/types';
import { Spotlight, SpotlightActionData, SpotlightActionGroupData } from '@mantine/spotlight';
import { IconEdit, IconFolder, IconFolderPlus, IconMoon, IconSettingsCog, IconSortAscendingShapes, IconSun, IconTrash } from '@tabler/icons-react';
import { useContext } from 'react';
import useDeleteCollectionConfirmation from '@/hooks/useDeleteCollectionConfirmation';
import useCollectionActions from '@/hooks/useCollectionActions';

export default function SpotlightSearch() {

    const { setThemeMode } = useContext(ThemeModeContext);
    const { collections } = useContext(CollectionsContext);
    const { spotlightIconProps, spotlightIconLargeProps } = useIconProps();
    const { trySwitchToCollectionById } = useCollectionNavActions();
    const confirmDeletion = useDeleteCollectionConfirmation();
    const {
        openCreateCollectionModal,
        openUpdateCollectionModal,
        openSortCollectionModal,
    } = useCollectionActions();

    const themeModeActionGroup: SpotlightActionGroupData = {
        group: "Theme modes",
        actions: [
            {
                id: "theme-mode-system",
                label: "Theme mode: system",
                description: ".theme-system",
                leftSection: <IconSettingsCog {...spotlightIconLargeProps} />,
                onClick: () => {setThemeMode(ThemeMode.AUTO)},
            },
            {
                id: "theme-mode-light",
                label: "Theme mode: light",
                description: ".theme-light",
                leftSection: <IconSun {...spotlightIconLargeProps} />,
                onClick: () => {setThemeMode(ThemeMode.LIGHT)}
            },
            {
                id: "theme-mode-system",
                label: "Theme mode: dark",
                description: ".theme-dark",
                leftSection: <IconMoon {...spotlightIconLargeProps} />,
                onClick: () => {setThemeMode(ThemeMode.DARK)}
            },
        ]
    };

    const collectionOperationActionGroup: SpotlightActionGroupData = {
        group: "Collection actions",
        actions: [
            {
                id: "coll-op-create",
                label: "Create new collection",
                description: ".create-coll",
                leftSection: <IconFolderPlus {...spotlightIconLargeProps} />,
                onClick: openCreateCollectionModal,
            },
            {
                id: "coll-op-edit",
                label: "Edit current collection",
                description: ".edit-coll",
                leftSection: <IconEdit {...spotlightIconLargeProps} />,
                onClick: openUpdateCollectionModal,
            },
            {
                id: "coll-op-sort",
                label: "Sort collections",
                description: ".sort-coll",
                leftSection: <IconSortAscendingShapes {...spotlightIconLargeProps} />,
                onClick: openSortCollectionModal,
            },
            {
                id: "coll-op-delete",
                label: "Delete current collection",
                description: ".delete-coll",
                leftSection: <IconTrash color="red" {...spotlightIconLargeProps} />,
                onClick: confirmDeletion,
            },
        ]
    };

    const buildCollectionNavActions = (): SpotlightActionData[] => {
        return collections.map(collection => ({
            id: `collection-${collection.id}`,
            label: `${collection.name}`,
            description: `/${collection.slug}`,
            leftSection: <IconFolder {...spotlightIconLargeProps} />,
            onClick: () => {trySwitchToCollectionById(collection.id)},
        }));

    }

    const collectionsNavActionGroup: SpotlightActionGroupData = {
        group: "Collections",
        actions: buildCollectionNavActions(),
    };
        
    const allActionList: (SpotlightActionGroupData | SpotlightActionData)[] = [
        collectionOperationActionGroup,
        collectionsNavActionGroup,
        themeModeActionGroup,
    ];

    return <Spotlight
        shortcut={["mod + K", "mod + P"]}
        actions={allActionList}
        nothingFound="No result found."
        highlightQuery
    />
};