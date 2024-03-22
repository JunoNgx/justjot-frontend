import { useContext } from "react";
import { Box, Group } from "@mantine/core";
import { BackendClientContext } from "src/contexts/BackendClientContext";
import HeaderThemeModeGroup from "./HeaderThemeModeGroup";
import HeaderLoginRegisterBox from "./HeaderLoginRegisterBox";
import HeaderUser from "./HeaderUser";

export default function HeaderLeftSide() {
    const { isLoggedIn } = useContext(BackendClientContext);

    return <Group className="header__right-side"
        gap="md"
        justify="flex-end"
        mr={5}
    >
        <HeaderThemeModeGroup/>
        <Box className="header__user-corner">
            {isLoggedIn
                ? <HeaderUser/>
                : <HeaderLoginRegisterBox/>
            }
        </Box>
    </Group>
}