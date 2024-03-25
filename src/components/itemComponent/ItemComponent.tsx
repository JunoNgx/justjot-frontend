// import styled from 'styled-components';

import { useContext } from "react";
import { Item, ItemType } from "@/types";
import { Center, Group, Paper, Text } from "@mantine/core";
import { IconCheckbox, IconCopy, IconDownload, IconEdit, IconFileSymlink,  IconSquare, IconTrash } from "@tabler/icons-react";
import { useContextMenu } from 'mantine-contextmenu';
import { justJotTheme } from "@/theme";
import useItemContextMenuActions from "@/hooks/useItemContextMenuActions";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import ItemComponentCreatedDate from "@/components/itemComponent/ItemComponentCreatedDate";
import ItemComponentIcon from "@/components/itemComponent/ItemComponentIcon";
import { MainViewContext } from "@/contexts/MainViewContext";

type ItemComponentParams = {
    item: Item,
    index: number,
}

export default function ItemComponent(
    { item, index }: ItemComponentParams
) {
    const { collections } = useContext(CollectionsContext);
    const { selectItem, deselectItem } = useContext(MainViewContext);
    const { showContextMenu } = useContextMenu();
    const {
        copyItemContent,
        openUpdateItemModal,
        openMoveItemModal,
        deleteWithManipulation,
        switchShouldOpenOnClick,
        refetchTitleAndFavicon
    } = useItemContextMenuActions();

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
            onClick: () => {copyItemContent(item)}
        }, {
            key: "edit",
            icon: <IconEdit
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            onClick: () => {openUpdateItemModal(item)},
        }, {
            key: "move",
            icon: <IconFileSymlink
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            onClick: () => {openMoveItemModal({item, collectionList: collections})},
        }, {
            key: "delete",
            icon: <IconTrash
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            color: "red",
            onClick: () => {deleteWithManipulation(item)}
        }, {
            key: "refetch",
            title: "Refetch",
            hidden: item.type !== ItemType.LINK,
            icon: <IconDownload
                size={justJotTheme.other.iconSizeMenu}
                stroke={justJotTheme.other.iconStrokeWidth}
            />,
            onClick: () => {refetchTitleAndFavicon(item);}
        }, {
            key: "divider",
        }, {
            key: "switchPrimaryAction",
            title: "To copy",
            icon: contextMenuDefaultActionIcon,
            color: "blue",
            onClick: () => {switchShouldOpenOnClick(item)}
        }
    ];

    const handlePrimaryAction = () => {
        if (item.shouldCopyOnClick) {
            copyItemContent(item);
            return;
        }

        if (item.type === ItemType.LINK) {
            window.open(item.content, "_blank");
            return;
        }

        openUpdateItemModal(item);
    };

    return <Paper className="item"
        p="xs"
        data-is-item={true}
        data-index={index}

        onMouseEnter={() => { selectItem(index)}}
        onMouseLeave={() => { deselectItem()}}
        onClick={handlePrimaryAction}
        onContextMenu={showContextMenu(
            contextMenuOptions,
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
                    <Center className="item__icon-wrapper">
                        <ItemComponentIcon
                            type={item.type}
                            faviconUrl={item.faviconUrl}
                            shouldCopyOnClick={item.shouldCopyOnClick}
                            firstSevenChars={item.content.substring(0, 7)}
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
