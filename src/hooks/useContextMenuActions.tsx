import { DbTable, Item, ItemCollection } from "src/types"
import { BackendClientContext } from "src/contexts/BackendClientContext";
import { useContext } from "react";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST } from "src/utils/constants";
import { useClipboard } from "@mantine/hooks";
import { CurrentItemContext } from "src/contexts/CurrentItemContext";
import { ItemsContext } from "src/contexts/ItemsContext";
import { CurrentCollectionContext } from "src/contexts/CurrentCollectionContext";
import { modals } from "@mantine/modals";
import ItemMoveModal from "src/components/modals/ItemMoveModal";

type ItemMoveModalOptions = {
    item: Item | undefined,
    collectionList: ItemCollection[] | undefined
};

export default function useContextMenuActions() {
    const { pbClient, user } = useContext(BackendClientContext);
    const { setCurrItem } = useContext(CurrentItemContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { fetchItems } = useContext(ItemsContext);
    const clipboard = useClipboard({ timeout: 1000 });

    const copyItemContent = async (item: Item) => {
        clipboard.copy(item.content);
        notifications.show({
            message: "Copied item content",
            color: "none",
            autoClose: AUTO_CLOSE_DEFAULT,
        });
    }

    const openMoveItemModal = async ({item, collectionList}: ItemMoveModalOptions) => {
        if (!item || !collectionList) {
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

    const deleteItem = async (item: Item) => {
        if (!item) {
            notifications.show({
                message: "No item was selected for deletion",
                color: "red",
                autoClose: AUTO_CLOSE_DEFAULT,
                withCloseButton: true,
            });
            return;
        }
        
        await pbClient.collection(DbTable.ITEMS)
            .delete(item.id)
            .then((_isSuccessful: boolean) => {
                setCurrItem(undefined);
                fetchItems(currCollection);
                notifications.show({
                    message: "Item deleted",
                    color: "none",
                    autoClose: AUTO_CLOSE_DEFAULT,
                });
            })
            .catch(err => {
                console.error(err, { item });
                notifications.show({
                    message: "Error deleting item",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
    }

    const refetchTitleAndFavicon = async (item: Item) => {
        if (!item) {
            notifications.show({
                message: "No link item was selected for refetch",
                color: "red",
                autoClose: AUTO_CLOSE_DEFAULT,
                withCloseButton: true,
            });
            return;
        }
    
        await fetch(`${import.meta.env.VITE_BACKEND_URL}refetch/${user!.id}/${item!.id}`, {
            method: "PATCH",
            headers: {
                authorization: pbClient.authStore.token
            },
        })
        .then(() => {
            fetchItems(currCollection);
        });
    }

    const switchShouldOpenOnClick = async (item: Item) => {
        const newShouldCopyOnClickVal = !item.shouldCopyOnClick;

        pbClient.collection(DbTable.ITEMS)
            .update(item.id, {shouldCopyOnClick: newShouldCopyOnClickVal})
            .then((_record) => {
                fetchItems(currCollection);
                notifications.show({
                    message: newShouldCopyOnClickVal
                        ? "Primary action set: copy"
                        : "Primary action set: edit",
                    color: "none",
                    autoClose: AUTO_CLOSE_DEFAULT,
                });
            })
            .catch(err => {
                console.log(err, {itemId: item.id});
                notifications.show({
                    message: "Error setting default action to item",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            })
    }

    return {
        copyItemContent,
        deleteItem,
        openMoveItemModal,
        refetchTitleAndFavicon,
        switchShouldOpenOnClick,
    } 
};