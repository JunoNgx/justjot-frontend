import { useContext, useState } from "react";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { DbTable, RequestCallbackOptions, Item } from "../types";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "../utils/constants";

type useCreateItemReturnType = [
    ({ content }: { content: string }) => Promise<void>,
    boolean,
    boolean,
];

export default function useCreateItem(
    { successfulCallback, errorCallback }: RequestCallbackOptions = {}
): useCreateItemReturnType {

    const { pbClient, currCollection, user } = useContext(BackendClientContext);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const createItem = async ({ content }: { content: string }) => {
        setIsLoading(true);
        pbClient.collection(DbTable.ITEMS)
            .create({
                owner: user!.id,
                collection: currCollection!.id,
                content,
            })
            .then((_record: Item) => {
                setIsSuccessful(true);
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err);
                notifications.show({
                    message: "Error creating new item",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
        setIsLoading(false);
    };

    return [
        createItem,
        isLoading,
        isSuccessful,
    ];
};
