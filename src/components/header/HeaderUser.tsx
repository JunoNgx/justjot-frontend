import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { IconChevronDown, IconHelp, IconLogout, IconUserCog } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import useNavigateRoutes from "@/hooks/useNavigateRoutes";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function HeaderUser() {

    const { user } = useContext(BackendClientContext);
    const {
        navigateToHelp,
        navigateToProfile,
        logoutAndNavigateToLogin,
    } = useNavigateRoutes();
    const { menuIconProps } = useIconProps();
    
    const username = user?.displayName || user?.username;

    return <DropdownMenu.Root
        // position="bottom-end"
        // offset={15}
    >
        <DropdownMenu.Trigger>
            <button className="header__userProfileBtn">
                {/* <Group gap={6}> */}
                    <p className="header__username">{username}</p>
                    <IconChevronDown {...menuIconProps} />
                {/* </Group> */}
            </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
            <DropdownMenu.Content className="header__profileDropdown">
                <DropdownMenu.Item
                    // leftSection={<IconHelp {...menuIconProps} />}
                    onClick={navigateToHelp}
                >
                    Help
                </DropdownMenu.Item>

                <DropdownMenu.Separator/>

                <DropdownMenu.Item
                    // leftSection={<IconUserCog {...menuIconProps} />}
                    onClick={navigateToProfile}
                >
                    Account
                </DropdownMenu.Item>
                <DropdownMenu.Item
                    // leftSection={<IconLogout {...menuIconProps} />}
                    onClick={logoutAndNavigateToLogin}
                >
                    Logout
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
}