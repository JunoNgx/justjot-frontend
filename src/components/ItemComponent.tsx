// import styled from 'styled-components';

import { useState } from "react";
import { Item, ItemType } from "../types";
import { calculatePriText, processDatetime } from "../utils/itemUtils";
import { Center, Group, Image, Paper, Text } from "@mantine/core";
import { IconNote, IconNotes, IconWorld } from "@tabler/icons-react";
import { isValidUrl } from "../utils/misc";
import { useContextMenu } from 'mantine-contextmenu';
import { justJotTheme } from "../theme";

export default function ItemComponent({ item }: { item: Item }) {

    const [isFocused, setIsFocused] = useState(false);
    // const isTodoItem = item.type === ItemType.TODO;
    const { relativeDatetime, fullDatetime } = processDatetime(item);
    const icon = computeIcon(item);

    const { showContextMenu } = useContextMenu();

    const refetch = async () => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}refetch/${item.id}`, {
            method: "POST"
        })
        // TODO update items
    }

    return <Paper className={"item " + (isFocused ? "item--is-active" : "")}
        p="xs"
        onMouseEnter={() => { setIsFocused(true) }}
        onMouseLeave={() => { setIsFocused(false) }}
        // onContextMenu={handleContextMenu}
        onContextMenu={showContextMenu(
            [
                {
                    key: "copy",
                    onClick: () => {}
                }, {
                    key: "edit",
                    onClick: () => {}
                }, {
                    key: "delete",
                    color: "red",
                    onClick: () => {}
                }, {
                    key: "move",
                    onClick: () => {}
                }, {
                    key: "refetch link",
                    onClick: refetch
                }, {
                    key: "divider",
                }, {
                    key: "Copy by default",
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