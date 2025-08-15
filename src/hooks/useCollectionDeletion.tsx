import { useContext, useEffect, useState } from "react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
import { IconExclamationCircle } from "@tabler/icons-react";
import { justJotTheme } from "@/theme";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import useCollectionApiCalls from "./useCollectionApiCalls";
import { ClientResponseError } from "pocketbase";
import useCollectionNavActions from "./useCollectionNavActions";
import useManageListState from "@/libs/useManageListState";

export default function useCollectionDeletion() {
    const {
        initCollections,
        setInitCollections,
        currCollection,
        collSelectedIndex,
    } = useContext(CollectionsContext);
    const { trySwitchToCollectionByIndex } = useCollectionNavActions();
    const itemsHandlers = useManageListState(setInitCollections);

    const [isLoading, setIsLoading] = useState(false);
    /**
     * Full name: navigation away destination index.
     * Temporarily holds the current index (because `collSelectedIndex`
     * will be temporarily inaccurate and unusable until correctly navigating
     * to a collection that is in the list).
     */
    const [navAwayIndex, setNavAwayIndex] = useState(-1);
    const { deleteCollection } = useCollectionApiCalls();

    useEffect(() => {
        setNavAwayIndex(-1);
        return () => {
            setNavAwayIndex(-1);
        };
    }, []);

    const proceedWithDeletion = () => {
        if (!currCollection) return;

        deleteCollection({
            collection: currCollection,
            setLoadingState: setIsLoading,
            successfulCallback: handleSuccessfulDeletion,
            errorCallback: handleErroredDeletion,
        });
    };

    const handleSuccessfulDeletion = () => {
        const currCollSelectedIndex = collSelectedIndex;
        itemsHandlers.remove(collSelectedIndex);
        setNavAwayIndex(currCollSelectedIndex);
        notifications.show({
            message: "Collection has been deleted successfully.",
            color: "none",
            autoClose: AUTO_CLOSE_DEFAULT,
        });
    };

    useEffect(() => {
        if (navAwayIndex === -1) return;

        if (navAwayIndex > initCollections.length - 1)
            trySwitchToCollectionByIndex(navAwayIndex - 1);
        else trySwitchToCollectionByIndex(navAwayIndex);

        setNavAwayIndex(-1);
    }, [initCollections, navAwayIndex]);

    const handleErroredDeletion = (err: ClientResponseError) => {
        console.error(err);
        notifications.show({
            message: "Error deleting collection",
            color: "red",
            autoClose: AUTO_CLOSE_ERROR_TOAST,
            withCloseButton: true,
        });
    };

    const canDelete = initCollections.length > 1;
    const confirmCollectionDeletion = () => {
        if (currCollection?.isTrashBin) {
            modals.openContextModal({
                modal: "infoModal",
                title: "Cannot delete",
                centered: true,
                innerProps: {
                    leftSection: (
                        <IconExclamationCircle
                            color="orange"
                            size={64}
                            stroke={justJotTheme.other.iconStrokeWidth}
                        />
                    ),
                    modalBody: `Your only Trash Bin collection "${currCollection.name}" cannot be deleted.`,
                },
            });
            return;
        }

        if (canDelete) {
            modals.openConfirmModal({
                title: "Confirm collection deletion",
                centered: true,
                children: (
                    <>
                        <p>
                            Are you sure you want to delete the collection "
                            {currCollection!.name}"?
                        </p>
                        <p>
                            This is irreversible and will also cascadingly
                            delete all items stored in this collection.{" "}
                        </p>
                        <p>Please make sure that you would like to continue.</p>
                    </>
                ),
                labels: {
                    confirm: "Delete collection",
                    cancel: "Cancel",
                },
                confirmProps: {
                    variant: "filled",
                    color: "red",
                    loading: isLoading,
                },
                onConfirm: proceedWithDeletion,
            });
            return;
        }

        modals.openContextModal({
            modal: "infoModal",
            title: "Minimum data required",
            centered: true,
            innerProps: {
                leftSection: (
                    <IconExclamationCircle
                        color="orange"
                        size={64}
                        stroke={justJotTheme.other.infoModalIconStrokeWidth}
                    />
                ),
                modalBody:
                    "You have only one collection at the movement. You cannot delete your last collection.",
            },
        });
    };

    return confirmCollectionDeletion;
}
