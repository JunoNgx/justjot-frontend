import { BackendClientContext } from "@/contexts/BackendClientContext";
import { ItemsContext } from "@/contexts/ItemsContext";
import useManageListState from "@/libs/useManageListState";
import { CreateItemOptions, Item, ItemAction, ItemCollection, ItemType } from "@/types";
import { DateTime } from "luxon";
import { useContext } from "react";
import useItemApiCalls from "./useItemApiCalls";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
import { ClientResponseError } from "pocketbase";
import { useClipboard } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import ItemUpdateModal from "@/components/modals/ItemUpdateModal";
import ItemMoveModal from "@/components/modals/ItemMoveModal";
import { findIndexById } from "@/utils/itemUtils";
import { CollectionsContext } from "@/contexts/CollectionsContext";

export default function useItemActions() {

    const { user } = useContext(BackendClientContext);
    const { currCollection } = useContext(CollectionsContext);
    const { items, setItems, setUpdateQueue } = useContext(ItemsContext);
    const {
        createItem,
        deleteItem,
        toggleItemShouldCopyOnClick,
        toggleItemIsTodoDone,
        refetchLinkTitleAndFavicon,
        convertItemToTodo,
    } = useItemApiCalls();
    const itemsHandlers = useManageListState(setItems);
    const updateQueueHandlers = useManageListState(setUpdateQueue);

    const generatePlaceholderItem = (
        { title, content }: { title?: string, content?: string }
    ): Item => {
        const currDateTime = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");

        return {
            id: window.crypto.randomUUID(),
            owner: user?.id as string,
            collection: currCollection?.id as string,
            title: title as string,
            content: content as string,
            type: ItemType.TEXT as ItemType,
            shouldCopyOnClick: false as boolean,
            isTodoDone: false,
            faviconUrl: "",
            created: currDateTime,
            updated: currDateTime,
            isPending: true,
        };
    };

    const displayNotifItemNotReady = () => {
        notifications.show({
            message: "Item is not yet ready, please wait.",
            color: "none",
            autoClose: AUTO_CLOSE_DEFAULT,
        });
    };

    const createItemWithOptimisticUpdate = (
        { title, content }: CreateItemOptions
    ) => {
        const newTempItem = generatePlaceholderItem({
            title, content
        });
        itemsHandlers.prepend(newTempItem);

        createItem({
            title,
            content,
            successfulCallback: (record: Item) => {
                updateQueueHandlers.append({
                    tempId: newTempItem.id,
                    item: record,
                })
            },
            errorCallback: (err: ClientResponseError) => {
                console.error(err);
                notifications.show({
                    message: "Error creating new item",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            },
        });
    };

    const deleteItemWithOptimisticUpdate = (
        { item }: { item: Item }
    ) => {
        if (item.isPending) {
            displayNotifItemNotReady();
            return;
        }

        const index = findIndexById(item.id, items)
        if (index === -1) return;
        itemsHandlers.remove(index);

        deleteItem({
            item,
            successfulCallback: () => {
                notifications.show({
                    message: "Item deleted successfully",
                    color: "none",
                    autoClose: AUTO_CLOSE_DEFAULT,
                });
            },
            errorCallback: (err: ClientResponseError) => {
                console.error(err);
                notifications.show({
                    message: "Error deleting item",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            },
        });
    };

    const toggleItemShouldCopyOnClickWithOptimisticUpdate = (
        { item }: { item: Item }
    ) => {
        if (item.isPending) {
            displayNotifItemNotReady();
            return;
        }

        const newShouldCopyOnClickVal = !item.shouldCopyOnClick;

        const index = findIndexById(item.id, items)
        if (index === -1) return;
        itemsHandlers.replace(
            index,
            {...item, shouldCopyOnClick: newShouldCopyOnClickVal}
        );

        toggleItemShouldCopyOnClick({
            item,
            shouldCopyOnClick: newShouldCopyOnClickVal,
            successfulCallback: (record: Item) => {
                const index = findIndexById(item.id, items)
                if (index === -1) return;
                itemsHandlers.replace(index, record);
            },
            errorCallback: (err: ClientResponseError) => {
                console.error(err);
                notifications.show({
                    message: "Error toggling copy as primary action",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            },
        })
    };

    const toggleItemIsTodoDoneWithOptimisticUpdate = (
        { item }: { item: Item }
    ) => {
        if (item.isPending) {
            displayNotifItemNotReady();
            return;
        }

        const newIsTodoDoneVal = !item.isTodoDone;

        const index = findIndexById(item.id, items)
        if (index === -1) return;
        itemsHandlers.replace(
            index,
            {...item, isTodoDone: newIsTodoDoneVal}
        );

        toggleItemIsTodoDone({
            item,
            isTodoDone: newIsTodoDoneVal,
            successfulCallback: (record: Item) => {
                const index = findIndexById(item.id, items)
                if (index === -1) return;
                itemsHandlers.replace(index, record);
            },
            errorCallback: (err: ClientResponseError) => {
                console.error(err);
                notifications.show({
                    message: "Error toggling todo task status",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            },
        })
    };

    const clipboard = useClipboard({ timeout: 1000 });
    const copyItemContent = async (item: Item) => {
        item.type === ItemType.TODO
            ? clipboard.copy(item.title)
            : clipboard.copy(item.content);

        notifications.show({
            message: "Copied item content",
            color: "none",
            autoClose: AUTO_CLOSE_DEFAULT,
        });
    }

    const openUpdateItemModal = (item: Item) => {
        if (item.isPending) {
            displayNotifItemNotReady();
            return;
        }

        modals.open({
            title: "Edit item",
            centered: true,
            size: "50rem",
            children: (<ItemUpdateModal
                item={item}
            />),
        });
    };

    const openCreateItemModal = (title: string) => {
        modals.openContextModal({
            modal: "itemCreateModal",
            title: "Create item",
            centered: true,
            size: "50rem",
            closeOnEscape: false,
            closeOnClickOutside: false,
            withCloseButton: false,
            innerProps: {
                passedTitle: title
            }
        });
    };

    const openMoveItemModal = async (
        {item, collectionList}: {item: Item, collectionList: ItemCollection[] }
    ) => {
        if (item.isPending) {
            displayNotifItemNotReady();
            return;
        }

        if (!item || collectionList.length === 0) {
            notifications.show({
                message: "Requested moving item, but received missing data",
                color: "red",
                autoClose: AUTO_CLOSE_ERROR_TOAST,
                withCloseButton: true,
            });
            return;
        }

        modals.open({
            centered: true,
            size: "sm",
            title: "Move to another collection",
            children: <ItemMoveModal
                item={item}
                collectionList={collectionList}
            />
        });
    }

    const refetchLink = async (item: Item) => {
        if (item.isPending) {
            displayNotifItemNotReady();
            return;
        }

        refetchLinkTitleAndFavicon({
            item,
            successfulCallback: (record: Item) => {
                const index = findIndexById(item.id, items)
                if (index === -1) return;
                itemsHandlers.replace(index, record);
            },
        })
    };

    const convertToTodo = async ({item}: {item: Item}) => {
        if (item.isPending) {
            displayNotifItemNotReady();
            return;
        }

        convertItemToTodo({
            item,
            successfulCallback: (record: Item) => {
                console.log("convert", record)
                const index = findIndexById(item.id, items)
                if (index === -1) return;
                itemsHandlers.replace(index, record);

                notifications.show({
                    message: "Item successfully converted to Todo task",
                    color: "none",
                    autoClose: AUTO_CLOSE_DEFAULT,
                });
            },
            errorCallback: (err: ClientResponseError) => {
                console.error(err);
                notifications.show({
                    message: "Error converting item to todo",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            },
        });
    };

    const computeItemPrimaryAction = (item: Item): ItemAction => {
        switch (true) {
        case (item.type === ItemType.TODO):
            return ItemAction.TOGGLE_IS_DONE;
        case (item.shouldCopyOnClick):
            return ItemAction.COPY;
        case (item.type === ItemType.LINK):
            return ItemAction.OPEN_LINK;
        default:
            return ItemAction.EDIT;
        };
    };

    return {
        createItemWithOptimisticUpdate,
        deleteItemWithOptimisticUpdate,
        copyItemContent,
        openCreateItemModal,
        openUpdateItemModal,
        openMoveItemModal,
        refetchLink,
        toggleItemShouldCopyOnClickWithOptimisticUpdate,
        toggleItemIsTodoDoneWithOptimisticUpdate,
        convertToTodo,
        computeItemPrimaryAction,
    }
};