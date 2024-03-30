import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useUpdateCollection from "@/hooks/apiCalls/useUpdateCollection";
import { useContext, useEffect, useState } from "react";
import { modals } from "@mantine/modals";
import { getCurrHighestCollectionSortOrder } from "@/utils/collectionUtils";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { slugify } from "@/utils/miscUtils";
import useCollectionApiCalls from "@/hooks/useCollectionApiCalls";
import { ItemCollection } from "@/types";
import { ClientResponseError } from "pocketbase";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_DEFAULT, AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
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

    const { collections, setCollections, fetchCollections } = useContext(CollectionsContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const form = useForm({
        initialValues: {
            name: isEditMode ? currCollection?.name : "",
            slug: isEditMode ? currCollection?.slug : ""
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [newlyCreatedCollection, setNewlyCreatedCollection] = useState<ItemCollection|null>(null);
    const handlers = useManageListState(setCollections);
    const { trySwitchToCollectionById } = useCollectionNavActions();

    const { createCollection } = useCollectionApiCalls();
    const [ updateCollection]
        = useUpdateCollection({ successfulCallback: modals.closeAll});

    const handleSubmit = async (formData: CollectionCreateUpdateFormData) => {
        const { name, slug: originalSlug } = formData;
        const slug = slugify(originalSlug);

        if (isEditMode) {
            await updateCollection({ name, slug });
            fetchCollections();
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
        handlers.append(newCollection);
        setNewlyCreatedCollection(newCollection);
        notifications.show({
            message: "Collection created: " + newCollection.name,
            color: "none",
            autoClose: AUTO_CLOSE_DEFAULT,
            withCloseButton: true,
        });

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
                    variant="filled"
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