import { useContext } from "react";
import { Item, ItemType } from "@/types";
import * as ContextMenu from '@radix-ui/react-context-menu';
import ItemComponentCreatedDate from "@/components/itemComponent/ItemComponentCreatedDate";
import ItemComponentIcon from "@/components/itemComponent/ItemComponentIcon";
import useItemActions from "@/hooks/useItemActions";
import { IconClipboardCopy } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import { ItemsContext } from "@/contexts/ItemsContext";
import ItemComponentText from "./ItemComponentText";

import "./ItemComponent.scss"
import ItemComponentContextMenu from "./ItemComponentContextMenu";

type ItemComponentParams = {
    item: Item,
    index: number,
}

export default function ItemComponent(
    { item, index }: ItemComponentParams
) {
    const { selectedIndex, setSelectedIndex } = useContext(ItemsContext);
    const {
        computeItemPrimaryAction,
        executeItemAction,
    } = useItemActions();
    const { itemIconProps } = useIconProps();

    const handlePrimaryAction = (
        _e: React.MouseEvent | React.TouchEvent
    ) => {
        const action = computeItemPrimaryAction(item);
        executeItemAction(item, action, true);
    };

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

    const itemComponentMain = <div className={computeClassname(item, isSelected)}
        data-index={index}
        data-id={item.id}
        {...anchorProps}
        role={isLink ? "link" : "button"}
        aria-current={isSelected}
        onClick={handlePrimaryAction}
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

    return <ContextMenu.Root>
        <ContextMenu.Trigger>
            {itemComponentMain}
        </ContextMenu.Trigger>

        <ItemComponentContextMenu item={item} />
    </ContextMenu.Root>
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