import { useContext, useEffect, useRef } from "react";
import { Box, Stack } from '@mantine/core';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import ItemComponent from '@/components/itemComponent/ItemComponent';
import MainInput from "@/components/MainInput";
import { ItemsContext } from "@/contexts/ItemsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { useHotkeys } from "@mantine/hooks";
import { MainViewContext } from "@/contexts/MainViewContext";

export default function MainView() {
    const { isLoggedIn } = useContext(BackendClientContext);
    const { items, fetchItems } = useContext(ItemsContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { focusOnMainInput } = useContext(MainViewContext);

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

    // TODO: move these to App for better coverage
    const handleClickEvent = () => {
        console.log("click")
    }
    const handleFocusEvent = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        console.log("focus", e)
    };

    const mainInputRef = useRef<HTMLInputElement>(null);
    useHotkeys([
        ["mod+F", () => focusOnMainInput(mainInputRef)],
    ]);

    return <Box className="main-view-wrapper">
        {/* For non-item components */}

        <Stack className="main-view"
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
                    />
                )}
            </Stack>
        </Stack>
    </Box>
}
