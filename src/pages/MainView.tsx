import { useContext, useEffect, useRef, useState } from "react";
import { Box, Stack } from '@mantine/core';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import MainInput from "@/components/MainInput";
import { ItemsContext } from "@/contexts/ItemsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { useHotkeys } from "@mantine/hooks";
import useCollectionNavActions from "@/hooks/useCollectionNavActions";
import CollectionMenu from "@/components/CollectionMenu";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import useNumericHotkeyUtils from "@/hooks/useNumericHotkeyUtils";
import ItemComponent from "@/components/itemComponent/ItemComponent";
import ItemSkeleton from "@/components/itemComponent/ItemSkeleton";

export default function MainView() {
    const { isLoggedIn } = useContext(BackendClientContext);
    const { collections, fetchCollections } = useContext(CollectionsContext);
    const { currCollection } = useContext(CurrentCollectionContext);
    const {
        fetchItems,
        focusOnMainInput,
        filteredItems,
    } = useContext(ItemsContext);
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
    const [ isLoading, setIsLoading ] = useState(false);
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
    const lastRoutineUpdateTimestamp = useRef<number>(Date.now());
    const tryRoutineUpdate = () => {
        if (Date.now() - lastRoutineUpdateTimestamp.current >= 120000) {
            fetchItems(currCollection);
            lastRoutineUpdateTimestamp.current = Date.now();
        }
    }

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
        fetchItems(currCollection, setIsLoading);
    }, [currCollection]);

    useEffect(() => {
        tryRetrackCurrentSelectedIndexWithId(currCollection);
    }, [currCollection, collections]);

    const filteredItemList = filteredItems?.map((item, index) =>
        <ItemComponent
            key={item.id}
            item={item}
            index={index}
        />
    );
    const SkeletonList = Array(7).fill(null).map((_, index) => 
        <ItemSkeleton key={index}/>
    );

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
                {isLoading
                    ? SkeletonList
                    : filteredItemList
                }
            </Stack>
        </Stack>
    </Box>
}
