import { forwardRef, useContext, useState } from "react";
import { Input, InputProps, Loader } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconCircleTriangle } from "@tabler/icons-react";

import { justJotTheme } from "@/theme";
import useCreateItem from "@/hooks/apiCalls/useCreateItem";
import { ItemsContext } from "@/contexts/ItemsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { MainViewContext } from "@/contexts/MainViewContext";
import useItemContextMenuActions from "@/hooks/useItemContextMenuActions";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { ItemType } from "@/types";

const MainInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { collections } = useContext(CollectionsContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { items } = useContext(ItemsContext);
    const { fetchItems } = useContext(ItemsContext);
    const {
        selectedIndex,
        selectPrevItem,
        selectNextItem,
        execPrimaryAction,
        blurMainInput,
        scrollToTop,
    } = useContext(MainViewContext);
    // const { getItemByIndex } = useItemNavActions(items);
    const {
        copyItemContent,
        openUpdateItemModal,
        deleteItem,
        openMoveItemModal,
        refetchTitleAndFavicon,
        switchShouldOpenOnClick,
    } = useItemContextMenuActions();

    const [inputVal, setInputVal] = useState("");
    const [createItem, isCreateItemLoading] = useCreateItem({
        successfulCallback: () => {
            setInputVal("");
            fetchItems(currCollection);
        }
    });

    const handleEnter = () => {
        if (!inputVal) return;
        createItem({ content: inputVal });
    };

    const getItemByIndex = (index: number) => {
        if (!items) return null;
        const targetItem = items[index];
        return targetItem;
    };

    const findIndex = () => {
        const itemListWrapper = document.querySelector(`#displayed-list`);
        const selectedItem = itemListWrapper?.querySelector<HTMLBaseElement>("[data-is-selected]");
        const index = selectedItem?.getAttribute("data-index");
        return Number(index);
    };

    const hotkeyCopyContent = () => {
        // const selectedIndex = findIndex();
        // if (!isValidIndex(selectedIndex)) return;
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;
        copyItemContent(item);
    }

    const hotkeyOpenUpdateItemModal = () => {
        // const selectedIndex = findIndex();
        // if (!isValidIndex(selectedIndex)) return;
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;
        openUpdateItemModal(item);
    }

    const hotkeyOpenMoveItemModal = () => {
        // const selectedIndex = findIndex();
        // if (!isValidIndex(selectedIndex)) return;
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;
        openMoveItemModal({item, collectionList: collections});
    }

    const hotkeyDeleteItem = () => {
        // const selectedIndex = findIndex();
        // if (!isValidIndex(selectedIndex)) return;
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;
        deleteItem(item);
        
        setTimeout(() => {
            selectPrevItem();
        }, 500);
    }

    const hotkeyRefetchTitleAndFavicon = () => {
        // const selectedIndex = findIndex();
        // if (!isValidIndex(selectedIndex)) return;
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;
        if (item.type !== ItemType.LINK) return;
        refetchTitleAndFavicon(item);
    }

    const hotkeySwitchShouldOpenOnClick = () => {
        // const selectedIndex = findIndex();
        // if (!isValidIndex(selectedIndex)) return;
        if (!selectedIndex?.current) return;
        const item = getItemByIndex(selectedIndex?.current);
        if (!item) return;
        switchShouldOpenOnClick(item);
    }

    return <Input id="main-input" className="main-view__input"
        ref={ref}
        {...props}
        size="lg"
        leftSection={<IconCircleTriangle
            size={32}
            stroke={justJotTheme.other.iconStrokeWidth}
        />}
        rightSectionPointerEvents="all"
        rightSection={
            isCreateItemLoading && <Loader size="xs"/>
        }
        type="text"
        value={inputVal}
        onChange={(event) => setInputVal(event.currentTarget.value)}
        onKeyDown={getHotkeyHandler([
            ["ArrowUp", selectPrevItem],
            ["ArrowDown", selectNextItem],
            ["Enter", handleEnter],
            ["mod+Enter", execPrimaryAction],
            ["Escape", blurMainInput],
            ["Home", scrollToTop],
            ["mod+C", hotkeyCopyContent],
            ["mod+E", hotkeyOpenUpdateItemModal],
            ["mod+M", hotkeyOpenMoveItemModal],
            ["mod+Delete", hotkeyDeleteItem],
            ["mod+shift+Q", hotkeyRefetchTitleAndFavicon],
            ["mod+shift+O", hotkeySwitchShouldOpenOnClick],
        ])}
    />
});

export default MainInput;