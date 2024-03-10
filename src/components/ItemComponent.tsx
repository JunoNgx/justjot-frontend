// import styled from 'styled-components';

import { useState } from "react";
import { Item, ItemType } from "../types";
import { calculatePriText, processDatetime } from "../utils/itemUtils";
import { Group, Paper, Text } from "@mantine/core";
import { IconClipboardText, IconNote, IconWorld } from "@tabler/icons-react";

export default function ItemComponent({ item }: { item: Item }) {

    const [isFocused, setIsFocused] = useState(false);
    // const isTodoItem = item.type === ItemType.TODO;
    const { relativeDatetime, fullDatetime } = processDatetime(item);
    const hasBorder = isFocused;
    const icon = computeIcon(item);

    return <Paper className={"item " + (isFocused ? "item--is-active" : "")}
        withBorder={hasBorder}
        p="xs"
        onMouseEnter={() => { setIsFocused(true) }}
        onMouseLeave={() => { setIsFocused(false) }}
    >
        <Group className="item__flex-wrapper"
            justify="space-between"

        >
            <Group className="item__left-side">
                {/* {isFocused} */}
                <div className="item__icon">{icon}</div>
                <div className="item__primary-text">{calculatePriText(item)}</div>
                <div className="item__secondary-text">{item.content}</div>
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
            return <IconWorld/>
        case ItemType.TEXT:
        default:
            return item.shouldCopyUponClick
                ? <IconClipboardText/>
                : <IconNote/>
    }
}