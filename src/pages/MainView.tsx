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

    const mainInputRef = useRef<HTMLInputElement>(null);
    useHotkeys([
        ["mod+F", () => focusOnMainInput(mainInputRef)],
    ]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
            return;
        }

        window.addEventListener("focus", tryRoutineUpdate);
        return () => {
            window.removeEventListener("focus", tryRoutineUpdate);
        };
    }, []);

    useEffect(() => {
        if (!currCollection) return;
        fetchItems(currCollection);
    }, [currCollection]);

    const lastRoutineUpdateTimestamp = useRef<number>(Date.now());
    const tryRoutineUpdate = () => {
        console.log("try routine update")
        if (Date.now() - lastRoutineUpdateTimestamp.current >= 15000) {
            console.log("routine update fetch")
            fetchItems(currCollection);
            lastRoutineUpdateTimestamp.current = Date.now();
        }
    }

    return <Box className="main-view-wrapper">
        {/* For non-item components */}

        <Stack className="main-view"
            gap="xl"
            p="sm"
            onFocus={() => tryRoutineUpdate()}
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
