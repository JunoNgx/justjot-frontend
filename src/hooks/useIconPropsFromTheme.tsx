import { justJotTheme } from "@/theme";

export default function useIconPropsFromTheme() {

    const itemIcontProps = {
        size: justJotTheme.other.iconSizeItem,
        stroke: justJotTheme.other.iconStrokeWidth,
    }

    return {
        itemIcontProps,
    };
};