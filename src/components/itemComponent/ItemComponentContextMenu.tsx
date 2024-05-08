import { Item } from '@/types';
import * as ContextMenu from '@radix-ui/react-context-menu';
import ItemWithIcon from '@/libs/components/ItemWithIcon';
import useIconProps from '@/hooks/useIconProps';
import { IconArrowMoveRight, IconCheckbox, IconCopy, IconDownload, IconEdit, IconFileSymlink, IconRestore, IconSquare, IconTrashX } from "@tabler/icons-react";
import { canConvertItemToTodo, canDeleteItem, canMoveItem, canRefetchItem, canToggleItemShouldCopyOnClick, canTrashItem } from '@/utils/itemUtils';

import "./ItemComponentContextMenu.scss";

export default function ItemComponentContextMenu(
    { item }: { item: Item }
) { 
    const { menuIconProps } = useIconProps();

    const copyAction = <ContextMenu.Item className="ItemContextMenu__Item">
        <ItemWithIcon className="ItemContextMenu__Label"
            leftSection={<IconCopy {...menuIconProps} />}
        >
            Copy
        </ItemWithIcon>
    </ContextMenu.Item>

    const editAction = <ContextMenu.Item className="ItemContextMenu__Item">
        <ItemWithIcon className="ItemContextMenu__Label"
            leftSection={<IconEdit {...menuIconProps} />}
        >
            Edit
        </ItemWithIcon>
    </ContextMenu.Item>

    const moveAction = <ContextMenu.Item className="ItemContextMenu__Item">
        <ItemWithIcon className="ItemContextMenu__Label"
            leftSection={<IconFileSymlink {...menuIconProps} />}
        >
            Move
        </ItemWithIcon>
    </ContextMenu.Item>

    const trashAction = <ContextMenu.Item className="ItemContextMenu__Item ItemContextMenu__Item--IsRed">
        <ItemWithIcon className="ItemContextMenu__Label"
            leftSection={<IconTrashX {...menuIconProps} />}
        >
            Trash
        </ItemWithIcon>
    </ContextMenu.Item>

    const untrashAction = <ContextMenu.Item className="ItemContextMenu__Item">
        <ItemWithIcon className="ItemContextMenu__Label"
            leftSection={<IconRestore {...menuIconProps} />}
        >
            Restore
        </ItemWithIcon>
    </ContextMenu.Item>

    const refetchAction = <ContextMenu.Item className="ItemContextMenu__Item">
        <ItemWithIcon className="ItemContextMenu__Label"
            leftSection={<IconDownload {...menuIconProps} />}
        >
            Refetch
        </ItemWithIcon>
    </ContextMenu.Item>

    const convertToTodoAction = <ContextMenu.Item className="ItemContextMenu__Item ItemContextMenu__Item--IsOrange">
        <ItemWithIcon className="ItemContextMenu__Label"
            leftSection={<IconArrowMoveRight {...menuIconProps} />}
        >
            Convert to Todo
        </ItemWithIcon>
    </ContextMenu.Item>

    const togglePriActionIcon = item.shouldCopyOnClick
        ? <IconCheckbox {...menuIconProps} />
        : <IconSquare {...menuIconProps} />
    const togglePriActAction = <ContextMenu.Item className="ItemContextMenu__Item ItemContextMenu__Item--IsBlue">
        <ItemWithIcon className="ItemContextMenu__Label"
            leftSection={togglePriActionIcon}
        >
            To copy
        </ItemWithIcon>
    </ContextMenu.Item>

    const deleteAction = <ContextMenu.Item className="ItemContextMenu__Item">
        <ItemWithIcon className="ItemContextMenu__Label ItemContextMenu__Label--IsRed"
            leftSection={<IconFileSymlink {...menuIconProps} />}
        >
            Delete
        </ItemWithIcon>
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