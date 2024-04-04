import { forwardRef, useContext } from "react";
import { Input, InputProps, Loader } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconCircleTriangle } from "@tabler/icons-react";

import { ItemsContext } from "@/contexts/ItemsContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import useItemActions from "@/hooks/useItemActions";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";
import { canConvertItemToTodo, canRefetchItem, canToggleItemShouldCopyOnClick } from "@/utils/itemUtils";
import useItemNavActions from "@/hooks/useItemNavActions";

const MainInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { collections } = useContext(CollectionsContext);
    const {
        inputVal,
        setInputVal,
        setSelectedIndex,
        selectedIndex,
        updateQueue,
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
        openUpdateItemModal,
        deleteItemWithOptimisticUpdate,
        openMoveItemModal,
        refetchLink,
        toggleItemShouldCopyOnClickWithOptimisticUpdate,
        convertToTodo,
    } = useItemActions();
    const iconProps = useIconPropsFromTheme();

    const {
        createItemWithOptimisticUpdate
    } = useItemActions();

    const handleEnter = () => {
        if (!inputVal) return;
        setInputVal("");
        createItemWithOptimisticUpdate({
            content: inputVal,
        });

        if (selectedIndex === -1) return;
        setSelectedIndex(curr => curr + 1);
    };

    const hotkeyCopyContent = () => {
        if (!selectedItem) return;
        copyItemContent(selectedItem);
    }

    const hotkeyOpenUpdateItemModal = () => {
        if (!selectedItem) return;
        openUpdateItemModal(selectedItem);
    }

    const hotkeyOpenMoveItemModal = () => {
        if (!selectedItem) return;
        openMoveItemModal({item: selectedItem, collectionList: collections});
    }

    const hotkeyDeleteItem = () => {
        if (!selectedItem) return;

        if (selectedIndex === 0) setSelectedIndex(-1);
        else setSelectedIndex(curr => curr - 1);

        deleteItemWithOptimisticUpdate({item: selectedItem});
    }

    const hotkeyRefetchTitleAndFavicon = () => {
        if (!selectedItem) return;
        if (!canRefetchItem(selectedItem)) return;
        refetchLink(selectedItem);
    }

    const hotkeyToggleItemShouldCopyOnClick = () => {
        if (!selectedItem) return;
        if (!canToggleItemShouldCopyOnClick(selectedItem)) return;
        toggleItemShouldCopyOnClickWithOptimisticUpdate({item: selectedItem});
    }

    const hotkeyConvertToTodoItem = () => {
        if (!selectedItem) return;
        if (!canConvertItemToTodo(selectedItem)) return;
        convertToTodo({item: selectedItem});
    }

    return <Input id="main-input" className="main-view__input"
        ref={ref}
        {...props}
        size="lg"
        leftSection={<IconCircleTriangle
            {...iconProps} 
            size={32}
        />}
        rightSectionPointerEvents="all"
        rightSection={
            updateQueue.length > 0 && <Loader size="xs"/>
        }
        type="text"
        value={inputVal}
        onChange={(event) => {
            setInputVal(event.currentTarget.value);
            setSelectedIndex(-1);
        }}
        onKeyDown={getHotkeyHandler([
            ["ArrowUp", selectPrevItem],
            ["ArrowDown", selectNextItem],
            ["Shift+ArrowUp", selectPrevItemFarther, { preventDefault: true }],
            ["Shift+ArrowDown", selectNextItemFarther, { preventDefault: true }],
            ["mod+Shift+ArrowUp", scrollToTop, { preventDefault: true }],
            ["mod+Shift+ArrowDown", scrollToBottom, { preventDefault: true }],
            ["Enter", handleEnter],
            ["mod+Enter", clickOnSelectedItem, { preventDefault: true }],
            ["Escape", blurMainInput],
            ["mod+C", hotkeyCopyContent, { preventDefault: true }],
            ["mod+E", hotkeyOpenUpdateItemModal, { preventDefault: true }],
            ["mod+M", hotkeyOpenMoveItemModal, { preventDefault: true }],
            ["mod+Shift+Backspace", hotkeyDeleteItem, { preventDefault: true }],
            ["mod+alt+Digit4", hotkeyToggleItemShouldCopyOnClick, { preventDefault: true }],
            ["mod+alt+Digit5", hotkeyRefetchTitleAndFavicon, { preventDefault: true }],
            ["mod+alt+Digit6", hotkeyConvertToTodoItem, { preventDefault: true }],
        ])}
    />
});

export default MainInput;