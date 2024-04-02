import { justJotTheme } from "@/theme";

export default function useIconPropsFromTheme() {
    return {
        size: justJotTheme.other.iconSizeThemeMode,
        stroke: justJotTheme.other.iconStrokeWidth,
    };
};