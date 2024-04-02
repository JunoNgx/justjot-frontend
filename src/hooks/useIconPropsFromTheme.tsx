import { justJotTheme } from "@/theme";

export default function useIconPropsFromTheme() {
    return {
        size: justJotTheme.other.iconSizeItem,
        stroke: justJotTheme.other.iconStrokeWidth,
    };
};