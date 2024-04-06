import { ItemsContext } from "@/contexts/ItemsContext";
import useItemActions from "@/hooks/useItemActions";
import { MAX_TITLE_LENGTH, MAX_CONTENT_LENGTH } from "@/utils/constants";
import { Button, Flex, Group, Kbd, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { getHotkeyHandler } from "@mantine/hooks";
import { ContextModalProps, modals } from '@mantine/modals';
import { useContext, useState } from "react";

const ItemCreateModal = ({
    context,
    id,
    innerProps
}: ContextModalProps<{ passedTitle: string }>) => {

    const form = useForm({
        initialValues: {
            title: innerProps.passedTitle,
            content: "",
        }
    });
    const { createItemWithOptimisticUpdate } = useItemActions();
    const { setInputVal } = useContext(ItemsContext);
    const [isFocusedOnContentInput, setIsFocusedOnContentInput] = useState(false);

    const handleClose = () => {
        // BUG: will revert form back to initial values
        if (form.isDirty()) {
            modals.openConfirmModal({
                title: "Confirm cancelation",
                centered: true,
                children: (
                    <Text>You have not saved your progress. Exiting will abandon your changes.</Text>
                ),
                labels: { confirm: "Abandon changes", cancel: "Canel" },
                onConfirm: () => { context.closeModal(id) },
            })

            return;
        }

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

    const exitButton = <Button
        variant="default"
        color="grey"
        onClick={handleClose}
    >
        Exit
    </Button>

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
            // Overriding form.getInput `...form.getInputProps("content")`
            onFocus={() => setIsFocusedOnContentInput(true)}
            onBlur={() => setIsFocusedOnContentInput(false)}

            onKeyDown={getHotkeyHandler([
                ["mod+S", handleCreate, { preventDefault: true }]
            ])}
        />
        <Flex
            direction="row-reverse"
            justify="space-between"
        >
            <Text>{form.values.content.length}/{MAX_CONTENT_LENGTH}</Text>
            {isFocusedOnContentInput && <Text> Create <Kbd>Ctrl</Kbd>/<Kbd>⌘</Kbd> <Kbd>S</Kbd></Text>}
        </Flex>

        {form.isDirty()}
        <Group justify="space-around" mt="lg">
            {exitButton}
            <Button
                onClick={handleCreate}
            >
                Create
            </Button>
        </Group>
    </Stack>
};

export default ItemCreateModal;
