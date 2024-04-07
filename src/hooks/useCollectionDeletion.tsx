import { useContext, useEffect, useState } from "react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
import { IconExclamationCircle } from "@tabler/icons-react";
import { justJotTheme } from "@/theme";
import { Text } from "@mantine/core";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import useCollectionApiCalls from "./useCollectionApiCalls";
import { ClientResponseError } from "pocketbase";
import useCollectionNavActions from "./useCollectionNavActions";
import useManageListState from "@/libs/useManageListState";

export default function useCollectionDeletion() {
    
    const {
        collections,
        setCollections,
        currCollection,
        collSelectedIndex,
        fetchCollections
    } = useContext(CollectionsContext);
    const { trySwitchToCollectionByIndex } = useCollectionNavActions();
    const itemsHandlers = useManageListState(setCollections);

    const [isLoading, setIsLoading] = useState(false);
    const [shouldNavigateAway, setShouldNavigateAway] = useState(false);
    const { deleteCollection } = useCollectionApiCalls();

    const proceedWithDeletion = () => {
        if (!currCollection) return;

        deleteCollection({
            collection: currCollection,
            setLoadingState: setIsLoading,
            successfulCallback: handleSuccessfulDeletion,
            errorCallback: handleErroredDeletion,
        });
        fetchCollections();
    };

    const handleSuccessfulDeletion = () => {
        itemsHandlers.remove(collSelectedIndex);
        setShouldNavigateAway(true);
        notifications.show({
            message: "Collection has been deleted successfully.",
            color: "none",
            autoClose: AUTO_CLOSE_DEFAULT
        });
    };

    useEffect(() => {
        if (!shouldNavigateAway) return;

        let modifier = 0;
        if (collSelectedIndex > collections.length - 1) {
            modifier = -1;
        }
        trySwitchToCollectionByIndex(collSelectedIndex + modifier);
        setShouldNavigateAway(false);
    }, [collections, shouldNavigateAway]);

    const handleErroredDeletion = (err: ClientResponseError) => {
        console.error(err);
        notifications.show({
            message: "Error deleting collection",
            color: "red",
            autoClose: AUTO_CLOSE_ERROR_TOAST,
            withCloseButton: true,
        });
    };

    const canDelete = collections.length > 1;
    const confirmCollectionDeletion = () => {
        if (canDelete) {
            modals.openConfirmModal({
                title: "Confirm collection deletion",
                centered: true,
                children: (<>
                    <Text mt="xl">Are you sure you want to delete the collection "{currCollection!.name}"?</Text>
                    <Text mt="md">This is irreversible and will also cascadingly delete all items stored in this collection. </Text>
                    <Text mt="md">Please make sure that you would like to continue.</Text>
                </>),
                labels: {
                    confirm: "Delete collection",
                    cancel: "Cancel"
                },
                confirmProps: {
                    color: "red",
                    loading: isLoading
                },
                onConfirm: proceedWithDeletion
            });
            return;
        }

        modals.openContextModal({
            modal: "infoModal",
            title: "Minimum data required",
            innerProps: {
                leftSection: <IconExclamationCircle color="yellow" size={64} stroke={justJotTheme.other.iconStrokeWidth}/>,
                modalBody: "You have only one collection at the movement. You cannot delete your last collection."
            }
        });
    };

    return confirmCollectionDeletion;
};