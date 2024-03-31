import { Group, Kbd, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { Item, ItemType } from "@/types";
import { DateTime } from "luxon";
import { getHotkeyHandler, useDebounceCallback } from "@mantine/hooks";
import { useContext, useEffect, useRef, useState } from "react";
import { ItemsContext } from "@/contexts/ItemsContext";
import useItemApiCalls from "@/hooks/useItemApiCalls";
import useManageListState from "@/libs/useManageListState";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST } from "@/utils/constants";
import { ClientResponseError } from "pocketbase";
import { findIndexById } from "@/utils/itemUtils";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";

const DEBOUNCED_TIME = 5000;

export default function ItemCreateUpdateModal(
    {item, isEditMode}: {item: Item, isEditMode: boolean}
) {
    const { currCollection } = useContext(CurrentCollectionContext);
    const { fetchItems } = useContext(ItemsContext);
    const { items, setItems } = useContext(ItemsContext);
    const itemsHandlers = useManageListState(setItems);

    useEffect(() => {
        return () => {
            handleOnCloseItemUpdateModal();
        }
    }, []);

    const handleOnCloseItemUpdateModal = async () => {

        // Try post unsaved changes
        if (hasChangedRef.current && !hasSavedRef.current) {
            await updateItemTitleAndContent({
                itemId: item.id,
                title: titleValRef.current,
                content: contentValRef.current,
                successfulCallback: (record: Item) => {
                    const index = findIndexById(record.id, items)
                    if (index === -1) return;
                    itemsHandlers.replace(index, record);
                },
                errorCallback: (err: ClientQueryOptions) => {
                    fetchItems(currCollection);
                    console.error(err)
                    notifications.show({
                        message: "Error autosaving upon exiting item edit modal",
                        color: "red",
                        autoClose: AUTO_CLOSE_ERROR_TOAST,
                        withCloseButton: true,
                    });
                },
            });
            return;
        }

        if (hasChangedRef.current) {
            const newerItem = {
                ...item,
                title: titleValRef.current,
                content: contentValRef.current,
            };

            const index = findIndexById(newerItem.id, items)
            if (index === -1) return;
            itemsHandlers.replace(index, newerItem);
        }
    }

    const [ titleVal, setTitleVal ] = useState(
        isEditMode
            ? item.title
            : "");
    const [ contentVal, setContentVal ] = useState(
        isEditMode
            ? item.content
            : ""
        );

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
        if (hasChanged) setRelativeUpdatedTimeStr("");
    }, [hasChanged]);

    const [ relativeUpdatedTimeStr, setRelativeUpdatedTimeStr] = useState("");
    const { updateItemTitle, updateItemContent, updateItemTitleAndContent }
        = useItemApiCalls();

    const debouncedAutosaveItemTitle = useDebounceCallback(() => {
        updateItemTitle({
            itemId: item?.id,
            title: titleVal,
            successfulCallback: handleSuccessfulAutosave,
            errorCallback: handleErroredAutosave,
        });
        setHasSaved(true);
    }, DEBOUNCED_TIME);

    const debouncedAutosaveItemContent = useDebounceCallback(() => {
        updateItemContent({
            itemId: item?.id,
            content: contentVal,
            successfulCallback: handleSuccessfulAutosave,
            errorCallback: handleErroredAutosave,
        });
        setHasSaved(true);
    }, DEBOUNCED_TIME);

    const handleSuccessfulAutosave = (_record: Item) => {
        setRelativeUpdatedTimeStr(DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS));
    };

    const handleErroredAutosave = (err: ClientResponseError) => {
        console.error(err);
        setRelativeUpdatedTimeStr("");
        notifications.show({
            message: "Error autosaving",
            color: "red",
            autoClose: AUTO_CLOSE_ERROR_TOAST,
            withCloseButton: true,
        });
    };

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

    const handleActiveSave = () => {
        updateItemTitleAndContent({
            itemId: item?.id,
            title: titleValRef.current,
            content: contentValRef.current,
        });
        setRelativeUpdatedTimeStr(DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS));
        setHasChanged(false);
        setHasSaved(true);
    };

    const isTodoItem = item.type !== ItemType.TODO;

    return <Stack className="item-update-modal">
        <TextInput className="item-update-modal__input item-update-modal__input--title"
            label={isTodoItem
                ? "Title"
                : "Todo task name"
            }
            description="Optional, must be or fewer than 200 characters."
            placeholder=""
            type="text"
            maxLength={200}
            value={titleVal}
            onChange={handleTitleChange}
            onKeyDown={getHotkeyHandler([
                ["mod+S", handleActiveSave, {preventDefault: true}]
            ])}
        />
        <Group justify="flex-end">
            <Text>{titleVal.length}/200</Text>
        </Group>

        {isTodoItem && <>
            <Textarea className="item-update-modal__input item-update-modal__input--content"
                data-autofocus
                label="Content"
                description="Optional, must be or fewer than 10000 characters."
                placeholder="Enter your note content here"
                autosize
                maxLength={10000}
                minRows={5}
                value={contentVal}
                onChange={handleContentChange}
                onKeyDown={getHotkeyHandler([
                    ["mod+S", handleActiveSave, {preventDefault: true}]
                ])}
            />
            <Group justify="space-between">
                <Text>Save <Kbd>Ctrl</Kbd>/<Kbd>⌘</Kbd> <Kbd>S</Kbd></Text>
                <Text>{contentVal.length}/10000</Text>
            </Group>
        </>}

        <Group justify="flex-end">
            {(hasSaved && relativeUpdatedTimeStr)
                && <Text>Saved at {relativeUpdatedTimeStr}</Text>
            }
        </Group>
    </Stack>
};