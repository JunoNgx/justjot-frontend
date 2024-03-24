import { useContext, useEffect, useRef } from "react";
import { Box, Stack } from '@mantine/core';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import ItemComponent from '@/components/itemComponent/ItemComponent';
import MainInput from "@/components/MainInput";
import { ItemsContext } from "@/contexts/ItemsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { useHotkeys } from "@mantine/hooks";
import { MainViewContext } from "@/contexts/MainViewContext";
import useCollectionNavActions from "@/hooks/useCollectionNavActions";
import CollectionMenu from "@/components/CollectionMenu";
import { CollectionsContext } from "@/contexts/CollectionsContext";

export default function MainView() {
    const { isLoggedIn } = useContext(BackendClientContext);
    const { collections, fetchCollections } = useContext(CollectionsContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { items, fetchItems } = useContext(ItemsContext);
    const { focusOnMainInput } = useContext(MainViewContext);
    const {
        trySwitchToCollectionByNumricKey,
        switchToCollectionBySlug,
        tryNavigateToCollection,
    } = useCollectionNavActions();
    const { collectionSlug } = useParams();


    const navigate = useNavigate();

    const mainInputRef = useRef<HTMLInputElement>(null);
    useHotkeys([
        ["mod+F", () => focusOnMainInput(mainInputRef)],
        ["1", () => trySwitchToCollectionByNumricKey(1)],
        ["2", () => trySwitchToCollectionByNumricKey(2)],
        ["3", () => trySwitchToCollectionByNumricKey(3)],
        ["4", () => trySwitchToCollectionByNumricKey(4)],
        ["5", () => trySwitchToCollectionByNumricKey(5)],
        ["6", () => trySwitchToCollectionByNumricKey(6)],
        ["7", () => trySwitchToCollectionByNumricKey(7)],
        ["8", () => trySwitchToCollectionByNumricKey(8)],
        ["9", () => trySwitchToCollectionByNumricKey(9)],
        ["0", () => trySwitchToCollectionByNumricKey(0)],
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
        fetchCollections();
    }, [isLoggedIn]);

    useEffect(() => {
        if (!collections) return;
        if (!collectionSlug) tryNavigateToCollection(collections[0]);
        if (collectionSlug === currCollection?.slug) return;

        switchToCollectionBySlug(collectionSlug);
    }, [collections]);

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
        <CollectionMenu isInMainView={true} />

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
