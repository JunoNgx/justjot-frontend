import { useContext, useState } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { DbTable, RequestCallbackOptions, Item } from "@/types";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";

type MoveItemOptions = {
    itemId: string,
    collectionId: string,
};

type useUpdateItemReturnType = [
    moveItemToCollection: (options: MoveItemOptions) => Promise<void>,
    isLoading: boolean,
];

export default function useMoveItem(
    { successfulCallback, errorCallback }: RequestCallbackOptions = {}
): useUpdateItemReturnType {

    const { pbClient } = useContext(BackendClientContext);
    const [ isLoading, setIsLoading ] = useState(false);

    const moveItemToCollection = async ({ itemId, collectionId }: MoveItemOptions) => {
        setIsLoading(true);
        pbClient
            .collection(DbTable.ITEMS)
            .update(itemId, { collection: collectionId })
            .then((_record: Item) => {
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err);
                notifications.show({
                    message: "Error moving item",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            });
        setIsLoading(false);
    };

    return [
        moveItemToCollection,
        isLoading
    ];
};
