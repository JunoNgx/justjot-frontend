import { Box, Button, Group, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Item } from "../../types";
import useUpdateItem from "../../hooks/useUpdateItem";
import { DateTime } from "luxon";
import { useDebounceCallback, useDebouncedState } from "@mantine/hooks";
import { useState } from "react";

// type ItemUpdateFormData = {
//     title: string,
//     content: string,
// };

const DEBOUNCED_TIME = 2000;

export default function ItemUpdateModal({item}: {item: Item}) {

    const [ titleVal, setTitleVal ] = useState(item.title);
    const [ contentVal, setContentVal ] = useState(item.content);
    const [ relativeUpdatedTimeStr, setRelativeUpdatedTimeStr] = useState("");
    const [ updateItemTitle, updateItemContent ]
        = useUpdateItem({ successfulCallback: () => {
            setRelativeUpdatedTimeStr(DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS));
        }});

    const debouncedAutosaveItemTitle = useDebounceCallback(
        () => updateItemTitle({ itemId: item.id, title: titleVal }
    ), DEBOUNCED_TIME);

    const debouncedAutosaveItemContent = useDebounceCallback(
        () => updateItemContent({ itemId: item.id, content: contentVal }
    ), DEBOUNCED_TIME);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleVal(event.currentTarget.value);
        debouncedAutosaveItemTitle();
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentVal(event.currentTarget.value);
        debouncedAutosaveItemContent();
    };

    return <Stack className="item-update-modal">
        <TextInput className="item-update-modal__input item-update-modal__input--title"
            label="Title"
            description="Optional, must be or fewer than 200 characters."
            placeholder=""
            type="text"
            maxLength={200}
            defaultValue={titleVal}
            onChange={handleTitleChange}
        />
        <Group justify="flex-end">
            <Text>{titleVal.length}/200</Text>
        </Group>

        <Textarea className="item-update-modal__input item-update-modal__input--content"
            data-autofocus
            label="Content"
            description="Optional, must be or fewer than 10000 characters."
            placeholder="Enter your note content here"
            autosize
            maxLength={10000}
            minRows={20}
            maxRows={30}
            defaultValue={contentVal}
            onChange={handleContentChange}
        />
        <Group justify="flex-end">
            <Text>{contentVal.length}/10000</Text>
        </Group>

        <Group justify="space-between">
            <Box h="xl"/>
            {relativeUpdatedTimeStr && <Text>Saved at {relativeUpdatedTimeStr}</Text>}
        </Group>
    </Stack>
};