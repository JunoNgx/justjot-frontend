import { Image } from "@mantine/core";
import { ItemType } from "@/types";
import { IconCheckbox, IconFileText, IconHourglassLow, IconSquare, IconWorld } from "@tabler/icons-react";
import { isValidHexColourCode } from "@/utils/itemUtils";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";

type ItemComponentIconParams = {
    type: ItemType,
    faviconUrl: string,
    isTodoDone: boolean,
    isPending: boolean
    hexColourCode: string
}

export default function ItemComponentIcon(
    {type, faviconUrl, isTodoDone, isPending, hexColourCode}:
    ItemComponentIconParams
) {
    const { itemIcontProps } = useIconPropsFromTheme();

    if (isPending)
        return <IconHourglassLow {...itemIcontProps} />

    if (isValidHexColourCode(hexColourCode) && type !== ItemType.TODO)
        return <div className="item__icon-colour"
            style={{backgroundColor: hexColourCode}}
        />

    switch (type) {
        case ItemType.TODO:
            return isTodoDone
                ? <IconCheckbox {...itemIcontProps} />
                : <IconSquare {...itemIcontProps} />
        case ItemType.LINK:
            return faviconUrl
                ? <Image h={24} src={faviconUrl}/>
                : <IconWorld {...itemIcontProps} />
        case ItemType.TEXT:
        default:
            return <IconFileText {...itemIcontProps} />
    }
};