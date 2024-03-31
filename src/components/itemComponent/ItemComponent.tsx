// import styled from 'styled-components';

import { useContext } from "react";
import { Item, ItemType } from "@/types";
import { Box, Center, Group, Text } from "@mantine/core";
import { useContextMenu } from '@/libs/mantine-contextmenu';
import ItemComponentCreatedDate from "@/components/itemComponent/ItemComponentCreatedDate";
import ItemComponentIcon from "@/components/itemComponent/ItemComponentIcon";
import { MainViewContext } from "@/contexts/MainViewContext";
import useHandleContextMenuWithLongPress from "@/libs/useHandleContextMenuWithLongPress";
import useItemActions from "@/hooks/useItemActions";
import useItemContextMenuOptions from "@/hooks/useItemContextMenuOptions";
import { justJotTheme } from "@/theme";
import { IconClipboardCopy } from "@tabler/icons-react";

type ItemComponentParams = {
    item: Item,
    index: number,
}

export default function ItemComponent(
    { item, index }: ItemComponentParams
) {
    const { selectItem, deselectItem } = useContext(MainViewContext);
    const { showContextMenu } = useContextMenu();
    const {
        deleteItemWithOptimisticUpdate,
        copyItemContent,
        openUpdateItemModal,
        openMoveItemModal,
        refetchLink,
        toggleItemShouldCopyOnClickWithOptimisticUpdate,
        toggleItemIsTodoDoneWithOptimisticUpdate,
    } = useItemActions();
    const itemContextMenuOptions = useItemContextMenuOptions({
        item,
        copyFn: copyItemContent,
        editFn: openUpdateItemModal,
        moveFn: openMoveItemModal,
        deleteFn: deleteItemWithOptimisticUpdate,
        refetchFn: refetchLink,
        toggleCopyFn: toggleItemShouldCopyOnClickWithOptimisticUpdate,
        deselectFn: deselectItem
    });

    const handlePrimaryAction = (
        _e: React.MouseEvent | React.TouchEvent
    ) => {
        if (item.type === ItemType.TODO) {
            toggleItemIsTodoDoneWithOptimisticUpdate({item});
            return;
        }

        if (item.shouldCopyOnClick) {
            copyItemContent(item);
            return;
        }

        if (item.type === ItemType.LINK) {
            // Let the <a> tag handle the click
            // window.open(item.content, "_blank");
            return;
        }

        openUpdateItemModal(item);
    };

    const handleSecondaryAction = (
        e: React.MouseEvent | React.TouchEvent
    ) => {
        const handleEventWithContextMenu = showContextMenu(
            itemContextMenuOptions,
            { className: "dropdown-menu" }
        )
        handleEventWithContextMenu(e as
            React.MouseEvent
            & React.TouchEvent
        );
    };

    const longPressEvent = useHandleContextMenuWithLongPress({
        onClick: handlePrimaryAction,
        onLongPress: handleSecondaryAction,
    }, {
        delay: 800,
    });

    const isLink = item.type === ItemType.LINK;
    const shouldRenderAsAnchor = isLink && !item.shouldCopyOnClick;
    const anchorProps = shouldRenderAsAnchor
    ? {
        component: "a" as any,
        href: item.content,
        rel: "noopener noreferrer",
        target: "_blank",
    }
    : {};

    return <Box
        {...anchorProps}

        className={computeClassname(item)}
        p="xs"
        data-is-item={true}
        data-index={index}
        {...longPressEvent}

        onMouseEnter={() => { selectItem(index)}}
        onMouseLeave={() => { deselectItem()}}
    >
            <Group className="item__flex-wrapper"
                justify="space-between"
                wrap="nowrap"
            >
                <Group className="item__left-side"
                    justify="flex-start"
                    wrap="nowrap"
                >
                    <Center className="item__icon-wrapper">
                        <ItemComponentIcon
                            type={item.type}
                            faviconUrl={item.faviconUrl}
                            isTodoDone={item.isTodoDone}
                            hexColourCode={item.content.substring(item.content.length - 7)}
                        />
                    </Center>
                    {item.title && <Text className="item__primary-text"
                        title={item.title}
                    >
                        {item.title}
                    </Text>}
                    {item.content&& <Text className="item__secondary-text"
                        title={item.content}
                    >
                        {item.content}
                    </Text>}
                </Group>
                <Group className="item__right-side"
                    gap="xs"
                >
                    {item.shouldCopyOnClick && <IconClipboardCopy
                        size={justJotTheme.other.iconSizeItem}
                        stroke={justJotTheme.other.iconStrokeWidth}
                    />}
                    <ItemComponentCreatedDate className="item__datetime"
                        createdDatetime={item.created}
                    />
                </Group>
            </Group>

        </Box>
};

const computeClassname = (item: Item) => {
    const noPrimaryTextModifier = item.title
        ? " "
        : "item--has-no-primary-text ";
    const noSecondaryTextModifier = item.content
        ? " "
        : "item--has-no-secondary-text ";

    const isTodoItem = item.type === ItemType.TODO;
    const isTodoItemDoneModifier = isTodoItem && item.isTodoDone
        ? "item--is-todo-done "
        : " "

    return "item "
        + noPrimaryTextModifier
        + noSecondaryTextModifier
        + isTodoItemDoneModifier;
}