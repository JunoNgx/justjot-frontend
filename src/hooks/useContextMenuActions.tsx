import { DbTable, Item } from "../types"
import { BackendClientContext } from "../contexts/BackendClientContext";
import { useContext } from "react";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST } from "../utils/constants";
import { useClipboard } from "@mantine/hooks";


export default function useContextMenuActions() {
    const { pbClient, currItem, fetchItems } = useContext(BackendClientContext);
    const clipboard = useClipboard({ timeout: 1000 })

    const copyItemContent = async () => {
        clipboard.copy(currItem?.content);
        notifications.show({
            message: "Copied item content",
            autoClose: AUTO_CLOSE_DEFAULT,
        });
    }

    const openItemEditModal = async () => {

    }

    const openMoveItemModal = async () => {

    }

    const deleteItem = async () => {

    }

    const refetchTitleAndFavicon = async () => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}refetch/${currItem!.id}`, {
            method: "POST"
        })
        .then(() => {
            fetchItems();
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
                fetchItems();
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
        openItemEditModal,
        deleteItem,
        openMoveItemModal,
        refetchTitleAndFavicon,
        switchShouldOpenOnClick,
    } 
};