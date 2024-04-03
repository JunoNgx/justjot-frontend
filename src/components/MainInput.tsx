import { forwardRef, useContext, useState } from "react";
import { Input, InputProps, Loader } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconCircleTriangle } from "@tabler/icons-react";

import { ItemsContext } from "@/contexts/ItemsContext";
import { MainViewContext } from "@/contexts/MainViewContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { isValidIndex } from "@/utils/miscUtils";
import useItemActions from "@/hooks/useItemActions";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";
import { canRefetchItem, canToggleItemShouldCopyOnClick } from "@/utils/itemUtils";

const MainInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { collections } = useContext(CollectionsContext);
    const { items, updateQueue } = useContext(ItemsContext);
    const {
        selectedIndex,
        selectItem,
        deselectItem,
        selectPrevItem,
        selectNextItem,
        selectNextItemFarther,
        selectPrevItemFarther,
        execPrimaryAction,
        blurMainInput,
        scrollToTop,
        scrollToBottom,
    } = useContext(MainViewContext);
    const {
        copyItemContent,
        openUpdateItemModal,
        deleteItemWithOptimisticUpdate,
        openMoveItemModal,
        refetchLink,
        toggleItemShouldCopyOnClickWithOptimisticUpdate,
    } = useItemActions();
    const iconProps = useIconPropsFromTheme();

    const [inputVal, setInputVal] = useState("");
    const {
        createItemWithOptimisticUpdate
    } = useItemActions();

    const handleEnter = () => {
        if (!inputVal) return;
        setInputVal("");
        createItemWithOptimisticUpdate({
            content: inputVal,
        });

        if (!selectedIndex) return;
        selectedIndex.current += 1;
    };

    const getItemByIndex = (index: number) => {
        if (!items) return null;
        const targetItem = items[index];
        return targetItem;
    };

    const hotkeyCopyContent = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;
        copyItemContent(item);
    }

    const hotkeyOpenUpdateItemModal = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;
        openUpdateItemModal(item);
    }

    const hotkeyOpenMoveItemModal = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;
        openMoveItemModal({item, collectionList: collections});
    }

    const hotkeyDeleteItem = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;

        if (selectedIndex!.current === 0)
            deselectItem();
        else
            selectItem(selectedIndex!.current - 1);

        deleteItemWithOptimisticUpdate({item});
    }

    const hotkeyRefetchTitleAndFavicon = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;
        if (!canRefetchItem(item)) return;

        refetchLink(item);
    }

    const hotkeyToggleItemShouldCopyOnClick = () => {
        if (!isValidIndex(selectedIndex?.current)) return;
        const item = getItemByIndex(selectedIndex!.current);
        if (!item) return;
        if (!canToggleItemShouldCopyOnClick(item)) return;

        toggleItemShouldCopyOnClickWithOptimisticUpdate({item});
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
        onChange={(event) => setInputVal(event.currentTarget.value)}
        onKeyDown={getHotkeyHandler([
            ["ArrowUp", selectPrevItem],
            ["ArrowDown", selectNextItem],
            ["Shift+ArrowUp", selectPrevItemFarther, { preventDefault: true }],
            ["Shift+ArrowDown", selectNextItemFarther, { preventDefault: true }],
            ["mod+Shift+ArrowUp", scrollToTop, { preventDefault: true }],
            ["mod+Shift+ArrowDown", scrollToBottom, { preventDefault: true }],
            ["Enter", handleEnter],
            ["mod+Enter", execPrimaryAction, { preventDefault: true }],
            ["Escape", blurMainInput],
            ["mod+C", hotkeyCopyContent, { preventDefault: true }],
            ["mod+E", hotkeyOpenUpdateItemModal, { preventDefault: true }],
            ["mod+M", hotkeyOpenMoveItemModal, { preventDefault: true }],
            ["mod+Shift+Backspace", hotkeyDeleteItem, { preventDefault: true }],
            ["mod+Shift+Digit4", hotkeyToggleItemShouldCopyOnClick, { preventDefault: true }],
            ["mod+Shift+Digit5", hotkeyRefetchTitleAndFavicon, { preventDefault: true }],
        ])}
    />
});

export default MainInput;