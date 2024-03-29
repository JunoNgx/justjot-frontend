import { useContext } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { DbTable, RequestCallbackOptions, Item } from "@/types";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";

type UpdateItemTitleOptions = {
    itemId: string,
    title: string,
} & RequestCallbackOptions;

type UpdateItemContentOptions = {
    itemId: string,
    content: string,
} & RequestCallbackOptions;

type UpdateItemTitleAndContentOptions = {
    itemId: string,
    title: string,
    content: string,
} & RequestCallbackOptions;

type useUpdateItemReturnType = {
    updateItemTitle: (options: UpdateItemTitleOptions) => Promise<void>,
    updateItemContent: (options: UpdateItemContentOptions) => Promise<void>,
    updateItemTitleAndContent: (options: UpdateItemTitleAndContentOptions) => Promise<void>,
};

export default function useUpdateItem(): useUpdateItemReturnType {

    const { pbClient } = useContext(BackendClientContext);

    const updateItemTitle = async (
        { itemId, title, successfulCallback, errorCallback }: UpdateItemTitleOptions
    ) => {
        pbClient.collection(DbTable.ITEMS)
            .update(itemId, { title })
            .then((_record: Item) => {
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err);
                if (!err.isAbort) {
                    console.warn("Non cancellation error")
                }
                notifications.show({
                    message: "Error autosaving title",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
    };

    const updateItemContent = async (
        { itemId, content, successfulCallback, errorCallback }: UpdateItemContentOptions
    ) => {
        pbClient.collection(DbTable.ITEMS)
            .update(itemId, { content })
            .then((_record: Item) => {
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err);
                if (!err.isAbort) {
                    console.warn("Non cancellation error")
                }
                notifications.show({
                    message: "Error autosaving content",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
    };

    const updateItemTitleAndContent = async (
        { itemId, title, content, successfulCallback, errorCallback }: UpdateItemTitleAndContentOptions
    ) => {
        pbClient
            .collection(DbTable.ITEMS)
            .update(itemId,
                { title, content },
                // { requestKey: null }, // This disables auto-cancel from PbClient
                { requestKey: "item-update-both" }
            )
            .then((_record: Item) => {
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err);

                if (!err.isAbort) {
                    console.warn("Non cancellation error")
                }
                notifications.show({
                    message: "Error autosaving upon exiting item edit modal",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
    };

    return {
        updateItemTitle,
        updateItemContent,
        updateItemTitleAndContent,
    };
};
