import { ActionIcon, Group } from "@mantine/core";
import { NavLink } from "react-router-dom";
import CollectionMenu from "@/components/CollectionMenu";
import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { JustJotIcon } from "@/components/misc/JustJotIcon";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";

export default function HeaderLeftSide() {

    const { user } = useContext(BackendClientContext);
    const iconProps = useIconPropsFromTheme();
    
    return <Group className="header__left-side"
        gap="xs"
    >
        <ActionIcon
            variant="transparent"
            component={NavLink}
            to={user ? `/${user.username}` : "/"}
            size="xl"
        >
            <JustJotIcon className="header__logo"
                {...iconProps}
            />
        </ActionIcon>
        <CollectionMenu/>
    </Group>
}