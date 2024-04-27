import { Kbd } from "@mantine/core";
import { useOs } from "@mantine/hooks";

export default function KbdAlt() {
    const os = useOs();

    switch(true) {
    case (os === "macos"):
    case (os === "ios"):
        return <Kbd>Opt</Kbd>;
    default:
        return <Kbd>Alt</Kbd>;
    }
}