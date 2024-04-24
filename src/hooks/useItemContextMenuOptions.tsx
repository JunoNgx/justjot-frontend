import { CollectionsContext } from "@/contexts/CollectionsContext";
import { Item, ItemCollection } from "@/types";
import { IconArrowMoveRight, IconCheckbox, IconCopy, IconDownload, IconEdit, IconFileSymlink, IconRestore, IconSquare, IconTrashX } from "@tabler/icons-react";
import { useContext } from "react";
import useIconProps from "./useIconProps";
import { canConvertItemToTodo, canRefetchItem, canToggleItemShouldCopyOnClick } from "@/utils/itemUtils";

type ItemContextMenuOptionsParams = {
    item: Item,
    copyFn: ({item}: {item: Item}) => void,
    editFn: (item: Item) => void,
    moveFn: ({item, collectionList}: {item: Item, collectionList: ItemCollection[]}) => void,
    trashFn: ({item}: {item: Item}) => void,
    untrashFn: ({item}: {item: Item}) => void,
    deleteFn: ({item}: {item: Item}) => void,
    refetchFn: (item: Item) => void,
    toggleCopyFn: ({item}: {item: Item}) => void,
    deselectFn: () => void,
    convertToTodoFn: ({item}: {item: Item}) => void,
};

export default function useItemContextMenuOptions(
    {
        item,
        copyFn,
        editFn,
        moveFn,
        deleteFn,
        refetchFn,
        toggleCopyFn,
        deselectFn,
        trashFn,
        untrashFn,
        convertToTodoFn,
    }: ItemContextMenuOptionsParams
) {
    const { collections } = useContext(CollectionsContext);
    const { menuIconProps } = useIconProps();

    const contextMenuDefaultActionIcon = item.shouldCopyOnClick
        ? <IconCheckbox {...menuIconProps} />
        : <IconSquare {...menuIconProps} />

    const copyAction = {
        key: "copy",
        icon: <IconCopy {...menuIconProps} />,
        onClick: () => {copyFn({item})}
    };

    const editAction = {
        key: "edit",
        icon: <IconEdit {...menuIconProps} />,
        onClick: () => {editFn(item)},
    };
    
    const moveAction = {
        key: "move",
        icon: <IconFileSymlink {...menuIconProps} />,
        onClick: () => {moveFn({item, collectionList: collections})},
    };

    const deleteAction = {
        key: "delete",
        icon: <IconTrashX {...menuIconProps} />,
        color: "red",
        onClick: () => {
            deleteFn({item});
            deselectFn();
        }
    };

    const trashAction = {
        key: "trash",
        icon: <IconTrashX {...menuIconProps} />,
        color: "red",
        onClick: () => {
            trashFn({item});
            deselectFn();
        }
    };

    const untrashAction = {
        key: "restore",
        icon: <IconRestore {...menuIconProps} />,
        onClick: () => {
            untrashFn({item});
            deselectFn();
        }
    };

    const refetchAction = {
        key: "refetch",
        title: "Refetch",
        hidden: !canRefetchItem(item),
        icon: <IconDownload {...menuIconProps} />,
        onClick: () => {refetchFn(item);}
    };

    const convertToTodoAction = {
        key: "convertToTodo",
        title: "Convert to Todo",
        hidden: !canConvertItemToTodo(item),
        icon: <IconArrowMoveRight {...menuIconProps} />,
        color: "orange",
        onClick: () => {convertToTodoFn({item});}
    };

    const togglePriActAction = {
        key: "togglePrimaryAction",
        title: "To copy",
        hidden: !canToggleItemShouldCopyOnClick(item),
        icon: contextMenuDefaultActionIcon,
        color: "blue",
        onClick: () => {toggleCopyFn({item})}
    };

    const divider = {
        key: "divider",
    };

    if (item.isTrashed) {
        return [
            copyAction,
            untrashAction,
            divider,
            deleteAction,
        ];
    }

    return [
        copyAction,
        editAction,
        moveAction,
        trashAction,
        refetchAction,
        convertToTodoAction,
        divider,
        togglePriActAction,
    ];
};