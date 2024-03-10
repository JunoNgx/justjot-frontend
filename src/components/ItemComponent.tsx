// import styled from 'styled-components';

import { useState } from "react";
import { Item, ItemType } from "../types";
import { calculatePriText, processDatetime } from "../utils/itemUtils";
import { Center, Group, Paper, Text } from "@mantine/core";
import { IconNote, IconNotes, IconWorld } from "@tabler/icons-react";

export default function ItemComponent({ item }: { item: Item }) {

    const [isFocused, setIsFocused] = useState(false);
    // const isTodoItem = item.type === ItemType.TODO;
    const { relativeDatetime, fullDatetime } = processDatetime(item);
    const icon = computeIcon(item);

    return <Paper className={"item " + (isFocused ? "item--is-active" : "")}
        p="xs"
        onMouseEnter={() => { setIsFocused(true) }}
        onMouseLeave={() => { setIsFocused(false) }}
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
                <Text className="item__secondary-text"
                    c="dimmed"
                    title={item.content}
                >
                    {item.content}
                </Text>
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
                ? <IconNote/>
                : <IconNotes/>
    }
}