import { CollectionsContext } from '@/contexts/CollectionsContext';
import { ThemeModeContext } from '@/contexts/ThemeModeContext';
import useCollectionNavActions from '@/hooks/useCollectionNavActions';
import useIconProps from '@/hooks/useIconProps';
import { ThemeMode } from '@/types';
import { Spotlight, SpotlightActionData, SpotlightActionGroupData } from '@mantine/spotlight';
import { IconEdit, IconFolder, IconFolderPlus, IconHelp, IconHome2, IconLogin2, IconLogout, IconMoon, IconPassword, IconSettingsCog, IconSortAscendingShapes, IconSun, IconTrash, IconUserCog, IconUserPlus } from '@tabler/icons-react';
import { useContext } from 'react';
import useCollectionDeletion from '@/hooks/useCollectionDeletion';
import useCollectionActions from '@/hooks/useCollectionActions';
import useNavigateRoutes from '@/hooks/useNavigateRoutes';
import { BackendClientContext } from '@/contexts/BackendClientContext';

export default function SpotlightSearch() {

    const { isLoggedIn } = useContext(BackendClientContext);
    const { setThemeMode } = useContext(ThemeModeContext);
    const { collections } = useContext(CollectionsContext);
    const { spotlightIconProps } = useIconProps();
    const { trySwitchToCollectionById } = useCollectionNavActions();
    const confirmCollectionDeletion = useCollectionDeletion();
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
        navigateToHome,
        navigateToLogin,
        navigateToRegister,
    } = useNavigateRoutes();

    const miscActionGroup: SpotlightActionGroupData = {
        group: "Miscellaneous",
        actions: [
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
                id: "theme-mode-dark",
                label: "Theme mode: Dark",
                description: ".theme-dark",
                leftSection: <IconMoon {...spotlightIconProps} />,
                onClick: () => {setThemeMode(ThemeMode.DARK)}
            },
            {
                id: "help",
                label: "Help / User Manual",
                description: "/help",
                leftSection: <IconHelp {...spotlightIconProps} />,
                onClick: navigateToHelp,
            },
        ]
    };

    const miscLoggedInActions = [
        {
            id: "route-profile",
            label: "Account management",
            description: "/account",
            leftSection: <IconUserCog {...spotlightIconProps} />,
            onClick: navigateToProfile,
        },
        {
            id: "route-reset",
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
    ];

    const publicNavigationActionGroup: SpotlightActionGroupData = {
        group: "Navigation",
        actions: [
            {
                id: "home",
                label: "Home page",
                description: "/home",
                leftSection: <IconHome2 {...spotlightIconProps} />,
                onClick: navigateToHome,
            },
            {
                id: "login",
                label: "Login",
                description: "/login",
                leftSection: <IconLogin2 {...spotlightIconProps} />,
                onClick: navigateToLogin,
            },
            {
                id: "register",
                label: "Register",
                description: "/register",
                leftSection: <IconUserPlus {...spotlightIconProps} />,
                onClick: navigateToRegister,
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
                onClick: confirmCollectionDeletion,
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
        
    const allActionList: (SpotlightActionGroupData | SpotlightActionData)[] = [];

    if (isLoggedIn) {
        miscActionGroup.actions.push(...miscLoggedInActions);
        allActionList.push(
            collectionsNavActionGroup,
            collectionOperationActionGroup,
            miscActionGroup,
        );
    } else {
        allActionList.push(
            publicNavigationActionGroup,
            miscActionGroup,
        );
    }

    return <Spotlight
        shortcut={["mod + K", "mod + P"]}
        actions={allActionList}
        nothingFound="No action found."
        highlightQuery
        scrollable
    />
};