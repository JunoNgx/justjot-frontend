// import styled from 'styled-components';

import { useContext } from "react";
import { Item, ItemType } from "@/types";
import { Box, Center, Group, Text } from "@mantine/core";
import { IconCheckbox, IconCopy, IconDownload, IconEdit, IconFileSymlink,  IconSquare, IconTrash } from "@tabler/icons-react";
import { useContextMenu } from '@/libs/mantine-contextmenu';
import { justJotTheme } from "@/theme";
import useItemContextMenuActions from "@/hooks/useItemContextMenuActions";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import ItemComponentCreatedDate from "@/components/itemComponent/ItemComponentCreatedDate";
import ItemComponentIcon from "@/components/itemComponent/ItemComponentIcon";
import { MainViewContext } from "@/contexts/MainViewContext";
import useLongPress from "@/libs/useLongPress";

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
        deleteItemWithManipulation,
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
            onClick: () => {
                deleteItemWithManipulation(item);
                deselectItem();
            }
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

    const handlePrimaryAction = (
        _e: React.MouseEvent | React.TouchEvent
    ) => {
        // console.log("handle primary click")
        if (item.shouldCopyOnClick) {
            copyItemContent(item);
            return;
        }

        if (item.type === ItemType.LINK) {
            // Let the <a> tag handle the click
            // window.open(item.content, "_blank");
            return;
        }

        openUpdateItemModal(item);
    };

    const handleSecondaryAction = (
        e: React.MouseEvent | React.TouchEvent
    ) => {
        // console.log("handle secondary click")
        const handleEventWithContextMenu = showContextMenu(
            contextMenuOptions,
            { className: "dropdown-menu" }
        )
        handleEventWithContextMenu(e as
            React.MouseEvent
            & React.TouchEvent
        );
    };

    const longPressEvent = useLongPress({
        onClick: handlePrimaryAction,
        onLongPress: handleSecondaryAction,
    }, {
        delay: 800,
    });

    const isLink = item.type === ItemType.LINK;
    const anchorProps = isLink
    ? {
        component: "a" as any,
        href: item.content,
        rel: "noopener noreferrer",
        target: "_blank",
    }
    : {};

    return <Box
        {...anchorProps}

        className={computeClassnames(item)}
        p="xs"
        data-is-item={true}
        data-index={index}
        {...longPressEvent}

        onMouseEnter={() => { selectItem(index)}}
        onMouseLeave={() => { deselectItem()}}
        // onClick={handlePrimaryAction}
        // onContextMenu={showContextMenu(
        //     contextMenuOptions,
        //     { className: "dropdown-menu" }
        // )}
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

        </Box>
};

const computeClassnames = (item: Item) => {
    const noPrimaryTextModifier = item.title
        ? " "
        : "item--has-no-primary-text";
    const noSecondaryTextModifier = item.content
        ? " "
        : "item--has-no-secondary-text";

    return "item "
        + noPrimaryTextModifier
        + noSecondaryTextModifier;
}