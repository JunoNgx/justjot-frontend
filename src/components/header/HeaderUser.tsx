import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { IconChevronDown, IconHelp, IconLogout, IconUserCog } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import useNavigateRoutes from "@/hooks/useNavigateRoutes";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import LabelWithIcon from "@/libs/components/LabelWithIcon";

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
        <DropdownMenu.Trigger className="Header__ProfileDropdownBtn">
            <span className="Header__ProfileDropdownBtnLabel">
                <span className="Header__UsernameText">{username}</span>
                <IconChevronDown {...menuIconProps} />
            </span>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
            <DropdownMenu.Content className="Header__ProfileDropdown"
                sideOffset={20}
                alignOffset={5}
                align="end"
            >

                <DropdownMenu.Item className="Header__ProfileDropdownItem"
                    onClick={navigateToHelp}
                >
                    <LabelWithIcon 
                        leftSection={<IconHelp {...menuIconProps} />}
                    >
                        Help
                    </LabelWithIcon>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="Header__ProfileDropdownSeparator" />

                <DropdownMenu.Item className="Header__ProfileDropdownItem"
                    onClick={navigateToProfile}
                >
                    <LabelWithIcon 
                        leftSection={<IconUserCog {...menuIconProps} />}
                    >
                        Account
                    </LabelWithIcon>
                </DropdownMenu.Item>

                <DropdownMenu.Item className="Header__ProfileDropdownItem"
                    onClick={logoutAndNavigateToLogin}
                >
                    <LabelWithIcon 
                        leftSection={<IconLogout {...menuIconProps} />}
                    >
                        Logout
                    </LabelWithIcon>
                </DropdownMenu.Item>

            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
}