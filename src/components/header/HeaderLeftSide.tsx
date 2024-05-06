import { ActionIcon, Group } from "@mantine/core";
import { NavLink } from "react-router-dom";
import CollectionMenu from "@/components/CollectionMenu";
import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { JustJotIcon } from "@/components/misc/JustJotIcon";
import useIconProps from "@/hooks/useIconProps";

export default function HeaderLeftSide() {

    const { user } = useContext(BackendClientContext);
    const { logoIconProps } = useIconProps();
    
    return <Group className="header__LeftSide"
        gap="xs"
    >
        <ActionIcon
            variant="transparent"
            component={NavLink}
            to={user ? `/${user.username}` : "/"}
            size="xl"
            aria-label="Link to home page"
        >
            <JustJotIcon className="header__LogoIcon"
                {...logoIconProps}
            />
        </ActionIcon>
        <CollectionMenu/>
    </Group>
}