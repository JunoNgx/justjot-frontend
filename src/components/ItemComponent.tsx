// import styled from 'styled-components';

import { useState } from "react";
import { Item, ItemType } from "../types";
import { calculatePriText, processDatetime } from "../utils/itemUtils";
import { Center, Group, Image, Paper, Text } from "@mantine/core";
import { IconCheckbox, IconCopy, IconDownload, IconEdit, IconFileSymlink, IconNote, IconNotes, IconSquare, IconTrash, IconWorld } from "@tabler/icons-react";
import { isValidUrl } from "../utils/misc";
import { useContextMenu } from 'mantine-contextmenu';
import { justJotTheme } from "../theme";
import useContextMenuActions from "../hooks/useContextMenuActions";

export default function ItemComponent({ item }: { item: Item }) {

    const { showContextMenu } = useContextMenu();

    const [isFocused, setIsFocused] = useState(false);
    const { relativeDatetime, fullDatetime } = processDatetime(item);

    const { refetchTitleAndFavicon } = useContextMenuActions();

    const contextMenuDefaultActionIcon = item.shouldCopyOnClick
        ? <IconCheckbox
            size={justJotTheme.other.iconSizeMenu}
            stroke={justJotTheme.other.iconStrokeWidth}
        />
        : <IconSquare
            size={justJotTheme.other.iconSizeMenu}
            stroke={justJotTheme.other.iconStrokeWidth}
        />
    
    const icon = computeIcon(item);    

    return <Paper className={"item " + (isFocused ? "item--is-active" : "")}
        p="xs"
        onMouseEnter={() => { setIsFocused(true) }}
        onMouseLeave={() => { setIsFocused(false) }}
        onContextMenu={showContextMenu(
            [
                {
                    key: "copy",
                    icon: <IconCopy
                        size={justJotTheme.other.iconSizeMenu}
                        stroke={justJotTheme.other.iconStrokeWidth}
                    />,
                    onClick: () => {}
                }, {
                    key: "edit",
                    icon: <IconEdit
                        size={justJotTheme.other.iconSizeMenu}
                        stroke={justJotTheme.other.iconStrokeWidth}
                    />,
                    onClick: () => {}
                }, {
                    key: "move",
                    icon: <IconFileSymlink
                        size={justJotTheme.other.iconSizeMenu}
                        stroke={justJotTheme.other.iconStrokeWidth}
                    />,
                    onClick: () => {}
                }, {
                    key: "refetch link",
                    icon: <IconDownload
                        size={justJotTheme.other.iconSizeMenu}
                        stroke={justJotTheme.other.iconStrokeWidth}
                    />,
                    onClick: () => {refetchTitleAndFavicon(item);}
                }, {
                    key: "delete",
                    icon: <IconTrash
                        size={justJotTheme.other.iconSizeMenu}
                        stroke={justJotTheme.other.iconStrokeWidth}
                    />,
                    color: "red",
                    onClick: () => {}
                }, {
                    key: "divider",
                }, {
                    key: "Copy on click",
                    icon: contextMenuDefaultActionIcon,
                    color: "blue",
                    onClick: () => {}
                }
            ],
            { className: "dropdown-menu" }
        )}
    >
        <Group className="item__flex-wrapper"
            justify="space-between"
            wrap="nowrap"
        >
            <Group className="item__left-side"
                justify="flex-start"
                wrap="nowrap"
            >
                <Center className="item__icon-wrapper">{icon}</Center>
                {item.title && <Text className="item__primary-text"
                    title={item.title}
                >
                    {calculatePriText(item)}
                </Text>}
                {item.content&& <Text className="item__secondary-text"
                    c="dimmed"
                    title={item.content}
                >
                    {item.content}
                </Text>}
            </Group>
            <Group className="item__right-side">
                <Text
                    className="item__datetime"
                    title={fullDatetime}
                >
                    {relativeDatetime}
                </Text>
            </Group>
        </Group>
    </Paper>
};

const computeIcon = (item: Item) => {
    switch (item.type) {
        case ItemType.LINK:
            return item.faviconUrl && isValidUrl(item.faviconUrl)
                ? <Image h={24} src={item.faviconUrl}/>
                : <IconWorld
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
        case ItemType.TEXT:
        default:
            return item.shouldCopyOnClick
                ? <IconNote
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
                : <IconNotes
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
    }
}