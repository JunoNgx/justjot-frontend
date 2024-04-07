import { CollectionsContext } from '@/contexts/CollectionsContext';
import { ThemeModeContext } from '@/contexts/ThemeModeContext';
import useCollectionNavActions from '@/hooks/useCollectionNavActions';
import useIconProps from '@/hooks/useIconProps';
import { ThemeMode } from '@/types';
import { Spotlight, SpotlightActionData, SpotlightActionGroupData } from '@mantine/spotlight';
import { IconEdit, IconFolder, IconFolderPlus, IconHelp, IconLogout, IconMoon, IconPassword, IconSettingsCog, IconSortAscendingShapes, IconSun, IconTrash, IconUserCog } from '@tabler/icons-react';
import { useContext } from 'react';
import useDeleteCollectionConfirmation from '@/hooks/useDeleteCollectionConfirmation';
import useCollectionActions from '@/hooks/useCollectionActions';
import useNavigateRoutes from '@/hooks/useNavigateRoutes';

export default function SpotlightSearch() {

    const { setThemeMode } = useContext(ThemeModeContext);
    const { collections } = useContext(CollectionsContext);
    const { spotlightIconProps } = useIconProps();
    const { trySwitchToCollectionById } = useCollectionNavActions();
    const confirmDeletion = useDeleteCollectionConfirmation();
    const {
        openCreateCollectionModal,
        openUpdateCollectionModal,
        openSortCollectionModal, 
    } = useCollectionActions();
    const {
        navigateToHelp,
        navigateToProfile,
        navigateToReset,
        logoutAndNavigateToLogin,
    } = useNavigateRoutes();

    const miscActionGroup: SpotlightActionGroupData = {
        group: "Miscellaneous",
        actions: [
            {
                id: "help",
                label: "Help / User Manual",
                description: "/help",
                leftSection: <IconHelp {...spotlightIconProps} />,
                onClick: navigateToHelp,
            },
            {
                id: "profile",
                label: "Account management",
                description: "/account",
                leftSection: <IconUserCog {...spotlightIconProps} />,
                onClick: navigateToProfile,
            },
            {
                id: "change-password",
                label: "Change password",
                description: "/reset",
                leftSection: <IconPassword {...spotlightIconProps} />,
                onClick: navigateToReset,
            },
            {
                id: "logout",
                label: "Logout",
                description: ".logout",
                leftSection: <IconLogout {...spotlightIconProps} />,
                onClick: logoutAndNavigateToLogin,
            },
            {
                id: "theme-mode-system",
                label: "Theme mode: System",
                description: ".theme-system",
                leftSection: <IconSettingsCog {...spotlightIconProps} />,
                onClick: () => {setThemeMode(ThemeMode.AUTO)},
            },
            {
                id: "theme-mode-light",
                label: "Theme mode: Light",
                description: ".theme-light",
                leftSection: <IconSun {...spotlightIconProps} />,
                onClick: () => {setThemeMode(ThemeMode.LIGHT)}
            },
            {
                id: "theme-mode-system",
                label: "Theme mode: Dark",
                description: ".theme-dark",
                leftSection: <IconMoon {...spotlightIconProps} />,
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
                leftSection: <IconFolderPlus {...spotlightIconProps} />,
                onClick: openCreateCollectionModal,
            },
            {
                id: "coll-op-edit",
                label: "Edit current collection",
                description: ".edit-coll",
                leftSection: <IconEdit {...spotlightIconProps} />,
                onClick: openUpdateCollectionModal,
            },
            {
                id: "coll-op-sort",
                label: "Sort collections",
                description: ".sort-coll",
                leftSection: <IconSortAscendingShapes {...spotlightIconProps} />,
                onClick: openSortCollectionModal,
            },
            {
                id: "coll-op-delete",
                label: "Delete current collection",
                description: ".delete-coll",
                leftSection: <IconTrash color="red" {...spotlightIconProps} />,
                onClick: confirmDeletion,
            },
        ]
    };

    const buildCollectionNavActions = (): SpotlightActionData[] => {
        return collections.map(collection => ({
            id: `collection-${collection.id}`,
            label: `${collection.name}`,
            description: `/${collection.slug}`,
            leftSection: <IconFolder {...spotlightIconProps} />,
            onClick: () => {trySwitchToCollectionById(collection.id)},
        }));

    }

    const collectionsNavActionGroup: SpotlightActionGroupData = {
        group: "Collections",
        actions: buildCollectionNavActions(),
    };
        
    const allActionList: (SpotlightActionGroupData | SpotlightActionData)[] = [
        collectionsNavActionGroup,
        collectionOperationActionGroup,
        miscActionGroup,
    ];

    return <Spotlight
        shortcut={["mod + K", "mod + P"]}
        actions={allActionList}
        nothingFound="No action found."
        highlightQuery
        scrollable
    />
};