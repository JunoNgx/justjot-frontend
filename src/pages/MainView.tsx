import { useContext, useEffect, useRef } from "react";
import { Modal, Stack } from '@mantine/core';
import { BackendClientContext } from '../contexts/BackendClientContext';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import ItemComponent from '../components/ItemComponent';
import MainInput from "../components/MainInput";
import { ItemsContext } from "../contexts/ItemsContext";
import { CurrentCollectionContext } from "../contexts/CurrentCollectionContext";
import { clamp, useDisclosure, useHotkeys } from "@mantine/hooks";
import ItemUpdateModal from "../components/modals/ItemUpdateModal";
import { CurrentItemContext } from "../contexts/CurrentItemContext";

export default function MainView() {
    const { isLoggedIn } = useContext(BackendClientContext);
    const { items, fetchItems } = useContext(ItemsContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { currItem } = useContext(CurrentItemContext);

    const selectedIndex = useRef(-1);

    const selectItem = (index: number) => {
        const itemListWrapper = document.querySelector(`#displayed-list`);
        const itemList = itemListWrapper?.querySelectorAll<HTMLBaseElement>("[data-is-item]") ?? [];
        const newSelectedIndex = clamp(index, 0, itemList.length - 1);

        const oldSelectedItem = itemListWrapper?.querySelector<HTMLBaseElement>("[data-is-selected]");
        oldSelectedItem?.removeAttribute("data-is-selected");

        const newSelectedItem = itemList[newSelectedIndex];
        newSelectedItem.scrollIntoView({block: "end"});
        newSelectedItem.setAttribute("data-is-selected", "true");

        selectedIndex.current = newSelectedIndex;
    }

    const deselectItem = () => {
        const itemListWrapper = document.querySelector("#displayed-list");
        const currSelectedItem = itemListWrapper?.querySelector<HTMLBaseElement>("[data-is-selected]");
        currSelectedItem?.removeAttribute("data-is-selected");

        selectedIndex.current = -1;
    }

    const selectNextItem = () => {
        selectItem(selectedIndex.current + 1);
    }

    const selectPrevItem = () => {
        selectItem(selectedIndex.current -1);
    }

    const performPrimaryAction = () => {
        const itemListWrapper = document.querySelector("#displayed-list");
        const currSelectedItem = itemListWrapper?.querySelector<HTMLBaseElement>("[data-is-selected]");
        currSelectedItem?.click();
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
            return;
        }
    }, []);

    useEffect(() => {
        if (!currCollection) return;
        fetchItems(currCollection);
    }, [currCollection]);

    const [isItemUpdateOpened, {
        open: openItemUpdate,
        close: closeItemUpdate }] = useDisclosure(false);

    const closeItemUpdateModal = () => {
        closeItemUpdate();
        /**
         * It is possible to attempt to close modals that aren't even opened.
         * This will block off the unintended attempt to update the item list.
         */
        if (!isItemUpdateOpened) return;
        setTimeout(() => {fetchItems(currCollection)}, 500);
    }

    const openItemUpdateModal = () => {
        if (!currItem) return;
        openItemUpdate();
    }

    const itemUpdateModal = <Modal
        centered
        size={512}
        opened={isItemUpdateOpened}
        onClose={closeItemUpdateModal}
        title="Edit item"
    >
        <ItemUpdateModal item={currItem!}/>
    </Modal>

    // TODO: move these to App for better coverage
    const handleClickEvent = () => {
        console.log("click")
    }
    const handleFocusEvent = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        console.log("focus", e)
    };

    const mainInputRef = useRef<HTMLInputElement>(null);
    const focusOnMainInput = () => {
        mainInputRef.current?.focus();
    }

    useHotkeys([
        ["mod+F", focusOnMainInput],
    ]);

    return <Stack className="main-view"
        gap="xl"
        p="sm"
        onClick={() => {handleClickEvent()}}
        onFocus={(e) => handleFocusEvent(e)}
    >
        <Notifications className="notifications-container"
            limit={5}
            position="bottom-center"
            autoClose={1000}
        />

        <MainInput
            ref={mainInputRef}
            selectNextItem={selectNextItem}
            selectPrevItem={selectPrevItem}
            performPrimaryAction={performPrimaryAction}
        />
        <Stack className="main-view__items-container"
            id="displayed-list"
            gap="xs"
        >
            {items?.map((item, index) =>
                <ItemComponent
                    key={item.id}
                    item={item}
                    index={index}
                    openItemUpdate={openItemUpdateModal}
                    selectItem={selectItem}
                    deselectItem={deselectItem}
                />
            )}
        </Stack>

        {itemUpdateModal}
    </Stack>
}
