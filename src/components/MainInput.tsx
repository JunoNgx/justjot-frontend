import { InputHTMLAttributes, useContext, RefObject } from "react";
import { getHotkeyHandler, HotkeyItemOptions } from "@mantine/hooks";
import { IconCircleTriangle } from "@tabler/icons-react";

import { ItemsContext } from "@/contexts/ItemsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import useItemActions from "@/hooks/useItemActions";
import useIconProps from "@/hooks/useIconProps";
import {
    canConvertItemToTodo,
    canMoveItem,
    canRefetchItem,
    canRestoreItem,
    canToggleItemShouldCopyOnClick,
    canTrashItem,
} from "@/utils/itemUtils";
import useItemNavActions from "@/hooks/useItemNavActions";
import MainInputExtendedMenu from "./MainInputExtendedMenu";
import {
    CREATE_TEXT_WITH_TITLE_PREFIX,
    CREATE_TEXT_WITH_TITLE_PREFIX_ALT,
} from "@/utils/constants";

import "./MainInput.scss";

export default function MainInput({
    props,
    ref,
}: {
    props?: InputHTMLAttributes<HTMLInputElement>;
    ref: RefObject<HTMLInputElement | null>;
}) {
    const { initCollections, isTrashCollection } =
        useContext(CollectionsContext);
    const {
        setIsMainInputFocused,
        inputVal,
        setInputVal,
        setSelectedIndex,
        selectedIndex,
        selectedItem,
    } = useContext(ItemsContext);
    const {
        selectPrevItem,
        selectNextItem,
        selectNextItemFarther,
        selectPrevItemFarther,
        clickOnSelectedItem,
        blurMainInput,
        scrollToTop,
        scrollToBottom,
    } = useItemNavActions();
    const {
        copyItemContent,
        openCreateItemModal,
        openUpdateItemModal,
        deleteItemWithOptimisticUpdate,
        openMoveItemModal,
        refetchLink,
        toggleItemShouldCopyOnClickWithOptimisticUpdate,
        convertToTodo,
        trashItemWithOptimisticUpdate,
        untrashItemWithOptimisticUpdate,
    } = useItemActions();
    const { mainInputIconProps } = useIconProps();

    const { createItemWithOptimisticUpdate } = useItemActions();

    const processMainInput = (inputData: string) => {
        if (isTrashCollection) return;
        if (!inputData) return;

        if (
            inputData.startsWith(CREATE_TEXT_WITH_TITLE_PREFIX)
            || inputData.startsWith(CREATE_TEXT_WITH_TITLE_PREFIX_ALT)
        ) {
            openCreateItemModal(
                inputData.substring(CREATE_TEXT_WITH_TITLE_PREFIX.length).trim()
            );
            return;
        }

        createItemContentFromInput(inputData);
    };

    const createItemContentFromInput = (inputData: string) => {
        createItemWithOptimisticUpdate({ content: inputData });
        setInputVal("");
        if (selectedIndex === -1) return;
        setSelectedIndex((curr) => curr + 1);
    };

    const hotkeyCopyContent = () => {
        if (!selectedItem) return;
        copyItemContent({ item: selectedItem });
    };

    const hotkeyOpenUpdateItemModal = () => {
        if (!selectedItem) return;
        openUpdateItemModal(selectedItem);
    };

    const hotkeyOpenMoveItemModal = () => {
        if (!selectedItem) return;

        if (canMoveItem(selectedItem)) {
            openMoveItemModal({
                item: selectedItem,
                collectionList: initCollections,
            });
        }
    };

    const hotkeyDeleteItem = () => {
        if (!selectedItem) return;

        if (selectedIndex === 0) setSelectedIndex(-1);
        else setSelectedIndex((curr) => curr - 1);

        if (canTrashItem(selectedItem)) {
            trashItemWithOptimisticUpdate({ item: selectedItem });
            return;
        }

        deleteItemWithOptimisticUpdate({ item: selectedItem });
    };

    const hotkeyRestoreItem = () => {
        if (!selectedItem) return;
        if (!canRestoreItem(selectedItem)) return;

        if (selectedIndex === 0) setSelectedIndex(-1);
        else setSelectedIndex((curr) => curr - 1);

        untrashItemWithOptimisticUpdate({ item: selectedItem });
    };

    const hotkeyRefetchTitleAndFavicon = () => {
        if (!selectedItem) return;
        if (!canRefetchItem(selectedItem)) return;
        refetchLink(selectedItem);
    };

    const hotkeyToggleItemShouldCopyOnClick = () => {
        if (!selectedItem) return;
        if (!canToggleItemShouldCopyOnClick(selectedItem)) return;
        toggleItemShouldCopyOnClickWithOptimisticUpdate({ item: selectedItem });
    };

    const hotkeyConvertToTodoItem = () => {
        if (!selectedItem) return;
        if (!canConvertItemToTodo(selectedItem)) return;
        convertToTodo({ item: selectedItem });
    };

    const hotkeyData: [
        string,
        (e: KeyboardEvent) => void,
        HotkeyItemOptions?,
    ][] = [
        ["ArrowUp", selectPrevItem],
        ["ArrowDown", selectNextItem],
        ["Shift+ArrowUp", selectPrevItemFarther, { preventDefault: true }],
        ["Shift+ArrowDown", selectNextItemFarther, { preventDefault: true }],
        ["mod+Shift+ArrowUp", scrollToTop, { preventDefault: true }],
        ["mod+Shift+ArrowDown", scrollToBottom, { preventDefault: true }],
        ["Enter", () => processMainInput(inputVal)],
        ["Escape", blurMainInput],
        ["mod+Enter", clickOnSelectedItem, { preventDefault: true }],
        ["mod+Shift+C", hotkeyCopyContent, { preventDefault: true }],
        ["mod+E", hotkeyOpenUpdateItemModal, { preventDefault: true }],
        ["mod+M", hotkeyOpenMoveItemModal, { preventDefault: true }],
        ["mod+Shift+Backspace", hotkeyDeleteItem, { preventDefault: true }],
        ["mod+alt+R", hotkeyRestoreItem, { preventDefault: true }],
        [
            "mod+alt+Digit4",
            hotkeyToggleItemShouldCopyOnClick,
            { preventDefault: true },
        ],
        [
            "mod+alt+Digit5",
            hotkeyRefetchTitleAndFavicon,
            { preventDefault: true },
        ],
        ["mod+alt+Digit6", hotkeyConvertToTodoItem, { preventDefault: true }],
    ];

    return (
        <div className="MainInput">
            <div className="MainInput__LeftSide">
                <IconCircleTriangle {...mainInputIconProps} />
            </div>
            <input
                id="main-input"
                className="MainInput__Input"
                ref={ref}
                {...props}
                type="text"
                aria-label="Main input"
                // placeholder="Add new item or search"
                autoComplete="off"
                value={inputVal}
                onChange={(event) => {
                    setInputVal(event.currentTarget.value);
                    setSelectedIndex(-1);
                }}
                onKeyDown={getHotkeyHandler(hotkeyData)}
                onFocus={() => setIsMainInputFocused(true)}
                onBlur={() => setIsMainInputFocused(false)}
            />
            <div className="MainInput__RightSide">
                <MainInputExtendedMenu
                    processMainInput={processMainInput}
                    mainInputRef={ref}
                />
            </div>
        </div>
    );
}
