import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useCreateCollection from "../../hooks/useCreateCollection";
import useUpdateCollection from "../../hooks/useUpdateCollection";
import { useContext } from "react";
import { BackendClientContext } from "../../contexts/BackendClientContext";
import { modals } from "@mantine/modals";
import { getCurrHighestCollectionSortOrder } from "../../utils/collectionUtils";

type CreateUpdateCollectionModalOptions = {
    isEditMode?: boolean,
};

type RegisterFormData = {
    name: string,
    slug: string,
};

export default function CreateUpdateCollectionModal(
    { isEditMode }: CreateUpdateCollectionModalOptions
) {

    const { currCollection, collections, fetchCollections } = useContext(BackendClientContext);
    const form = useForm({
        initialValues: {
            name: isEditMode ? currCollection?.name : "",
            slug: isEditMode ? currCollection?.slug : ""
        }
    });
    const [ createCollection, isCreateLoading ]
        = useCreateCollection({ successfulCallback: modals.closeAll});
    const [ updateCollection, isUpdateLoading ]
        = useUpdateCollection({ successfulCallback: modals.closeAll});

    const handleSubmit = async (formData: RegisterFormData) => {
        const { name, slug } = formData;

        if (isEditMode) {
            await updateCollection({ name, slug });
            fetchCollections();
            return;
        }

        const currHighestSortOrder = getCurrHighestCollectionSortOrder(collections);
        await createCollection({ name, slug }, currHighestSortOrder);
        fetchCollections();
    }

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
            />
            <TextInput
                label="Collection slug"
                description="Optional, can assist with quick access via hyperlink."
                placeholder="my-collection"
                type="text"
                {...form.getInputProps("slug")}
            />
            <Group mt="xl" justify="flex-end">
                <Button
                    variant="filled"
                    type="submit"
                    loading={isEditMode
                        ? isCreateLoading
                        : isUpdateLoading
                    }
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