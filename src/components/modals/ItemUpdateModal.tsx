import { Box, Group, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { Item } from "../../types";
import useUpdateItem from "../../hooks/useUpdateItem";
import { DateTime } from "luxon";
import { useDebounceCallback } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

// type ItemUpdateFormData = {
//     title: string,
//     content: string,
// };

const DEBOUNCED_TIME = 2000;

export default function ItemUpdateModal({item}: {item: Item}) {

    useEffect(() => () => {
        if (hasChangedRef.current && !hasSavedRef.current) {
            updateItemTitleAndContent({
                itemId: item.id,
                title: titleValRef.current,
                content: contentValRef.current,
            });
        }
    }, []);

    const [ titleVal, setTitleVal ] = useState(item.title);
    const [ contentVal, setContentVal ] = useState(item.content);
    const [ hasSaved, setHasSaved ] = useState(false);
    const [ hasChanged, setHasChanged ] = useState(false);
    const titleValRef = useRef(titleVal);
    const contentValRef = useRef(contentVal);
    const hasSavedRef = useRef(hasSaved);
    const hasChangedRef = useRef(hasChanged);

    useEffect(() => {
        titleValRef.current = titleVal;
    }, [titleVal]);
    useEffect(() => {
        contentValRef.current = contentVal;
    }, [contentVal]);
    useEffect(() => {
        hasSavedRef.current = hasSaved;
    }, [hasSaved]);
    useEffect(() => {
        hasChangedRef.current = hasChanged;
    }, [hasChanged]);

    const [ relativeUpdatedTimeStr, setRelativeUpdatedTimeStr] = useState("");
    const { updateItemTitle, updateItemContent, updateItemTitleAndContent }
        = useUpdateItem({ successfulCallback: () => {
            setRelativeUpdatedTimeStr(DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS));
        }});

    const debouncedAutosaveItemTitle = useDebounceCallback(() => {
        updateItemTitle({ itemId: item.id, title: titleVal });
        setHasSaved(true);
    }, DEBOUNCED_TIME);

    const debouncedAutosaveItemContent = useDebounceCallback(() => {
        updateItemContent({ itemId: item.id, content: contentVal });
        setHasSaved(true);
    }, DEBOUNCED_TIME);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasChanged(true);
        setHasSaved(false);
        setTitleVal(event.target.value);
        titleValRef.current = titleVal;
        debouncedAutosaveItemTitle();
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHasChanged(true);
        setHasSaved(false);
        setContentVal(event.target.value);
        contentValRef.current = contentVal;
        debouncedAutosaveItemContent();
    };

    return <Stack className="item-update-modal">
        <TextInput className="item-update-modal__input item-update-modal__input--title"
            label="Title"
            description="Optional, must be or fewer than 200 characters."
            placeholder=""
            type="text"
            maxLength={200}
            value={titleVal}
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
            value={contentVal}
            onChange={handleContentChange}
        />
        <Group justify="flex-end">
            <Text>{contentVal.length}/10000</Text>
        </Group>

        <Group justify="space-between">
            <Box h="xl"/>
            {(hasSaved && relativeUpdatedTimeStr)
                && <Text>Saved at {relativeUpdatedTimeStr}</Text>
            }
        </Group>
    </Stack>
};