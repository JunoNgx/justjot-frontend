// import styled from 'styled-components';

import { useContext, useState } from "react";
import { Item, ItemType } from "../types";
import { Center, Group, Kbd, Modal, Paper, Text } from "@mantine/core";
import { IconCheckbox, IconCopy, IconDownload, IconEdit, IconFileSymlink,  IconSquare, IconTrash } from "@tabler/icons-react";
import { useContextMenu } from 'mantine-contextmenu';
import { justJotTheme } from "../theme";
import useContextMenuActions from "../hooks/useContextMenuActions";
import ItemUpdateModal from "./modals/ItemUpdateModal";
import { useDisclosure } from "@mantine/hooks";
import { ItemsContext } from "../contexts/ItemsContext";
import { CurrentCollectionContext } from "../contexts/CurrentCollectionContext";
import { CollectionsContext } from "../contexts/CollectionsContext";
import ItemComponentCreatedDate from "./ItemComponentCreatedDate";
import ItemComponentIcon from "./ItemComponentIcon";
import { CurrentItemContext } from "../contexts/CurrentItemContext";

type ItemComponentOptions = {
    item: Item,
    index: number,
    openItemUpdate: (item: Item) => void,
}

export default function ItemComponent({ item, index, openItemUpdate}: ItemComponentOptions) {

    // const { currItem, setCurrItem } = useContext(CurrentItemContext)
    const { currCollection } = useContext(CurrentCollectionContext);
    const { collections } = useContext(CollectionsContext);
    const { fetchItems } = useContext(ItemsContext);
    const { currItem, setCurrItem } = useContext(CurrentItemContext);
    const { showContextMenu } = useContextMenu();

    const {
        copyItemContent,
        openMoveItemModal,
        deleteItem,
        switchShouldOpenOnClick,
        refetchTitleAndFavicon
    } = useContextMenuActions();


    // useEffect(() => {
    //     if (!currItem) {
    //         setIsFocused(false);
    //         return;
    //     }

    //     setIsFocused(currItem.id === item.id);
    // }, [currItem]);

    // const [isFocused, setIsFocused] = useState(false);

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
            iconRight: <Kbd>C</Kbd>,
            onClick: () => {copyItemContent(item)}
        }, {
            key: "edit",
            icon: <IconEdit
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            iconRight: <Kbd>E</Kbd>,
            // onClick: () => {},
            onClick: () => {openItemUpdate(item)},
        }, {
            key: "move",
            icon: <IconFileSymlink
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            iconRight: <Kbd>M</Kbd>,
            onClick: () => {openMoveItemModal({item, collectionList: collections})},
        }, {
            key: "delete",
            icon: <IconTrash
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            iconRight: <Kbd>Del</Kbd>,
            color: "red",
            onClick: () => {deleteItem(item)}
        }, {
            key: "refetch link",
            icon: <IconDownload
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            onClick: () => {refetchTitleAndFavicon(item);}
        }, {
            key: "divider",
        }, {
            key: "Copy on click",
            icon: contextMenuDefaultActionIcon,
            color: "blue",
            onClick: () => {switchShouldOpenOnClick(item)}
        }
    ];

    const handleDefaultAction = () => {

        if (item.shouldCopyOnClick) {
            copyItemContent(item);
            return;
        }

        if (item.type === ItemType.LINK) {
            window.open(item.content, "_blank");
            return;
        }

        item.shouldCopyOnClick
            openItemUpdate(item);
    };

    const isFocused = currItem?.id === item.id;

    const props = {
        className: "item " + (isFocused ? "item--is-active" : ""),
        "data-is-focused": isFocused,
        "data-index": index,
        "p": "xs",
        // "onMouseEnter": () => { setIsFocused(true) },
        // "onMouseLeave": () => { setIsFocused(false) },
        "onMouseEnter": () => { setCurrItem(item) },
        // "onMouseLeave": () => { setCurrItem(undefined) },
        "onClick": handleDefaultAction,
        "onContextMenu": showContextMenu(
            contextMenuOptions,
            { className: "dropdown-menu" }
        ),
    };

    return <Paper {...props}>
            <Group className="item__flex-wrapper"
                justify="space-between"
                wrap="nowrap"
            >
                <Group className="item__left-side"
                    justify="flex-start"
                    wrap="nowrap"
                >
                    <Center className="item__icon-wrapper">
                        <ItemComponentIcon
                            type={item.type}
                            faviconUrl={item.faviconUrl}
                            shouldCopyOnClick={item.shouldCopyOnClick}
                        />
                    </Center>
                    {item.title && <Text className="item__primary-text"
                        title={item.title}
                    >
                        {item.title}
                    </Text>}
                    {item.content&& <Text className="item__secondary-text"
                        c="dimmed"
                        title={item.content}
                    >
                        {item.content}
                    </Text>}
                </Group>
                <Group className="item__right-side">
                    <ItemComponentCreatedDate className="item__datetime"
                        createdDatetime={item.created}
                    />
                </Group>
            </Group>

        </Paper>
};
