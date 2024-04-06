import { ItemsContext } from "@/contexts/ItemsContext";
import useItemActions from "@/hooks/useItemActions";
import { MAX_TITLE_LENGTH, MAX_CONTENT_LENGTH } from "@/utils/constants";
import { Button, Group, Kbd, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { getHotkeyHandler } from "@mantine/hooks";
import { ContextModalProps } from '@mantine/modals';
import { useContext } from "react";

const ItemCreateModal = ({
    context,
    id,
    innerProps
}: ContextModalProps <{ passedTitle: string }>) => {

    const form = useForm({
        initialValues: {
            title: innerProps.passedTitle,
            content: "",
        }
    });
    const { createItemWithOptimisticUpdate } = useItemActions();
    const { setInputVal } = useContext(ItemsContext);

    const handleClose = () => {
        // TODO: show confirm modal if form.isDirty()
        context.closeModal(id);
    };

    const handleCreate = () => {
        createItemWithOptimisticUpdate({
            title: form.values.title,
            content: form.values.content
        });
        context.closeModal(id);
        setInputVal("");
    };

    return <Stack className="item-create-modal">
        <TextInput className="item-create-modal__input item-create-modal__input--title"
            label="Title"
            description="Optional, must be or fewer than 200 characters."
            placeholder=""
            type="text"
            maxLength={MAX_TITLE_LENGTH}
            {...form.getInputProps("title")}
        />
        <Group justify="flex-end">
            <Text>{form.values.title.length}/{MAX_TITLE_LENGTH}</Text>
        </Group>

        <Textarea className="item-create-modal__input item-create-modal__input--content"
            data-autofocus
            label="Content"
            description="Optional, must be or fewer than 10000 characters."
            placeholder="Enter your note content here"
            autosize
            maxLength={MAX_CONTENT_LENGTH}
            minRows={5}
            {...form.getInputProps("content")}
            onKeyDown={getHotkeyHandler([
                ["mod+S", handleCreate, {preventDefault: true}]
            ])}
        />
        <Group justify="space-between">
            <Text>Save <Kbd>Ctrl</Kbd>/<Kbd>⌘</Kbd> <Kbd>S</Kbd></Text>
            <Text>{form.values.content.length}/{MAX_CONTENT_LENGTH}</Text>
        </Group>

        <Group justify="space-around" mt="lg">
            <Button
                variant="filled"
                color="grey"
                onClick={handleClose}
            >
                Cancel
            </Button>

            <Button
                onClick={handleCreate}
            >
                Create
            </Button>
        </Group>
    </Stack>
};

export default ItemCreateModal;
