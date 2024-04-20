import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import { modals } from "@mantine/modals";
import { getCurrHighestCollectionSortOrder } from "@/utils/collectionUtils";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { slugify } from "@/utils/miscUtils";
import useCollectionApiCalls from "@/hooks/useCollectionApiCalls";
import { ItemCollection } from "@/types";
import { ClientResponseError } from "pocketbase";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
import useManageListState from "@/libs/useManageListState";
import useCollectionNavActions from "@/hooks/useCollectionNavActions";

type CollectionCreateUpdateModalOptions = {
    isEditMode?: boolean,
};

type CollectionCreateUpdateFormData = {
    name: string,
    slug: string,
};

export default function CollectionCreateUpdateModal(
    { isEditMode }: CollectionCreateUpdateModalOptions
) {

    const {
        collections,
        setCollections,
        currCollection,
        collSelectedIndex
    } = useContext(CollectionsContext);
    const form = useForm({
        initialValues: {
            name: isEditMode ? currCollection?.name : "",
            slug: isEditMode ? currCollection?.slug : ""
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [newlyCreatedCollection, setNewlyCreatedCollection] = useState<ItemCollection | null>(null);
    const itemsHandlers = useManageListState(setCollections);
    const {
        trySwitchToCollectionById,
        tryNavigateToCollection,
    } = useCollectionNavActions();

    const { createCollection, updateCollection } = useCollectionApiCalls();

    useEffect(() => {
        setNewlyCreatedCollection(null);
        return () => {
            setNewlyCreatedCollection(null);
        }
    }, []);

    const handleSubmit = async (formData: CollectionCreateUpdateFormData) => {
        const { name, slug: originalSlug } = formData;
        const slug = slugify(originalSlug);

        if (isEditMode) {
            await updateCollection({
                name, slug,
                collectionId: currCollection!.id,
                setLoadingState: setIsLoading,
                successfulCallback: handleSuccessfulUpdate,
                errorCallback: handleErroredUpdate
            });
            return;
        }

        const currHighestSortOrder = getCurrHighestCollectionSortOrder(collections);
        await createCollection({
            name, slug, currHighestSortOrder,
            setLoadingState: setIsLoading,
            successfulCallback: handleSuccessfulCreation,
            errorCallback: handleErroredCreation,
        });
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;

        form.setValues({
            name: newVal,
            slug: slugify(newVal)
        });
    }

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValues({
            slug: slugify(e.target.value)
        });
    }

    const handleSuccessfulCreation = (newCollection: ItemCollection) => {
        itemsHandlers.append(newCollection);
        setNewlyCreatedCollection(newCollection);

        modals.closeAll();
    };

    // Will trigger navigating to the newly created collection
    useEffect(() => {
        if (!newlyCreatedCollection) return;
        trySwitchToCollectionById(newlyCreatedCollection.id);
    }, [newlyCreatedCollection]);

    const handleErroredCreation = (err: ClientResponseError) => {
        console.log(err);
        notifications.show({
            message: "Error creating new collection",
            color: "red",
            autoClose: AUTO_CLOSE_ERROR_TOAST,
            withCloseButton: true,
        });
    };

    const handleSuccessfulUpdate = (newCollection: ItemCollection) => {
        itemsHandlers.replace(collSelectedIndex, newCollection);
        /**
         * Update the url param slug as a side effect to avoid defaulting back
         * to `collections[0]`
         */
        tryNavigateToCollection(newCollection);

        modals.closeAll();
    };

    const handleErroredUpdate = (err: ClientResponseError) => {
        console.log(err);
        notifications.show({
            message: "Error updating collection",
            color: "red",
            autoClose: AUTO_CLOSE_ERROR_TOAST,
            withCloseButton: true,
        });
    };

    return <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
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
            <Group mt="xl" justify="flex-end">
                <Button
                    type="submit"
                    loading={isLoading}
                >
                    {isEditMode
                        ? "Update collection"
                        : "Create collection"
                    }
                </Button>
            </Group>
        </Stack>
    </form>

};