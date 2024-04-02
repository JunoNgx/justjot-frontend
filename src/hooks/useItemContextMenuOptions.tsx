import { CollectionsContext } from "@/contexts/CollectionsContext";
import { Item, ItemCollection, ItemType } from "@/types";
import { IconArrowMoveRight, IconCheckbox, IconCopy, IconDownload, IconEdit, IconFileSymlink, IconSquare, IconTrash } from "@tabler/icons-react";
import { useContext } from "react";
import useIconPropsFromTheme from "./useIconPropsFromTheme";

type ItemContextMenuOptionsParams = {
    item: Item,
    copyFn: (item: Item) => void,
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
    const iconProps = useIconPropsFromTheme();

    const contextMenuDefaultActionIcon = item.shouldCopyOnClick
        ? <IconCheckbox {...iconProps} />
        : <IconSquare {...iconProps} />

    const contextMenuOptions = [
        {
            key: "copy",
            icon: <IconCopy {...iconProps} />,
            onClick: () => {copyFn(item)}
        }, {
            key: "edit",
            icon: <IconEdit {...iconProps} />,
            onClick: () => {editFn(item)},
        }, {
            key: "move",
            icon: <IconFileSymlink {...iconProps} />,
            onClick: () => {moveFn({item, collectionList: collections})},
        }, {
            key: "delete",
            icon: <IconTrash {...iconProps} />,
            color: "red",
            onClick: () => {
                deleteFn({item});
                deselectFn();
            }
        }, {
            key: "refetch",
            title: "Refetch",
            hidden: item.type !== ItemType.LINK,
            icon: <IconDownload {...iconProps} />,
            onClick: () => {refetchFn(item);}
        }, {
            key: "convertToTodo",
            title: "Convert to Todo",
            hidden: item.title || !item.content || item.type !== ItemType.TEXT,
            icon: <IconArrowMoveRight {...iconProps} />,
            color: "orange",
            onClick: () => {convertToTodoFn({item});}
        }, {
            key: "divider",
        }, {
            key: "togglePrimaryAction",
            title: "To copy",
            hidden: item.type === ItemType.TODO,
            icon: contextMenuDefaultActionIcon,
            color: "blue",
            onClick: () => {toggleCopyFn({item})}
        }
    ];

    return contextMenuOptions;
};