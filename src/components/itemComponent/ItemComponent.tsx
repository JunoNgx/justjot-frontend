import { useContext } from "react";
import { Item, ItemType } from "@/types";
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

import "./ItemComponent.scss"

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

    return <div className={computeClassname(item, isSelected)}
        data-index={index}
        data-id={item.id}
        {...anchorProps}
        role={isLink ? "link" : "button"}
        aria-current={isSelected}
        {...clickEventsProps}
        onMouseEnter={() => { setSelectedIndex(index)}}
        onMouseLeave={() => { setSelectedIndex(-1)}}
    >
        <div className="Item__LeftSide">
            <div className="Item__IconWrapper">
                <ItemComponentIcon item={item} />
            </div>
            <ItemComponentText item={item} />
        </div>

        <div className="Item__RightSide">
            {item.shouldCopyOnClick &&
                <IconClipboardCopy className="Item__ShouldCopyIcon"
                    {...itemIconProps}
                />
            }
            <ItemComponentCreatedDate className="Item__Datetime"
                createdDatetime={item.created}
            />
        </div>

    </div>
}

const computeClassname = (item: Item, isSelected: boolean) => {
    const isSelectedModifier = isSelected
        ? "Item--IsSelected "
        : " ";
    const noPrimaryTextModifier = item.title
        ? " "
        : "Item--HasNoPrimaryText ";
    const noSecondaryTextModifier = item.content
        ? " "
        : "Item--HasNoSecondaryText ";

    const isTodoItem = item.type === ItemType.TODO;
    const isTodoItemDoneModifier = isTodoItem && item.isTodoDone
        ? "Item--IsTodoDone "
        : " ";

    return "Item "
        + isSelectedModifier
        + noPrimaryTextModifier
        + noSecondaryTextModifier
        + isTodoItemDoneModifier;
}