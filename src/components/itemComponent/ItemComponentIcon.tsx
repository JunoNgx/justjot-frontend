import { Image } from "@mantine/core";
import { ItemType } from "@/types";
import { IconCheckbox, IconNote, IconNotes, IconSquare, IconWorld } from "@tabler/icons-react";
import { justJotTheme } from "@/theme";
import { isValidHexColourCode } from "@/utils/itemUtils";
// import { isValidUrl } from "../utils/misc";

type ItemComponentIconParams = {
    type: ItemType,
    faviconUrl: string,
    shouldCopyOnClick: boolean,
    isTodoDone: boolean,
    firstSevenChars: string
}

export default function ItemComponentIcon(
    {type, faviconUrl, shouldCopyOnClick, isTodoDone, firstSevenChars}:
    ItemComponentIconParams
) {
    if (isValidHexColourCode(firstSevenChars))
        return <div className="item__icon-colour"
            style={{backgroundColor: firstSevenChars}}
        />

    switch (type) {
        case ItemType.TODO:
            return isTodoDone
                ? <IconCheckbox
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
                : <IconSquare
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
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