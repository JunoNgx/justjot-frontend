import { Item, ItemCollection } from "../types"
import { BackendClientContext } from "../contexts/BackendClientContext";
import { useContext } from "react";


export default function useContextMenuActions() {
    const { pbClient, fetchItems } = useContext(BackendClientContext);


    const copyItemContent = async (item: Item) => {

    }

    const openItemEditModal = async (item: Item) => {

    }

    const deleteItem = async (item: Item) => {

    }

    const openMoveItemModal = async (item: Item, collections: ItemCollection[]) => {

    }

    const refetchTitleAndFavicon = async (item: Item) => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}refetch/${item.id}`, {
            method: "POST"
        })
        .then(() => {
            fetchItems();
        });
    }

    const setShouldOpenOnClick = async (item: Item) => {
    
    }

    return {
        copyItemContent,
        openItemEditModal,
        deleteItem,
        openMoveItemModal,
        refetchTitleAndFavicon,
        setShouldOpenOnClick,
    } 
};