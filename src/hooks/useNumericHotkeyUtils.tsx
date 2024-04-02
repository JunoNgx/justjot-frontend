import { HotkeyItem } from "@mantine/hooks";

export default function useNumericHotkeyUtils() {

    const computeIndexFromNumericKey = (inputNumber: number): number => {
        switch (true) {
        case (inputNumber < 0 || inputNumber > 9):
            return -1;
        case (inputNumber === 0):
            return 9;
        default:
            return inputNumber - 1;
        }
    };

    const generateNumericHotkeyOptions = (
        {callback}: {callback: (n: number) => void}
    ): HotkeyItem[] => {
        return Array.from(Array(9).keys())
            .map(n => [
                n.toString(),
                () => { callback(n)}
            ])
    };

    return {
        computeIndexFromNumericKey,
        generateNumericHotkeyOptions,
    };
};



