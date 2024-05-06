import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { IconChevronDown, IconHelp, IconLogout, IconUserCog } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import useNavigateRoutes from "@/hooks/useNavigateRoutes";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Button from "@/libs/components/Button";

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
            <Button className="Header__UserProfileBtn"
                rightSection={<IconChevronDown {...menuIconProps} />}
            >
                <span className="Header__UsernameText">{username}</span>
            </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
            <DropdownMenu.Content className="Header__ProfileDropdown"
                sideOffset={15}
                alignOffset={18}
                align="end"
            >

                <DropdownMenu.Item asChild>
                    <Button className="Header__ProfileDropdownItem"
                        onClick={navigateToHelp}
                        leftSection={<IconHelp {...menuIconProps} />}
                    >
                        Help
                    </Button>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="Header__ProfileDropdownSeparator" />

                <DropdownMenu.Item asChild>
                    <Button className="Header__ProfileDropdownItem"
                        onClick={navigateToProfile}
                        leftSection={<IconUserCog {...menuIconProps} />}
                    >
                        Account
                    </Button>
                </DropdownMenu.Item>

                <DropdownMenu.Item>
                    <Button className="Header__ProfileDropdownItem"
                        onClick={logoutAndNavigateToLogin}
                        leftSection={<IconLogout {...menuIconProps} />}
                    >
                        Logout
                    </Button>
                </DropdownMenu.Item>

            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
}