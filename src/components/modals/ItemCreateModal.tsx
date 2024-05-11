import { ItemsContext } from "@/contexts/ItemsContext";
import useItemActions from "@/hooks/useItemActions";
import { MAX_TITLE_LENGTH, MAX_CONTENT_LENGTH } from "@/utils/constants";
import { TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { getHotkeyHandler } from "@mantine/hooks";
import { ContextModalProps } from '@mantine/modals';
import { useContext, useState } from "react";
import KbdMod from "../misc/KbdMod";
import "./Modals.scss";
import ButtonWithLoader from "@/libs/components/ButtonWithLoader";

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
    const [isFocusedOnTitleInput, setIsFocusedOnTitleInput] = useState(false);
    const [isConfirmingExit, setIsConfirmExit] = useState(false);

    const handleExit = () => {
        if (form.isDirty()) {
            setIsConfirmExit(true);
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

    const initialButtonGroup = <>
        <ButtonWithLoader
            variant="secondary"
            onClick={handleExit}
        >
            Exit
        </ButtonWithLoader>

        <ButtonWithLoader
            variant="primary"
            onClick={handleCreate}
        >
            Create
        </ButtonWithLoader>
    </>;

    const confirmExitButtonGroup = <>
        <ButtonWithLoader
            variant="secondary"
            onClick={() => setIsConfirmExit(false)}
        >
            Back
        </ButtonWithLoader>

        <ButtonWithLoader
            variant="danger"
            onClick={() => context.closeModal(id)}
        >
            Confirm exit
        </ButtonWithLoader>
    </>;

    return <div className="Modal Modal--Stackbox">
        <div className="Modal__InputContainer">
            <TextInput className="Modal__Input"
                label="Title"
                description={`Optional, must be or fewer than ${MAX_TITLE_LENGTH} characters.`}
                placeholder=""
                type="text"
                maxLength={MAX_TITLE_LENGTH}
                {...form.getInputProps("title")}

                // Overriding form.getInput `...form.getInputProps("title")`
                onFocus={() => setIsFocusedOnTitleInput(true)}
                onBlur={() => setIsFocusedOnTitleInput(false)}
                onKeyDown={getHotkeyHandler([
                    ["mod+S", handleCreate, { preventDefault: true }],
                    ["Escape", handleExit, { preventDefault: true} ],
                ])}
            />
            <div className="Modal__SubInputFlexbox">
                <p>{form.values.title.length}/{MAX_TITLE_LENGTH}</p>
            </div>
        </div>

        <div className="Modal__InputContainer">
            <Textarea className="item-create-modal__input item-create-modal__input--content"
                data-autofocus
                label="Content"
                description={`Optional, must be or fewer than ${MAX_CONTENT_LENGTH} characters.`}
                placeholder="Enter your note content here"
                autosize
                maxLength={MAX_CONTENT_LENGTH}
                minRows={5}
                {...form.getInputProps("content")}

                onFocus={() => setIsFocusedOnContentInput(true)}
                onBlur={() => setIsFocusedOnContentInput(false)}
                onKeyDown={getHotkeyHandler([
                    ["mod+S", handleCreate, { preventDefault: true }],
                    ["Escape", handleExit, { preventDefault: true} ],
                ])}
            />
            <div className="Modal__SubInputFlexbox">
                <p>{form.values.content.length}/{MAX_CONTENT_LENGTH}</p>
                {(isFocusedOnTitleInput || isFocusedOnContentInput) &&
                    <p><KbdMod/> <kbd>S</kbd> Create and close</p>
                }
            </div>
        </div>

        {isConfirmingExit &&
            <p className="Modal__ExitConfirm">
                You have not saved. Exiting will abandon your changes.
            </p>
        }
        <div className="Modal__BtnContainer Modal__BtnContainer--FlexEnd">
            {isConfirmingExit
                ? confirmExitButtonGroup
                : initialButtonGroup
            }
        </div>

    </div>
};

export default ItemCreateModal;
