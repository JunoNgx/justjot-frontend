import { useContext, useEffect, useState } from "react";
import { modals } from "@mantine/modals";
import useDeleteCollection from "@/hooks/apiCalls/useDeleteCollection";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT } from "@/utils/constants";
import { IconExclamationCircle } from "@tabler/icons-react";
import { justJotTheme } from "@/theme";
import { Text } from "@mantine/core";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";

export default function useDeleteCollectionConfirmation() {
    
    const { collections, fetchCollections } = useContext(CollectionsContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    
    useEffect(() => {
        if (collections.length === 0) return;
        setCanDelete(collections.length > 1);
    }, [collections]);
    
    const [canDelete, setCanDelete] = useState(false);
    const [deleteCollection] = useDeleteCollection({
        successfulCallback: () => {
            notifications.show({
                message: "Collection has been deleted successfully.",
                color: "none",
                autoClose: AUTO_CLOSE_DEFAULT
            });
        },
    }); 

    const proceedWithDeletion = () => {
        deleteCollection();
        fetchCollections();
    };

    const confirmDeletion = () => {
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
                confirmProps: { color: "red" },
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

    return confirmDeletion;
};