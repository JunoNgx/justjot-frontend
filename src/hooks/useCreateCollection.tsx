import { useContext, useState } from "react";
import { BackendClientContext } from "../contexts/BackendClientContext";
import { DbTable, ItemCollection } from "../types";
import { notifications } from "@mantine/notifications";

type createCollectionOptions = {
    name: string,
    slug: string,
};

type useCreateCollectionOptions = {
    successfulCallback?: () => {},
    errorCallback?: () => {},
}

export default function useCreateCollection({ successfulCallback, errorCallback }: useCreateCollectionOptions) {

    const { pbClient } = useContext(BackendClientContext);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const createCollection = async ({ name, slug }: createCollectionOptions) => {
        setIsLoading(true);
        await pbClient.collection(DbTable.COLLECTIONS)
            .create({ name, slug })
            .then((_record: ItemCollection) => {
                setIsSuccessful(true);
                successfulCallback?.();
            })
            .catch(err => {
                errorCallback?.();
                console.error(err);
                notifications.show({
                    message: "Error creating new Collection",
                    color: "red",
                    autoClose: false,
                    withCloseButton: true,
                });
            });
        
        setIsLoading(false);
    };

    return {
        createCollection,
        isSuccessful,
        isLoading,
    };
};
