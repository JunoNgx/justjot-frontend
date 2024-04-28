import { useContext } from "react";
import { Item, ItemType } from "@/types";
import { Center, Group } from "@mantine/core";
import { useContextMenu } from 'mantine-contextmenu';
import ItemComponentCreatedDate from "@/components/itemComponent/ItemComponentCreatedDate";
import ItemComponentIcon from "@/components/itemComponent/ItemComponentIcon";
import useHandleContextMenuWithLongPress from "@/libs/useHandleContextMenuWithLongPress";
import useItemActions from "@/hooks/useItemActions";
import useItemContextMenuOptions from "@/hooks/useItemContextMenuOptions";
import { IconClipboardCopy } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import { ItemsContext } from "@/contexts/ItemsContext";
import ItemComponentText from "./ItemComponentText";

type ItemComponentParams = {
    item: Item,
    index: number,
}

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
        trashItemWithOptimisticUpdate,
        untrashItemWithOptimisticUpdate,
    } = useItemActions();
    const itemContextMenuOptions = useItemContextMenuOptions({
        item,
        copyFn: copyItemContent,
        editFn: openUpdateItemModal,
        moveFn: openMoveItemModal,
        untrashFn: untrashItemWithOptimisticUpdate,
        trashFn: trashItemWithOptimisticUpdate,
        deleteFn: deleteItemWithOptimisticUpdate,
        refetchFn: refetchLink,
        toggleCopyFn: toggleItemShouldCopyOnClickWithOptimisticUpdate,
        deselectFn: () => {setSelectedIndex(-1)},
        convertToTodoFn: convertToTodo,
    });
    const { itemIconProps } = useIconProps();

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
            component: "a",
            href: item.content,
            rel: "noopener noreferrer",
            target: "_blank",
            "aria-label": "Link to this item content",
        }
        : {};

    return <Group className={computeClassname(item, isSelected)}
        justify="space-between"
        wrap="nowrap"
        data-index={index}
        {...anchorProps}
        role={isLink ? "link" : "button"}
        aria-current={isSelected}
        {...clickEventsProps}
        onMouseEnter={() => { setSelectedIndex(index)}}
        onMouseLeave={() => { setSelectedIndex(-1)}}
    >
        <Group className="item__left-side"
            justify="flex-start"
            wrap="nowrap"
        >
            <Center className="item__icon-wrapper">
                <ItemComponentIcon item={item} />
            </Center>
            <ItemComponentText item={item} />
        </Group>

        <Group className="item__right-side"
            gap="xs"
        >
            {item.shouldCopyOnClick &&
                <IconClipboardCopy className="item__should-copy-icon"
                    {...itemIconProps}
                />
            }
            <ItemComponentCreatedDate className="item__datetime"
                createdDatetime={item.created}
            />
        </Group>

    </Group>
}

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