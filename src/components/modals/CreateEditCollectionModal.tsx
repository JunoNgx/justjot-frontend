import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useCreateCollection from "../../hooks/useCreateCollection";
import { ItemCollection } from "../../types";
import useUpdateCollection from "../../hooks/useUpdateCollection";

type CreateEditCollectionModalOptions = {
    collection?: ItemCollection,
    isEditMode?: boolean,
    closeModalCallBackFn?: () => void,
};

type RegisterFormData = {
    name: string,
    slug: string,
};

export default function CreateEditCollectionModal(
    { isEditMode, collection, closeModalCallBackFn }: CreateEditCollectionModalOptions
) {

    const form = useForm({
        initialValues: {
            name: isEditMode ? collection?.name : "",
            slug: isEditMode ? collection?.slug : ""
        }
    });
    const [ createCollection, isCreateLoading ]
        = useCreateCollection({ successfulCallback: closeModalCallBackFn});
    const [ updateCollection, isUpdateLoading ]
        = useUpdateCollection({ successfulCallback: closeModalCallBackFn});

    const handleSubmit = async (formData: RegisterFormData) => {
        const { name, slug } = formData;

        if (isEditMode) {
            await updateCollection(collection!.id, { name, slug });

            return;
        }

        await createCollection({ name, slug });
    }

    return <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
            <TextInput
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