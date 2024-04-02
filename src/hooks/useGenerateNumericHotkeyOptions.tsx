import { HotkeyItem } from "@mantine/hooks";

export default function useGenerateNumericHotkeyOptions(
    {callback}: {callback: (n: number) => void}
): HotkeyItem[] {
    return Array.from(Array(9).keys())
        .map(n => [
            n.toString(),
            () => { callback(n)}
        ])
};