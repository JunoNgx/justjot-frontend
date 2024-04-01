import { Image } from "@mantine/core";
import { ItemType } from "@/types";
import { IconCheckbox, IconFileText, IconSquare, IconWorld } from "@tabler/icons-react";
import { justJotTheme } from "@/theme";
import { isValidHexColourCode } from "@/utils/itemUtils";

type ItemComponentIconParams = {
    type: ItemType,
    faviconUrl: string,
    isTodoDone: boolean,
    hexColourCode: string
}

export default function ItemComponentIcon(
    {type, faviconUrl, isTodoDone, hexColourCode}:
    ItemComponentIconParams
) {
    if (isValidHexColourCode(hexColourCode) && type !== ItemType.TODO)
        return <div className="item__icon-colour"
            style={{backgroundColor: hexColourCode}}
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
            return faviconUrl
                ? <Image h={24} src={faviconUrl}/>
                : <IconWorld
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
        case ItemType.TEXT:
        default:
            return <IconFileText
                size={justJotTheme.other.iconSizeItem}
                stroke={justJotTheme.other.iconStrokeWidth}
            />
    }
};