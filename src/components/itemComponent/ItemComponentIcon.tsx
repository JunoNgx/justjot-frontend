import { Image } from "@mantine/core";
import { Item, ItemType } from "@/types";
import { IconCheckbox, IconFileText, IconHourglassLow, IconSquare, IconWorld } from "@tabler/icons-react";
import { isValidHexColourCode } from "@/utils/itemUtils";
import useIconProps from "@/hooks/useIconProps";
import { useContext, useState } from "react";
import { UserLocalSettingsContext } from "@/contexts/UserLocalSettingsContext";

export default function ItemComponentIcon(
    { item }: { item: Item }
) {

    const { isFaviconEnabled } = useContext(UserLocalSettingsContext);
    const { itemIcontProps } = useIconProps();
    const lastSevenChars = item.content.substring(item.content.length - 7);

    if (item.isPending)
        return <IconHourglassLow {...itemIcontProps} />

    if (isValidHexColourCode(lastSevenChars) && item.type !== ItemType.TODO)
        return <div className="item__icon-colour"
            aria-label={`Icon with the hex colour code ${lastSevenChars}`}
            style={{backgroundColor: lastSevenChars}}
        />

    switch (item.type) {
        case ItemType.TODO:
            return item.isTodoDone
                ? <IconCheckbox {...itemIcontProps} />
                : <IconSquare {...itemIcontProps} />
        case ItemType.LINK:
            return item.faviconUrl && isFaviconEnabled
                ? <FaviconImg faviconUrl={item.faviconUrl}/>
                : <IconWorld {...itemIcontProps} />
        case ItemType.TEXT:
        default:
            return <IconFileText {...itemIcontProps} />
    }
};

const FaviconImg = ({ faviconUrl }: { faviconUrl: string }) => {

    const { itemIcontProps } = useIconProps();
    const [ shouldShow, setShouldShow] = useState(true)
    
    return shouldShow
        ? <Image h={24} src={faviconUrl}
            alt={"Favicon of this link item"}
            referrerPolicy="no-referrer"
            // onLoad={() => setShouldShow(true)}
            onError={() => setShouldShow(false)}
        />
        : <IconWorld {...itemIcontProps} />
};
