import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import { modals } from "@mantine/modals";
import { getCurrHighestCollectionSortOrder } from "@/utils/collectionUtils";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { slugify } from "@/utils/miscUtils";
import useCollectionApiCalls from "@/hooks/useCollectionApiCalls";
import { ItemCollection, TrashBin } from "@/types";
import { ClientResponseError } from "pocketbase";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
import useManageListState from "@/libs/useManageListState";
import useCollectionNavActions from "@/hooks/useCollectionNavActions";
import ButtonWithLoader from "@/libs/components/ButtonWithLoader";

import "./Modals.scss";

type CollectionCreateUpdateModalOptions = {
    isEditMode?: boolean;
};

type CollectionCreateUpdateFormData = {
    name: string;
    slug: string;
};

export default function CollectionCreateUpdateModal({
    isEditMode,
}: CollectionCreateUpdateModalOptions) {
    const {
        initCollections,
        setInitCollections,
        currCollection,
        collSelectedIndex,
        setTrashBin,
    } = useContext(CollectionsContext);
    const form = useForm({
        initialValues: {
            name: isEditMode ? currCollection?.name : "",
            slug: isEditMode ? currCollection?.slug : "",
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [newlyCreatedCollection, setNewlyCreatedCollection] =
        useState<ItemCollection | null>(null);
    const collectionsHandlers = useManageListState(setInitCollections);
    const { trySwitchToCollectionById, tryNavigateToCollection } =
        useCollectionNavActions();

    const { createCollection, updateCollection, updateTrashBin } =
        useCollectionApiCalls();

    useEffect(() => {
        setNewlyCreatedCollection(null);
        return () => {
            setNewlyCreatedCollection(null);
        };
    }, []);

    const handleSubmit = async (formData: CollectionCreateUpdateFormData) => {
        const { name, slug: originalSlug } = formData;
        const slug = slugify(originalSlug);

        if (isEditMode) {
            if (currCollection?.isTrashBin) {
                await updateTrashBin({
                    name,
                    slug,
                    collectionId: currCollection!.id,
                    setLoadingState: setIsLoading,
                    successfulCallback: handleSuccessulTrashbinUpdate,
                    errorCallback: handleErroredUpdate,
                });
                return;
            }

            await updateCollection({
                name,
                slug,
                collectionId: currCollection!.id,
                setLoadingState: setIsLoading,
                successfulCallback: handleSuccessfulUpdate,
                errorCallback: handleErroredUpdate,
            });
            return;
        }

        const currHighestSortOrder =
            getCurrHighestCollectionSortOrder(initCollections);
        await createCollection({
            name,
            slug,
            currHighestSortOrder,
            setLoadingState: setIsLoading,
            successfulCallback: handleSuccessfulCreation,
            errorCallback: handleErroredCreation,
        });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;

        form.setValues({
            name: newVal,
            slug: slugify(newVal),
        });
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValues({
            slug: slugify(e.target.value),
        });
    };

    const handleSuccessfulCreation = (newCollection: ItemCollection) => {
        collectionsHandlers.append(newCollection);
        setNewlyCreatedCollection(newCollection);

        modals.closeAll();
    };

    // Will trigger navigating to the newly created collection
    useEffect(() => {
        if (!newlyCreatedCollection) return;
        trySwitchToCollectionById(newlyCreatedCollection.id);
    }, [newlyCreatedCollection]);

    const handleErroredCreation = (err: ClientResponseError) => {
        console.error(err);
        notifications.show({
            message: "Error creating new collection",
            color: "red",
            autoClose: AUTO_CLOSE_ERROR_TOAST,
            withCloseButton: true,
        });
    };

    const handleSuccessfulUpdate = (newCollection: ItemCollection) => {
        collectionsHandlers.replaceProps(collSelectedIndex, {
            ...newCollection,
        });
        /**
         * Update the url param slug as a side effect to avoid defaulting back
         * to `collections[0]`
         */
        tryNavigateToCollection(newCollection);

        modals.closeAll();
    };

    const handleSuccessulTrashbinUpdate = (respondedTrashBin: TrashBin) => {
        const processedTrashBin: TrashBin = {
            ...respondedTrashBin,
            isTrashBin: true,
        };
        setTrashBin(processedTrashBin);
        tryNavigateToCollection(processedTrashBin);
        modals.closeAll();
    };

    const handleErroredUpdate = (err: ClientResponseError) => {
        console.error(err);
        notifications.show({
            message: "Error updating collection",
            color: "red",
            autoClose: AUTO_CLOSE_ERROR_TOAST,
            withCloseButton: true,
        });
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="Modal__Stackbox">
                <TextInput
                    data-autofocus
                    label="Collection name"
                    description="Must be between 1 and 50 characters."
                    required
                    placeholder="My collection"
                    type="text"
                    minLength={1}
                    maxLength={50}
                    {...form.getInputProps("name")}
                    onChange={handleNameChange}
                />
                <TextInput
                    label="Collection slug"
                    description="Optional, can assist with quick access via hyperlink."
                    placeholder="my-collection"
                    type="text"
                    {...form.getInputProps("slug")}
                    onChange={handleSlugChange}
                />
                <div className="Modal__ButtonsFlexbox">
                    <ButtonWithLoader
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                    >
                        {isEditMode ? "Update collection" : "Create collection"}
                    </ButtonWithLoader>
                </div>
            </div>
        </form>
    );
}
