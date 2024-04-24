import { useContext, useEffect, useRef, useState } from "react";
import { Box, Stack } from '@mantine/core';
import { BackendClientContext } from '@/contexts/BackendClientContext';
import { useNavigate, useParams } from 'react-router-dom';
import MainInput from "@/components/MainInput";
import { ItemsContext } from "@/contexts/ItemsContext";
import { useHotkeys } from "@mantine/hooks";
import useCollectionNavActions from "@/hooks/useCollectionNavActions";
import CollectionMenu from "@/components/CollectionMenu";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import useNumericHotkeyUtils from "@/hooks/useNumericHotkeyUtils";
import useItemNavActions from "@/hooks/useItemNavActions";
import MainContentList from "@/components/MainContentList";
import KeyboardPromptDisplay from "@/components/KeyboardPromptDisplay";
import MainViewNotice from "@/components/misc/MainViewNotice";

export default function MainView() {
    const { isLoggedIn, isDemoUser, refreshAuth } = useContext(BackendClientContext);
    const { collections, currCollection, isTrashCollection } = useContext(CollectionsContext);
    const { fetchItems, filteredItems } = useContext(ItemsContext);
    const { focusOnMainInput } = useItemNavActions();
    const {
        trySwitchToCollectionBySlug,
        trySwitchToCollectionByNumericKey,
        trySwitchToPrevCollection,
        trySwitchToNextCollection,
        trySwitchToCollectionByIndex,
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

        refreshAuth();

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

    return <Box className="main-view-wrapper">
        {/* For non-item components */}
        <CollectionMenu isInMainView={true} />
        <KeyboardPromptDisplay />
        <Box className="main-view-notice">
            {isDemoUser && <MainViewNotice
                content="You are using the test account. Data are periodically reset."
            />}
            {isTrashCollection && <MainViewNotice
                content="Items in the Trash Bin are permanently deleted after 7 days."
            />}
        </Box>

        <Stack className="main-view"
            gap="xl"
            p="sm"
            onFocus={() => tryRoutineUpdate()}
        >
            <MainInput
                ref={mainInputRef}
            />
            <Stack className="main-view__items-container"
                id="displayed-list"
                gap="0.25rem"
            >
                <MainContentList
                    isLoading={isLoading}
                    filteredItems={filteredItems}
                />
            </Stack>
        </Stack>
    </Box>
}
