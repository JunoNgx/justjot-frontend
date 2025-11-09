import { ForwardedRef, forwardRef, useContext } from "react";
import { Item, ItemType } from "@/types";
import * as ContextMenu from "@radix-ui/react-context-menu";
import ItemComponentCreatedDate from "@/components/itemComponent/ItemComponentCreatedDate";
import ItemComponentIcon from "@/components/itemComponent/ItemComponentIcon";
import useItemActions from "@/hooks/useItemActions";
import { IconClipboardCopy } from "@tabler/icons-react";
import useIconProps from "@/hooks/useIconProps";
import { ItemsContext } from "@/contexts/ItemsContext";
import ItemComponentText from "./ItemComponentText";

import "./ItemComponent.scss";
import ItemComponentContextMenu from "./ItemComponentContextMenu";

type ItemComponentParams = {
    item: Item;
    index: number;
};

export default function ItemComponent({ item, index }: ItemComponentParams) {
    const { itemIconProps } = useIconProps();

    const itemComponentInner = (
        <ItemComponentInner item={item} index={index}>
            <div className="Item__LeftSide">
                <div className="Item__IconWrapper">
                    <ItemComponentIcon item={item} />
                </div>
                <ItemComponentText item={item} />
            </div>

            <div className="Item__RightSide">
                {item.shouldCopyOnClick && (
                    <div
                        className="Item__ShouldCopyIndicator"
                        title="This item has been set to copy on click"
                    >
                        <IconClipboardCopy
                            className="Item__ShouldCopyIcon"
                            {...itemIconProps}
                        />
                    </div>
                )}
                <ItemComponentCreatedDate
                    className="Item__Datetime"
                    createdDatetime={item.created}
                />
            </div>
        </ItemComponentInner>
    );

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger asChild>
                {itemComponentInner}
            </ContextMenu.Trigger>

            <ItemComponentContextMenu item={item} />
        </ContextMenu.Root>
    );
}

type ItemComponentInnerProps = {
    item: Item;
    index: number;
    children: React.ReactNode;
};

// TODO: forwardRef has been deprecated by React 19, to remove this once Radix official guide is updated
// ForwardRef to receive props from Radix Composition with `asChild`
const ItemComponentInner = forwardRef<
    HTMLDivElement | HTMLAnchorElement,
    ItemComponentInnerProps
>(({ item, index, children, ...props }, forwardedRef) => {
    const { selectedIndex, setSelectedIndex } = useContext(ItemsContext);
    const { computeItemPrimaryAction, executeItemAction } = useItemActions();

    const handlePrimaryAction = (_e: React.MouseEvent | React.TouchEvent) => {
        const action = computeItemPrimaryAction(item);
        executeItemAction(item, action, true);
    };

    const isSelected = selectedIndex === index;
    const isLink = item.type === ItemType.LINK;
    const shouldRenderAsAnchor = isLink && !item.shouldCopyOnClick;

    type standardPropsOptions = {
        className: string;
        "data-index": number;
        "data-id": string;
        role: string;
        "aria-current": boolean;
        "aria-labelledby"?: string;
        tabIndex: number;
        onClick: (_e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    };

    const standardProps: standardPropsOptions = {
        className: computeClassname(item, isSelected),
        "data-index": index,
        "data-id": item.id,
        role: isLink ? "link" : "button",
        "aria-current": isSelected,
        "aria-labelledby": !!item.title
            ? `item-primary-text-${item.id}`
            : `item-secondary-text-${item.id}`,
        "tabIndex": 0,
        onClick: handlePrimaryAction,
        onMouseEnter: () => {
            setSelectedIndex(index);
        },
        onMouseLeave: () => {
            setSelectedIndex(-1);
        },
    };

    if (isLink) {
        delete standardProps["aria-labelledby"];
    }

    const anchorProps = {
        href: item.content,
        rel: "noopener noreferrer",
        target: "_blank",
        "aria-label": "Link to this item content",
    };

    const finalProps = shouldRenderAsAnchor
        ? { ...props, ...standardProps, ...anchorProps }
        : { ...props, ...standardProps };

    /**
     * Render type LINK as `<a>` to improve semantic
     */
    return shouldRenderAsAnchor ? (
        <a
            {...finalProps}
            ref={forwardedRef as ForwardedRef<HTMLAnchorElement>}
        >
            {children}
        </a>
    ) : (
        <div {...finalProps} ref={forwardedRef as ForwardedRef<HTMLDivElement>}>
            {children}
        </div>
    );
});
ItemComponentInner.displayName = "ItemComponentInner";

const computeClassname = (item: Item, isSelected: boolean) => {
    const isSelectedModifier = isSelected ? "Item--IsSelected " : " ";
    const noPrimaryTextModifier = item.title ? " " : "Item--HasNoPrimaryText ";
    const noSecondaryTextModifier = item.content
        ? " "
        : "Item--HasNoSecondaryText ";

    const isTodoItem = item.type === ItemType.TODO;
    const isTodoItemDoneModifier =
        isTodoItem && item.isTodoDone ? "Item--IsTodoDone " : " ";

    return (
        "Item "
        + isSelectedModifier
        + noPrimaryTextModifier
        + noSecondaryTextModifier
        + isTodoItemDoneModifier
    );
};
