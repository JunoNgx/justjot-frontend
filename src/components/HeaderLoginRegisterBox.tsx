import { Anchor, Group, Text } from "@mantine/core";
import { NavLink } from "react-router-dom";

export default function HeaderLoginRegisterBox() {
    return <Group>
        <Anchor component={NavLink} to="login">Login</Anchor>
        <Text>/</Text>
        <Anchor component={NavLink} to="register">Register</Anchor>
    </Group>
}
