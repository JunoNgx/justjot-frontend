import { DbTable, Item, ItemCollection } from "../types"
import { BackendClientContext } from "../contexts/BackendClientContext";
import { useContext } from "react";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST } from "../utils/constants";
import { useClipboard } from "@mantine/hooks";
import { CurrentItemContext } from "../contexts/CurrentItemContext";
import { ItemsContext } from "../contexts/ItemsContext";
import { CurrentCollectionContext } from "../contexts/CurrentCollectionContext";
import { modals } from "@mantine/modals";
import ItemMoveModal from "../components/modals/ItemMoveModal";

type ItemMoveModalOptions = {
    item: Item | undefined,
    collectionList: ItemCollection[] | undefined
};

export default function useContextMenuActions() {
    const { pbClient, user } = useContext(BackendClientContext);
    const { currItem, setCurrItem } = useContext(CurrentItemContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { fetchItems } = useContext(ItemsContext);
    const clipboard = useClipboard({ timeout: 1000 });

    const copyItemContent = async (item: Item) => {
        clipboard.copy(item.content);
        notifications.show({
            message: "Copied item content",
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
                    autoClose: AUTO_CLOSE_DEFAULT,
                });
            })
            .catch(err => {
                console.error(err, { currItem });
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

    const switchShouldOpenOnClick = async () => {
        const newShouldCopyOnClickVal = !currItem!.shouldCopyOnClick;

        pbClient.collection(DbTable.ITEMS)
            .update(currItem!.id, {shouldCopyOnClick: newShouldCopyOnClickVal})
            .then((_record) => {
                const newValStr = newShouldCopyOnClickVal
                    ? "enabled"
                    : "disabled";
                fetchItems(currCollection);
                notifications.show({
                    message: "Copy as default item interaction: " + newValStr,
                    autoClose: AUTO_CLOSE_DEFAULT,
                });
            })
            .catch(err => {
                console.log(err, {itemId: currItem!.id});
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