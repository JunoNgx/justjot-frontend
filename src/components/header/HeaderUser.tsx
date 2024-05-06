import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { IconChevronDown, IconHelp, IconLogout, IconUserCog } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import useNavigateRoutes from "@/hooks/useNavigateRoutes";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import ItemWithIcon from "@/libs/components/ItemWithIcon";

export default function HeaderUser() {

    const { user } = useContext(BackendClientContext);
    const {
        navigateToHelp,
        navigateToProfile,
        logoutAndNavigateToLogin,
    } = useNavigateRoutes();
    const { menuIconProps } = useIconProps();
    
    const username = user?.displayName || user?.username;

    return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <ItemWithIcon className="Header__UserProfileBtn"
                rightSection={<IconChevronDown {...menuIconProps} />}
            >
                <span className="Header__UsernameText">{username}</span>
            </ItemWithIcon>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
            <DropdownMenu.Content className="Header__ProfileDropdown"
                sideOffset={15}
                alignOffset={5}
                align="end"
            >
                <DropdownMenu.Item className="Header__ProfileDropdownItem"
                    onClick={navigateToHelp}
                >
                    <ItemWithIcon
                        leftSection={<IconHelp {...menuIconProps} />}
                    >
                        Help
                    </ItemWithIcon>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="Header__ProfileDropdownSeparator" />

                <DropdownMenu.Item className="Header__ProfileDropdownItem"
                    onClick={navigateToProfile}
                >
                    <ItemWithIcon
                        leftSection={<IconUserCog {...menuIconProps} />}
                    >
                        Account
                    </ItemWithIcon>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="Header__ProfileDropdownItem"
                    onClick={logoutAndNavigateToLogin}
                >
                    <ItemWithIcon
                        leftSection={<IconLogout {...menuIconProps} />}
                    >
                        Logout
                    </ItemWithIcon>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
}