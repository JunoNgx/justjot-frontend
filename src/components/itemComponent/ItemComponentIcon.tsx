import { Image } from "@mantine/core";
import { ItemType } from "@/types";
import { IconCheckbox, IconFileText, IconSquare, IconWorld } from "@tabler/icons-react";
import { isValidHexColourCode } from "@/utils/itemUtils";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";

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
    const iconProps = useIconPropsFromTheme();

    if (isValidHexColourCode(hexColourCode) && type !== ItemType.TODO)
        return <div className="item__icon-colour"
            style={{backgroundColor: hexColourCode}}
        />

    switch (type) {
        case ItemType.TODO:
            return isTodoDone
                ? <IconCheckbox {...iconProps} />
                : <IconSquare {...iconProps} />
        case ItemType.LINK:
            return faviconUrl
                ? <Image h={24} src={faviconUrl}/>
                : <IconWorld {...iconProps} />
        case ItemType.TEXT:
        default:
            return <IconFileText {...iconProps} />
    }
};