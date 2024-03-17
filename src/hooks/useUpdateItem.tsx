import { useContext } from "react";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { DbTable, RequestCallbackOptions, Item } from "../types";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "../utils/constants";

type UpdateItemTitleOptions = {
    itemId: string,
    title: string,
};

type UpdateItemContentOptions = {
    itemId: string,
    content: string,
};

type useUpdateItemReturnType = [
    (options: UpdateItemTitleOptions) => Promise<void>,
    (options: UpdateItemContentOptions) => Promise<void>,
];

export default function useUpdateItem(
    { successfulCallback, errorCallback }: RequestCallbackOptions = {}
): useUpdateItemReturnType {

    const { pbClient } = useContext(BackendClientContext);

    const updateItemTitle = async ({ itemId, title }: UpdateItemTitleOptions) => {
        pbClient.collection(DbTable.ITEMS)
            .update(itemId, { title })
            .then((_record: Item) => {
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err);
                notifications.show({
                    message: "Error autosaving title",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
    };

    const updateItemContent = async ({ itemId, content }: UpdateItemContentOptions) => {
        pbClient.collection(DbTable.ITEMS)
            .update(itemId, { content })
            .then((_record: Item) => {
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err);
                notifications.show({
                    message: "Error autosaving content",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
    };

    return [
        updateItemTitle,
        updateItemContent,
    ];
};
