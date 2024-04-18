import { CollectionsContext } from "@/contexts/CollectionsContext";
import { Item, ItemCollection } from "@/types";
import { IconArrowMoveRight, IconCheckbox, IconCopy, IconDownload, IconEdit, IconFileSymlink, IconSquare, IconTrash } from "@tabler/icons-react";
import { useContext } from "react";
import useIconProps from "./useIconProps";
import { canConvertItemToTodo, canRefetchItem, canToggleItemShouldCopyOnClick } from "@/utils/itemUtils";

type ItemContextMenuOptionsParams = {
    item: Item,
    copyFn: ({item}: {item: Item}) => void,
    editFn: (item: Item) => void,
    moveFn: ({item, collectionList}: {item: Item, collectionList: ItemCollection[]}) => void,
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
        convertToTodoFn,
    }: ItemContextMenuOptionsParams
) {
    const { collections } = useContext(CollectionsContext);
    const { menuIconProps } = useIconProps();

    const contextMenuDefaultActionIcon = item.shouldCopyOnClick
        ? <IconCheckbox {...menuIconProps} />
        : <IconSquare {...menuIconProps} />

    const contextMenuOptions = [
        {
            key: "copy",
            icon: <IconCopy {...menuIconProps} />,
            onClick: () => {copyFn({item})}
        }, {
            key: "edit",
            icon: <IconEdit {...menuIconProps} />,
            onClick: () => {editFn(item)},
        }, {
            key: "move",
            icon: <IconFileSymlink {...menuIconProps} />,
            onClick: () => {moveFn({item, collectionList: collections})},
        }, {
            key: "delete",
            icon: <IconTrash {...menuIconProps} />,
            color: "red",
            onClick: () => {
                deleteFn({item});
                deselectFn();
            }
        }, {
            key: "refetch",
            title: "Refetch",
            hidden: !canRefetchItem(item),
            icon: <IconDownload {...menuIconProps} />,
            onClick: () => {refetchFn(item);}
        }, {
            key: "convertToTodo",
            title: "Convert to Todo",
            hidden: !canConvertItemToTodo(item),
            icon: <IconArrowMoveRight {...menuIconProps} />,
            color: "orange",
            onClick: () => {convertToTodoFn({item});}
        }, {
            key: "divider",
        }, {
            key: "togglePrimaryAction",
            title: "To copy",
            hidden: !canToggleItemShouldCopyOnClick(item),
            icon: contextMenuDefaultActionIcon,
            color: "blue",
            onClick: () => {toggleCopyFn({item})}
        }
    ];

    return contextMenuOptions;
};