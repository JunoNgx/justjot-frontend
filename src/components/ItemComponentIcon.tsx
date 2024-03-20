import { Image } from "@mantine/core";
import { ItemType } from "../types";
import { IconNote, IconNotes, IconWorld } from "@tabler/icons-react";
import { justJotTheme } from "../theme";
// import { isValidUrl } from "../utils/misc";

export default function ItemComponentIcon(
    {type, faviconUrl, shouldCopyOnClick}:
    {type: ItemType, faviconUrl: string, shouldCopyOnClick: boolean}
) {
    switch (type) {
        case ItemType.LINK:
            // validating data should not be done on the frontend
            // return faviconUrl && isValidUrl(faviconUrl)
            //     ? <Image h={24} src={faviconUrl}/>
            //     : <IconWorld
            //         size={justJotTheme.other.iconSizeItem}
            //         stroke={justJotTheme.other.iconStrokeWidth}
            //     />
            return faviconUrl
                ? <Image h={24} src={faviconUrl}/>
                : <IconWorld
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
        case ItemType.TEXT:
        default:
            return shouldCopyOnClick
                ? <IconNote
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
                : <IconNotes
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
    }
};