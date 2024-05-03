import { CollectionsContext } from '@/contexts/CollectionsContext';
import { UserLocalSettingsContext } from '@/contexts/UserLocalSettingsContext';
import useCollectionNavActions from '@/hooks/useCollectionNavActions';
import useIconProps from '@/hooks/useIconProps';
import { ThemeMode } from '@/types';
import { Spotlight, SpotlightActionData, SpotlightActionGroupData } from '@mantine/spotlight';
import { IconEdit, IconExclamationCircle, IconHelp, IconHome2, IconLogin2, IconLogout, IconMailCheck, IconMoon, IconPassword, IconSettingsCog, IconSortAscendingShapes, IconStack2, IconStackPush, IconSun, IconTestPipe, IconTrash, IconTrashX, IconUserCog, IconUserPlus } from '@tabler/icons-react';
import { useContext } from 'react';
import useCollectionDeletion from '@/hooks/useCollectionDeletion';
import useCollectionActions from '@/hooks/useCollectionActions';
import useNavigateRoutes from '@/hooks/useNavigateRoutes';
import { BackendClientContext } from '@/contexts/BackendClientContext';

export default function SpotlightSearch() {

    const { isLoggedIn } = useContext(BackendClientContext);
    const { setThemeMode } = useContext(UserLocalSettingsContext);
    const { collections, isTrashCollection } = useContext(CollectionsContext);
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
        navigateToTerms,
        navigateToProfile,
        navigateToReset,
        logoutAndNavigateToLogin,
        navigateToHome,
        navigateToLogin,
        navigateToRegister,
        navigateToVerify,
        navigateToDemoLogin,
    } = useNavigateRoutes();

    const miscActionGroup: SpotlightActionGroupData = {
        group: "Miscellaneous",
        actions: [
            {
                id: "help",
                label: "Help (User Manual)",
                description: "/help-man",
                leftSection: <IconHelp {...spotlightIconProps} />,
                onClick: navigateToHelp,
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
                id: "theme-mode-dark",
                label: "Theme mode: Dark",
                description: ".theme-dark",
                leftSection: <IconMoon {...spotlightIconProps} />,
                onClick: () => {setThemeMode(ThemeMode.DARK)}
            },
            {
                id: "terms",
                label: "Terms and Conditions",
                description: "/terms-and-conditions",
                leftSection: <IconExclamationCircle {...spotlightIconProps} />,
                onClick: navigateToTerms,
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
            description: "/reset-password",
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
            {
                id: "route-reset",
                label: "Reset password",
                description: "/reset-password",
                leftSection: <IconPassword {...spotlightIconProps} />,
                onClick: navigateToReset,
            },
            {
                id: "demo-login",
                label: "Demo login",
                description: "/demo-login",
                leftSection: <IconTestPipe {...spotlightIconProps} />,
                onClick: navigateToDemoLogin,
            },
            {
                id: "verify",
                label: "Request email verification",
                description: "/verify-email",
                leftSection: <IconMailCheck {...spotlightIconProps} />,
                onClick: navigateToVerify,
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
                leftSection: <IconStackPush {...spotlightIconProps} />,
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
        ]
    };
    if (!isTrashCollection) {
        collectionOperationActionGroup.actions.push({
            id: "coll-op-delete",
            label: "Delete current collection",
            description: ".delete-coll",
            leftSection: <IconTrashX color="red" {...spotlightIconProps} />,
            onClick: confirmCollectionDeletion,
        });
    }

    const buildCollectionNavActions = (): SpotlightActionData[] => {
        return collections.map(collection => ({
            id: `collection-${collection.id}`,
            label: `${collection.name}`,
            description: `/${collection.slug}`,
            leftSection: collection.isTrashBin
                ? <IconTrash color="purple" {...spotlightIconProps} />
                : <IconStack2 {...spotlightIconProps} />
            ,
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
        /**
         * Disable component-scope hotkey, to allow App to handle this and
         * not ignore `<input>` and `<textarea>`.
         */
        shortcut={[]}
        actions={allActionList}
        nothingFound="No action found."
        highlightQuery
        scrollable
    />
}