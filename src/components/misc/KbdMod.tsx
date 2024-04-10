import { Kbd } from "@mantine/core";
import { useOs } from "@mantine/hooks";

export default function KbdMod() {
    const os = useOs();

    switch(true) {
    case (os === "macos"):
    case (os === "ios"):
        return <Kbd>Cmd</Kbd>;
    default:
        return <Kbd>Ctrl</Kbd>;
    }
};