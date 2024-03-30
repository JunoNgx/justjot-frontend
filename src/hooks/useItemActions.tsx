import { BackendClientContext } from "@/contexts/BackendClientContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { ItemsContext } from "@/contexts/ItemsContext";
import useManageListState from "@/libs/useManageListState";
import { CreateItemOptions, Item, ItemType } from "@/types";
import { DateTime } from "luxon";
import { useContext } from "react";
import useItemApiCalls from "./useItemApiCalls";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
import { ClientResponseError } from "pocketbase";

export default function useItemActions() {

    const { user } = useContext(BackendClientContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { setItems, setUpdateQueue } = useContext(ItemsContext);
    const { createItem } = useItemApiCalls();
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
        };
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

    return {
        createItemWithOptimisticUpdate,
    }
};