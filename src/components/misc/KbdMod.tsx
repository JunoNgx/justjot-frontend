import { useOs } from "@mantine/hooks";

export default function KbdMod() {
    const os = useOs();

    switch (true) {
        case os === "macos":
        case os === "ios":
            return <kbd>Cmd</kbd>;
        default:
            return <kbd>Ctrl</kbd>;
    }
}
