import { CollectionsContext } from "@/contexts/CollectionsContext";
import { justJotTheme } from "@/theme";
import { Item, ItemCollection, ItemType } from "@/types";
import { IconCheckbox, IconCopy, IconDownload, IconEdit, IconFileSymlink, IconSquare, IconTrash } from "@tabler/icons-react";
import { useContext } from "react";

type ItemContextMenuOptionsParams = {
    item: Item,
    copyFn: (item: Item) => void,
    editFn: (item: Item) => void,
    moveFn: ({item, collectionList}: {item: Item, collectionList: ItemCollection[]}) => void,
    deleteFn: ({item}: {item: Item}) => void,
    refetchFn: (item: Item) => void,
    toggleCopyFn: ({item}: {item: Item}) => void,
    deselectFn: () => void,
};

export default function useItemContextMenuOptions(
    { item, copyFn, editFn, moveFn, deleteFn, refetchFn, toggleCopyFn, deselectFn }:
    ItemContextMenuOptionsParams
) {
    const { collections } = useContext(CollectionsContext);


    const contextMenuDefaultActionIcon = item.shouldCopyOnClick
        ? <IconCheckbox
            size={justJotTheme.other.iconSizeMenu}
            stroke={justJotTheme.other.iconStrokeWidth}
        />
        : <IconSquare
            size={justJotTheme.other.iconSizeMenu}
            stroke={justJotTheme.other.iconStrokeWidth}
        />

    const contextMenuOptions = [
        {
            key: "copy",
            icon: <IconCopy
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            onClick: () => {copyFn(item)}
        }, {
            key: "edit",
            icon: <IconEdit
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            onClick: () => {editFn(item)},
        }, {
            key: "move",
            icon: <IconFileSymlink
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            onClick: () => {moveFn({item, collectionList: collections})},
        }, {
            key: "delete",
            icon: <IconTrash
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            color: "red",
            onClick: () => {
                deleteFn({item});
                deselectFn();
            }
        }, {
            key: "refetch",
            title: "Refetch",
            hidden: item.type !== ItemType.LINK,
            icon: <IconDownload
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            onClick: () => {refetchFn(item);}
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