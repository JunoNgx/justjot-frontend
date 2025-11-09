import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { useParams } from "react-router-dom";
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

import "./MainView.scss";
import { APP_NAME } from "@/utils/constants";

export default function MainView() {
    const { isDemoUser, refreshAuth } = useContext(BackendClientContext);
    const { initCollections, currCollection, isTrashCollection } =
        useContext(CollectionsContext);
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
    const mainInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const numericKeysHotkeyOptions = generateNumericHotkeyHandlers({
        callback: (inputKey: number) => {
            /**
             * TODO: mildly hacky solution.
             * To consider refactor this with a context variable.
             */
            const hasActiveModal =
                document.querySelectorAll(".mantine-Modal-overlay").length > 0;
            if (hasActiveModal) return;

            trySwitchToCollectionByNumericKey(inputKey);
        },
    });

    useHotkeys([
        [
            "mod+F",
            () => focusOnMainInput(mainInputRef),
            { preventDefault: true },
        ],
        ["ArrowLeft", trySwitchToPrevCollection],
        ["ArrowRight", trySwitchToNextCollection],
        ...numericKeysHotkeyOptions,
    ]);

    useEffect(() => {
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
    };

    useEffect(() => {
        if (initCollections.length === 0) return;
        if (!collectionSlug) {
            trySwitchToCollectionByIndex(0);
            return;
        }
        if (collectionSlug === currCollection?.slug) return;

        trySwitchToCollectionBySlug(collectionSlug);
    }, [initCollections]);

    useEffect(() => {
        if (!currCollection) return;
        fetchItems(currCollection, setIsLoading);
    }, [currCollection]);

    const mainViewTitle = useMemo(() => {
        return currCollection?.name
            ? `${currCollection?.name} — ${APP_NAME}`
            : APP_NAME;
    }, [currCollection]);

    return (
        <div className="MainView" id="MainView">
            <title>{mainViewTitle}</title>

            {/* For non-item components */}
            <CollectionMenu isMobile={true} />
            <KeyboardPromptDisplay />
            <div className="MainView__NoticeContainer">
                {isDemoUser && (
                    <MainViewNotice content="You are using the test account. Data are periodically reset." />
                )}
                {isTrashCollection && (
                    <MainViewNotice content="Items in the trash bin are permanently deleted after 7 days." />
                )}
            </div>

            <div className="MainView__Main" onFocus={() => tryRoutineUpdate()}>
                <MainInput ref={mainInputRef} />
                <div className="MainView__ItemList" id="DisplayItems">
                    <MainContentList
                        isLoading={isLoading}
                        filteredItems={filteredItems}
                    />
                </div>
            </div>
        </div>
    );
}
