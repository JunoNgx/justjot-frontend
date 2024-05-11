import { TextInput, Textarea } from "@mantine/core";
import { Item, ItemType } from "@/types";
import { DateTime } from "luxon";
import { getHotkeyHandler, useDebouncedCallback } from "@mantine/hooks";
import { useContext, useEffect, useRef, useState } from "react";
import { ItemsContext } from "@/contexts/ItemsContext";
import useItemApiCalls from "@/hooks/useItemApiCalls";
import useManageListState from "@/libs/useManageListState";
import { notifications } from "@mantine/notifications";
import { AUTO_CLOSE_ERROR_TOAST, MAX_CONTENT_LENGTH, MAX_TITLE_LENGTH } from "@/utils/constants";
import { ClientResponseError } from "pocketbase";
import { findIndexById } from "@/utils/itemUtils";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { modals } from "@mantine/modals";
import KbdMod from "../misc/KbdMod";
import useItemActions from "@/hooks/useItemActions";

const DEBOUNCED_TIME = 2500;

export default function ItemUpdateModal(
    {item}: {item: Item}
) {
    const { currCollection } = useContext(CollectionsContext);
    const { fetchItems } = useContext(ItemsContext);
    const { items, setItems } = useContext(ItemsContext);
    const itemsHandlers = useManageListState(setItems);

    useEffect(() => {
        return () => {
            handleOnCloseItemUpdateModal();
        }
    }, []);

    const handleOnCloseItemUpdateModal = async () => {
        const index = findIndexById(item.id, items)
        if (index === -1) return;
        itemsHandlers.replaceProps(
            index,
            {
                title: titleValRef.current,
                content: contentValRef.current
            }
        );

        // Try post unsaved changes
        if (hasChangedRef.current && !hasSavedRef.current) {
            updateItemTitleAndContentWithOptimisticUpdate({
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

    const [isFocusedOnContentInput, setIsFocusedOnContentInput] = useState(false);
    const [isFocusedOnTitleInput, setIsFocusedOnTitleInput] = useState(false);

    const [ titleVal, setTitleVal ] = useState(item?.title || "");
    const [ contentVal, setContentVal ] = useState(item?.content || "");

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
    const { updateItemTitle, updateItemContent }
        = useItemApiCalls();
    const { updateItemTitleAndContentWithOptimisticUpdate } = useItemActions();

    const debouncedAutosaveItemTitle = useDebouncedCallback(() => {
        updateItemTitle({
            itemId: item?.id,
            title: titleVal,
            successfulCallback: handleSuccessfulAutosave,
            errorCallback: handleErroredAutosave,
        });
        setHasSaved(true);
    }, DEBOUNCED_TIME);

    const debouncedAutosaveItemContent = useDebouncedCallback(() => {
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
        if (hasSaved) {
            modals.closeAll();
            return;
        }

        setRelativeUpdatedTimeStr(DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS));
        setHasChanged(false);
        setHasSaved(true);
        modals.closeAll();

        updateItemTitleAndContentWithOptimisticUpdate({
            itemId: item?.id,
            title: titleValRef.current,
            content: contentValRef.current,
            successfulCallback: (record: Item) => {
                const index = findIndexById(record.id, items)
                if (index === -1) return;
                itemsHandlers.replace(index, record);
            },
            errorCallback: (err: ClientQueryOptions) => {
                console.error(err)
                notifications.show({
                    message: "Error saving item edit",
                    color: "red",
                    autoClose: AUTO_CLOSE_ERROR_TOAST,
                    withCloseButton: true,
                });
            },

        });
    };

    const isTodoItem = item.type === ItemType.TODO;

    return <div className="Modal Modal--Stackbox">
        <div className="Modal__InputContainer">
            <TextInput className="Modal__Input"
                // Potential bug? `data-autofocus={false}` doesn't disable it, only `null` and `undefined` do
                data-autofocus={!isTodoItem && null}
                label={isTodoItem
                    ? "Todo task name"
                    : "Title"
                }
                description={`Optional, must be or fewer than ${MAX_TITLE_LENGTH} characters.`}
                placeholder=""
                type="text"
                maxLength={MAX_TITLE_LENGTH}
                value={titleVal}
                onChange={handleTitleChange}
                onKeyDown={getHotkeyHandler([
                    ["mod+S", handleActiveSave, {preventDefault: true}]
                ])}
                onFocus={() => setIsFocusedOnTitleInput(true)}
                onBlur={() => setIsFocusedOnTitleInput(false)}
            />
            <div className="Modal__SubInputFlexbox">
                <p>{titleVal.length}/{MAX_TITLE_LENGTH}</p>
                {(isTodoItem && isFocusedOnTitleInput) &&
                    <p><kbd>Esc</kbd> / <KbdMod/> <kbd>S</kbd> Save and close</p>
                }
            </div>
        </div>

        {!isTodoItem && <div className="Modal__InputContainer">
            <Textarea className="Modal__Input"
                data-autofocus={!isTodoItem}
                label="Content"
                description={`Optional, must be or fewer than ${MAX_CONTENT_LENGTH} characters.`}
                placeholder="Enter your note content here"
                autosize
                maxLength={MAX_CONTENT_LENGTH}
                minRows={5}
                value={contentVal}
                onChange={handleContentChange}
                onKeyDown={getHotkeyHandler([
                    ["mod+S", handleActiveSave, {preventDefault: true}]
                ])}
                onFocus={() => setIsFocusedOnContentInput(true)}
                onBlur={() => setIsFocusedOnContentInput(false)}
            />
            <div className="Modal__SubInputFlexbox">
                <p>{contentVal.length}/{MAX_CONTENT_LENGTH}</p>
                {(isFocusedOnTitleInput || isFocusedOnContentInput) &&
                   <p><kbd>Esc</kbd> / <KbdMod/> <kbd>S</kbd> Save and close</p>
                }
            </div>
        </div>}

        <div className="Modal__SubInputFlexbox">
            {(hasSaved && relativeUpdatedTimeStr)
                && <p>Saved at {relativeUpdatedTimeStr}</p>
            }
        </div>
    </div>
}