import { useContext, useEffect, useRef } from "react";
import { Box, Stack } from '@mantine/core';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import MainInput from "@/components/MainInput";
import { ItemsContext } from "@/contexts/ItemsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { useHotkeys } from "@mantine/hooks";
import { MainViewContext } from "@/contexts/MainViewContext";
import useCollectionNavActions from "@/hooks/useCollectionNavActions";
import CollectionMenu from "@/components/CollectionMenu";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import useNumericHotkeyUtils from "@/hooks/useNumericHotkeyUtils";
import FilterableItemList from "@/components/FilterableItemList";

export default function MainView() {
    const { isLoggedIn } = useContext(BackendClientContext);
    const { collections, fetchCollections } = useContext(CollectionsContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const { fetchItems } = useContext(ItemsContext);
    const { focusOnMainInput } = useContext(MainViewContext);
    const {
        trySwitchToCollectionBySlug,
        trySwitchToCollectionByNumericKey,
        trySwitchToPrevCollection,
        trySwitchToNextCollection,
        trySwitchToCollectionByIndex,
        tryRetrackCurrentSelectedIndexWithId,
    } = useCollectionNavActions();
    const { collectionSlug } = useParams();
    const { generateNumericHotkeyHandlers } = useNumericHotkeyUtils();

    const navigate = useNavigate();
    const mainInputRef = useRef<HTMLInputElement>(null);
    const numericKeysHotkeyOptions = generateNumericHotkeyHandlers({
        callback: (inputKey: number) => {
            /**
             * TODO: mildly hacky solution.
             * To consider refactor this with a context variable.
             */
            const hasActiveModal = document.querySelectorAll(".mantine-Modal-overlay").length > 0;
            if (hasActiveModal) return;

            trySwitchToCollectionByNumericKey(inputKey);
        },
    });
    useHotkeys([
        ["mod+F", () => focusOnMainInput(mainInputRef), { preventDefault: true }],
        ["ArrowLeft", trySwitchToPrevCollection],
        ["ArrowRight", trySwitchToNextCollection],
        ...numericKeysHotkeyOptions
    ]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
            return;
        }

        fetchCollections();

        window.addEventListener("focus", tryRoutineUpdate);
        return () => {
            window.removeEventListener("focus", tryRoutineUpdate);
        };
    }, []);

    useEffect(() => {
        if (collections.length === 0) return;
        if (!collectionSlug) {
            trySwitchToCollectionByIndex(0)
            return;
        };
        if (collectionSlug === currCollection?.slug) return;

        trySwitchToCollectionBySlug(collectionSlug);
    }, [collections]);

    useEffect(() => {
        if (!currCollection) return;
        fetchItems(currCollection);
    }, [currCollection]);

    useEffect(() => {
        tryRetrackCurrentSelectedIndexWithId(currCollection);
    }, [currCollection, collections]);

    const lastRoutineUpdateTimestamp = useRef<number>(Date.now());
    const tryRoutineUpdate = () => {
        if (Date.now() - lastRoutineUpdateTimestamp.current >= 120000) {
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
                <FilterableItemList/>
            </Stack>
        </Stack>
    </Box>
}
