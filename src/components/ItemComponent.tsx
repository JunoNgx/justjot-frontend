// import styled from 'styled-components';

import { useContext, useState } from "react";
import { Item, ItemType } from "../types";
import { calculatePriText, processDatetime } from "../utils/itemUtils";
import { Center, Group, Image, Kbd, Modal, Paper, Text } from "@mantine/core";
import { IconCheckbox, IconCopy, IconDownload, IconEdit, IconFileSymlink, IconNote, IconNotes, IconSquare, IconTrash, IconWorld } from "@tabler/icons-react";
import { isValidUrl } from "../utils/misc";
import { useContextMenu } from 'mantine-contextmenu';
import { justJotTheme } from "../theme";
import useContextMenuActions from "../hooks/useContextMenuActions";
import ItemUpdateModal from "./modals/ItemUpdateModal";
import { useDisclosure } from "@mantine/hooks";
import { ItemsContext } from "../contexts/ItemsContext";
import { CurrentCollectionContext } from "../contexts/CurrentCollectionContext";
import { CollectionsContext } from "../contexts/CollectionsContext";

type ItemComponentOptions = {
    item: Item,
    index: number,
}

export default function ItemComponent({ item, index}: ItemComponentOptions) {

    // const { currItem, setCurrItem } = useContext(CurrentItemContext)
    const { currCollection } = useContext(CurrentCollectionContext);
    const { collections } = useContext(CollectionsContext);
    const { fetchItems } = useContext(ItemsContext);
    const { showContextMenu } = useContextMenu();

    const [isItemUpdateOpened, {
        open: openItemUpdate,
        close: closeItemUpdate }] = useDisclosure(false);

    const closeItemUpdateModal = () => {
        closeItemUpdate();
        setTimeout(() => {fetchItems(currCollection)}, 500);
    }
    // useEffect(() => {
    //     if (!currItem) {
    //         setIsFocused(false);
    //         return;
    //     }

    //     setIsFocused(currItem.id === item.id);
    // }, [currItem]);

    const [isFocused, setIsFocused] = useState(false);
    const { relativeDatetime, fullDatetime } = processDatetime(item);
    const {
        copyItemContent,
        openMoveItemModal,
        deleteItem,
        switchShouldOpenOnClick,
        refetchTitleAndFavicon
    } = useContextMenuActions();

    const contextMenuDefaultActionIcon = item.shouldCopyOnClick
        ? <IconCheckbox
            size={justJotTheme.other.iconSizeMenu}
            stroke={justJotTheme.other.iconStrokeWidth}
        />
        : <IconSquare
            size={justJotTheme.other.iconSizeMenu}
            stroke={justJotTheme.other.iconStrokeWidth}
        />
    const icon = computeIcon(item);    
    // const isFocused = currItem?.id === item.id;

    const itemUpdateModal = <Modal
        centered
        size={512}
        opened={isItemUpdateOpened}
        onClose={closeItemUpdateModal}
        title="Edit item"
    >
        <ItemUpdateModal item={item}/>
    </Modal>

    return <Paper className={"item " + (isFocused ? "item--is-active" : "")}
        data-is-focused={isFocused}
        data-index={index}
        p="xs"
        onMouseEnter={() => { setIsFocused(true) }}
        onMouseLeave={() => { setIsFocused(false) }}
        // onMouseEnter={() => { setCurrItem(item) }}
        // onMouseLeave={() => { setCurrItem(undefined) }}
        onContextMenu={showContextMenu(
            [
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
                    onClick: () => {openItemUpdate()},
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
                    onClick: () => {switchShouldOpenOnClick()}
                }
            ],
            { className: "dropdown-menu" }
        )}
    >
        <Group className="item__flex-wrapper"
            justify="space-between"
            wrap="nowrap"
        >
            <Group className="item__left-side"
                justify="flex-start"
                wrap="nowrap"
            >
                <Center className="item__icon-wrapper">{icon}</Center>
                {item.title && <Text className="item__primary-text"
                    title={item.title}
                >
                    {calculatePriText(item)}
                </Text>}
                {item.content&& <Text className="item__secondary-text"
                    c="dimmed"
                    title={item.content}
                >
                    {item.content}
                </Text>}
            </Group>
            <Group className="item__right-side">
                <Text
                    className="item__datetime"
                    title={fullDatetime}
                >
                    {relativeDatetime}
                </Text>
            </Group>
        </Group>

        {itemUpdateModal}
    </Paper>
};

const computeIcon = (item: Item) => {
    switch (item.type) {
        case ItemType.LINK:
            return item.faviconUrl && isValidUrl(item.faviconUrl)
                ? <Image h={24} src={item.faviconUrl}/>
                : <IconWorld
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
        case ItemType.TEXT:
        default:
            return item.shouldCopyOnClick
                ? <IconNote
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
                : <IconNotes
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
    }
}