import { useContext, useState } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { DbTable, RequestCallbackOptions, Item, ItemType, ItemCreateUpdateType } from "@/types";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { ItemsContext } from "@/contexts/ItemsContext";
import { DateTime } from "luxon";

type useCreateItemReturnType = [
    ({ content }: { content: string }) => Promise<void>,
    ({ title, content }: ItemCreateUpdateType) => void,
    boolean,
    boolean,
];

export default function useCreateItem(
    { successfulCallback, errorCallback }: RequestCallbackOptions = {}
): useCreateItemReturnType {

    const { pbClient, user } = useContext(BackendClientContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { items, setItems } = useContext(ItemsContext);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const createItem = async ({ title, content }: ItemCreateUpdateType) => {
        setIsLoading(true);
        pbClient.collection(DbTable.ITEMS)
            .create({
                owner: user!.id,
                collection: currCollection!.id,
                title,
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

    const generatePlaceholderItem = (
        { title, content }: ItemCreateUpdateType
    ): Item => {
        const currDateTime = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
        console.log(currDateTime)

        return {
            id: new Date().getTime().toString(),
            owner: user?.id as string,
            collection: currCollection?.id as string,
            title: title as string,
            content: content as string,
            type: ItemType.TEXT as ItemType,
            shouldCopyOnClick: false as boolean,
            faviconUrl: "",
            created: currDateTime,
            updated: currDateTime,
        };
    };

    const createItemWithManipulation = (
        { title, content }: ItemCreateUpdateType
    ) => {
        const newItem = generatePlaceholderItem({title, content});
        setItems([newItem, ...items || []]);
        createItem({ content });
    };

    return [
        createItem,
        createItemWithManipulation,
        isLoading,
        isSuccessful,
    ];
};
