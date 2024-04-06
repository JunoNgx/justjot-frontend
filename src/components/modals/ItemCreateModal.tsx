import { MAX_TITLE_LENGTH, MAX_CONTENT_LENGTH } from "@/utils/constants";
import { Button, Group, Kbd, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from '@mantine/modals';

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
    })

    return <Stack className="item-create-modal">
        <TextInput className="item-create-modal__input item-create-modal__input--title"
            label="Title"
            description="Optional, must be or fewer than 200 characters."
            placeholder=""
            type="text"
            maxLength={MAX_TITLE_LENGTH}
            {...form.getInputProps("title")}
            // onKeyDown={getHotkeyHandler([
            //     ["mod+S", handleActiveSave, {preventDefault: true}]
            // ])}
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
            // onKeyDown={getHotkeyHandler([
            //     ["mod+S", handleActiveSave, {preventDefault: true}]
            // ])}
        />
        <Group justify="space-between">
            <Text>Save <Kbd>Ctrl</Kbd>/<Kbd>⌘</Kbd> <Kbd>S</Kbd></Text>
            <Text>{form.values.content.length}/{MAX_CONTENT_LENGTH}</Text>
        </Group>

        <Group>
            <Button onClick={() => context.closeModal(id)}>
                Cancel
            </Button>

            <Button>
                Create
            </Button>
        </Group>
    </Stack>
};

export default ItemCreateModal;
