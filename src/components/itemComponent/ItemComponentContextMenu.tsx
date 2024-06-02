import { Item } from '@/types';
import * as ContextMenu from '@radix-ui/react-context-menu';
import LabelWithIcon from '@/libs/components/LabelWithIcon';
import useIconProps from '@/hooks/useIconProps';
import { IconArrowMoveRight, IconCheckbox, IconCopy, IconDownload, IconEdit, IconFileSymlink, IconRestore, IconSquare, IconTrashX } from "@tabler/icons-react";
import { canConvertItemToTodo, canDeleteItem, canMoveItem, canRefetchItem, canToggleItemShouldCopyOnClick, canTrashItem } from '@/utils/itemUtils';

import "./ItemComponentContextMenu.scss";
import useItemActions from '@/hooks/useItemActions';
import { useContext } from 'react';
import { CollectionsContext } from '@/contexts/CollectionsContext';
import { ItemsContext } from '@/contexts/ItemsContext';

export default function ItemComponentContextMenu(
    { item }: { item: Item }
) {
    const { initCollections } = useContext(CollectionsContext);
    const { setSelectedIndex } = useContext(ItemsContext);

    const { menuIconProps } = useIconProps();
    const {
        deleteItemWithOptimisticUpdate,
        copyItemContent,
        openUpdateItemModal,
        openMoveItemModal,
        refetchLink,
        toggleItemShouldCopyOnClickWithOptimisticUpdate,
        convertToTodo,
        trashItemWithOptimisticUpdate,
        untrashItemWithOptimisticUpdate,
    } = useItemActions();

    const copyAction = <ContextMenu.Item className="ItemContextMenu__Item"
        onClick={() => copyItemContent({item})}
    >
        <LabelWithIcon className="ItemContextMenu__Label"
            leftSection={<IconCopy {...menuIconProps} />}
        >
            Copy
        </LabelWithIcon>
    </ContextMenu.Item>

    const editAction = <ContextMenu.Item className="ItemContextMenu__Item"
        onClick={() => openUpdateItemModal(item)}
    >
        <LabelWithIcon className="ItemContextMenu__Label"
            leftSection={<IconEdit {...menuIconProps} />}
        >
            Edit
        </LabelWithIcon>
    </ContextMenu.Item>

    const moveAction = <ContextMenu.Item className="ItemContextMenu__Item"
        onClick={() => openMoveItemModal({item, collectionList: initCollections})}
    >
        <LabelWithIcon className="ItemContextMenu__Label"
            leftSection={<IconFileSymlink {...menuIconProps} />}
        >
            Move
        </LabelWithIcon>
    </ContextMenu.Item>

    const trashAction = <ContextMenu.Item
        className="ItemContextMenu__Item ItemContextMenu__Item--IsRed"
        onClick={() => {
            trashItemWithOptimisticUpdate({item});
            setSelectedIndex(-1);
        }}
    >
        <LabelWithIcon className="ItemContextMenu__Label"
            leftSection={<IconTrashX {...menuIconProps} />}
        >
            Trash
        </LabelWithIcon>
    </ContextMenu.Item>

    const untrashAction = <ContextMenu.Item className="ItemContextMenu__Item"
        onClick={() => {
            untrashItemWithOptimisticUpdate({item});
            setSelectedIndex(-1);
        }}
    >
        <LabelWithIcon className="ItemContextMenu__Label"
            leftSection={<IconRestore {...menuIconProps} />}
        >
            Restore
        </LabelWithIcon>
    </ContextMenu.Item>

    const refetchAction = <ContextMenu.Item className="ItemContextMenu__Item"
        onClick={() => {
            refetchLink(item);
            setSelectedIndex(-1);
        }}
    >
        <LabelWithIcon className="ItemContextMenu__Label"
            leftSection={<IconDownload {...menuIconProps} />}
        >
            Refetch
        </LabelWithIcon>
    </ContextMenu.Item>

    const convertToTodoAction = <ContextMenu.Item
        className="ItemContextMenu__Item ItemContextMenu__Item--IsOrange"
        onClick={() => convertToTodo({item})}
    >
        <LabelWithIcon className="ItemContextMenu__Label"
            leftSection={<IconArrowMoveRight {...menuIconProps} />}
        >
            Convert to Todo
        </LabelWithIcon>
    </ContextMenu.Item>

    const togglePriActionIcon = item.shouldCopyOnClick
        ? <IconCheckbox {...menuIconProps} />
        : <IconSquare {...menuIconProps} />
    const togglePriActAction = <ContextMenu.Item
        className="ItemContextMenu__Item ItemContextMenu__Item--IsBlue"
        onClick={() => toggleItemShouldCopyOnClickWithOptimisticUpdate({item})}
    >
        <LabelWithIcon className="ItemContextMenu__Label"
            leftSection={togglePriActionIcon}
        >
            To copy
        </LabelWithIcon>
    </ContextMenu.Item>

    const deleteAction = <ContextMenu.Item
        className="ItemContextMenu__Item ItemContextMenu__Item--IsRed"
        onClick={() => deleteItemWithOptimisticUpdate({item})}
    >
        <LabelWithIcon className="ItemContextMenu__Label"
            leftSection={<IconTrashX {...menuIconProps} />}
        >
            Delete
        </LabelWithIcon>
    </ContextMenu.Item>

    const shouldShowSeparator = canToggleItemShouldCopyOnClick(item)
        || canDeleteItem(item);

    return <ContextMenu.Content className="ItemContextMenu">
        {copyAction}
        {editAction}
        {canMoveItem(item) && moveAction}
        {canTrashItem(item) && trashAction}
        {!canTrashItem(item) && untrashAction}
        {canRefetchItem(item) && refetchAction}
        {canConvertItemToTodo(item) && convertToTodoAction}

        {shouldShowSeparator &&
            <ContextMenu.Separator className="ItemContextMenu__Separator" />}

        {canToggleItemShouldCopyOnClick(item) && togglePriActAction}
        {canDeleteItem(item) && deleteAction}
    </ContextMenu.Content>
}