import { useContext } from "react";
import { Item, ItemType } from "@/types";
import { Box, Center, Group, Text } from "@mantine/core";
import { useContextMenu } from 'mantine-contextmenu';
import ItemComponentCreatedDate from "@/components/itemComponent/ItemComponentCreatedDate";
import ItemComponentIcon from "@/components/itemComponent/ItemComponentIcon";
import useHandleContextMenuWithLongPress from "@/libs/useHandleContextMenuWithLongPress";
import useItemActions from "@/hooks/useItemActions";
import useItemContextMenuOptions from "@/hooks/useItemContextMenuOptions";
import { IconClipboardCopy } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import { ItemsContext } from "@/contexts/ItemsContext";

type ItemComponentParams = {
    item: Item,
    index: number,
}

const CHAR_DISPLAY_COUNT = 50;

export default function ItemComponent(
    { item, index }: ItemComponentParams
) {
    const { selectedIndex, setSelectedIndex } = useContext(ItemsContext);
    const { showContextMenu } = useContextMenu();
    const {
        deleteItemWithOptimisticUpdate,
        copyItemContent,
        openUpdateItemModal,
        openMoveItemModal,
        refetchLink,
        toggleItemShouldCopyOnClickWithOptimisticUpdate,
        computeItemPrimaryAction,
        executeItemAction,
        convertToTodo,
    } = useItemActions();
    const itemContextMenuOptions = useItemContextMenuOptions({
        item,
        copyFn: copyItemContent,
        editFn: openUpdateItemModal,
        moveFn: openMoveItemModal,
        deleteFn: deleteItemWithOptimisticUpdate,
        refetchFn: refetchLink,
        toggleCopyFn: toggleItemShouldCopyOnClickWithOptimisticUpdate,
        deselectFn: () => {setSelectedIndex(-1)},
        convertToTodoFn: convertToTodo,
    });
    const { itemIcontProps } = useIconProps();

    const handlePrimaryAction = (
        _e: React.MouseEvent | React.TouchEvent
    ) => {
        const action = computeItemPrimaryAction(item);
        executeItemAction(item, action, true);
    };

    const handleSecondaryAction = (
        e: React.MouseEvent | React.TouchEvent
    ) => {
        const handleEventWithContextMenu = showContextMenu(
            itemContextMenuOptions,
            { className: "item-context-menu" }
        )
        handleEventWithContextMenu(e as
            React.MouseEvent
            & React.TouchEvent
        );
    };

    const clickEventsProps = useHandleContextMenuWithLongPress({
        onClick: handlePrimaryAction,
        onLongPress: handleSecondaryAction,
    }, {
        delay: 800,
    });

    const isSelected = selectedIndex === index;
    const isLink = item.type === ItemType.LINK;
    const shouldRenderAsAnchor = isLink && !item.shouldCopyOnClick;
    const anchorProps = shouldRenderAsAnchor
    ? {
        component: "a" as any,
        href: item.content,
        rel: "noopener noreferrer",
        target: "_blank",
        "aria-label": "Link to this item content",
    }
    : {};

    return <Box className={computeClassname(item, isSelected)}
        p="xs"
        data-index={index}
        {...anchorProps}
        role={isLink ? "link" : "button"}
        {...clickEventsProps}
        onMouseEnter={() => { setSelectedIndex(index)}}
        onMouseLeave={() => { setSelectedIndex(-1)}}
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
                        <ItemComponentIcon item={item} />
                    </Center>
                    {item.title && <Text className="item__primary-text"
                        title={item.title}
                    >
                        {item.title.substring(0, CHAR_DISPLAY_COUNT)}
                    </Text>}
                    {item.content && <Text className="item__secondary-text"
                        title={item.content}
                    >
                        {item.content.substring(0, CHAR_DISPLAY_COUNT)}
                    </Text>}
                </Group>
                <Group className="item__right-side"
                    gap="xs"
                >
                    {item.shouldCopyOnClick && <IconClipboardCopy {...itemIcontProps} />}
                    <ItemComponentCreatedDate className="item__datetime"
                        createdDatetime={item.created}
                    />
                </Group>
            </Group>

        </Box>
};

const computeClassname = (item: Item, isSelected: boolean) => {
    const isSelectedModifier = isSelected
        ? "item--is-selected "
        : " ";
    const noPrimaryTextModifier = item.title
        ? " "
        : "item--has-no-primary-text ";
    const noSecondaryTextModifier = item.content
        ? " "
        : "item--has-no-secondary-text ";

    const isTodoItem = item.type === ItemType.TODO;
    const isTodoItemDoneModifier = isTodoItem && item.isTodoDone
        ? "item--is-todo-done "
        : " ";

    return "item "
        + isSelectedModifier
        + noPrimaryTextModifier
        + noSecondaryTextModifier
        + isTodoItemDoneModifier;
}