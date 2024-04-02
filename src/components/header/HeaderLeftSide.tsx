import { ActionIcon, Group, useComputedColorScheme } from "@mantine/core";
import { justJotTheme } from "@/theme";
import { NavLink } from "react-router-dom";
import CollectionMenu from "@/components/CollectionMenu";
import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { JustJotIcon } from "@/components/misc/JustJotIcon";
import { ComputedThemeMode } from "@/types";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";

export default function HeaderLeftSide() {

    const { user } = useContext(BackendClientContext);
    const computedThemeMode = useComputedColorScheme(ComputedThemeMode.LIGHT);
    const themeModeBtnColour = computedThemeMode === ComputedThemeMode.LIGHT
        ? justJotTheme.other.colText
        : justJotTheme.other.colTextDark;
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
            <JustJotIcon {...iconProps} color={themeModeBtnColour} />
        </ActionIcon>
        <CollectionMenu/>
    </Group>
}