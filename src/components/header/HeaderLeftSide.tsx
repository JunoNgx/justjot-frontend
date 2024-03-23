import { ActionIcon, Group } from "@mantine/core";
import { IconNotebook } from "@tabler/icons-react";
import { justJotTheme } from "@/theme";
import { NavLink } from "react-router-dom";
import CollectionMenu from "@/components/CollectionMenu";
import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";

export default function HeaderLeftSide() {

    const { isLoggedIn, user } = useContext(BackendClientContext);
    
    return <Group className="header__left-side"
        gap="xs"
    >
        <ActionIcon
            variant="transparent"
            component={NavLink}
            to={user ? `/${user.username}` : "/"}
            size="xl"
        >
            <IconNotebook
                color={justJotTheme.other.colLogo}
                size={justJotTheme.other.iconSizeHeaderLogo}
                stroke={justJotTheme.other.iconStrokeWidth}
            />
        </ActionIcon>
        {isLoggedIn && <CollectionMenu/>}
    </Group>
}