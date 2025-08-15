import { useOs } from "@mantine/hooks";

export default function KbdAlt() {
    const os = useOs();

    switch (true) {
        case os === "macos":
        case os === "ios":
            return <kbd>Opt</kbd>;
        default:
            return <kbd>Alt</kbd>;
    }
}
