import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { ItemCollection } from "@/types";
import { useNavigate } from "react-router-dom";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import useNumericHotkeyUtils from "@/hooks/useNumericHotkeyUtils";

export default function useCollectionNavActions() {
    const { user } = useContext(BackendClientContext);
    const {
        collectionList,
        setCurrCollection,
        collSelectedIndex,
    } = useContext(CollectionsContext);
    const { computeIndexFromNumericKey } = useNumericHotkeyUtils();

    const navigate = useNavigate();

    const trySwitchToCollectionById = (collectionId: string) => {
        const targetCollection = collectionList.find(c => c?.id === collectionId);
        if (!targetCollection) return;

        tryNavigateToCollection(targetCollection);
    };

    /**
     * Only used by MainView with useEffect
     */
    const trySwitchToCollectionBySlug = (collectionSlug?: string) => {
        if (!collectionSlug) return;

        const targetCollection =
            collectionList.find(c => c?.slug === collectionSlug);
        if (!targetCollection) {
            trySwitchToCollectionByIndex(0);
            return;
        }

        tryNavigateToCollection(targetCollection);
    };

    const trySwitchToCollectionByNumericKey = (inputNumber: number) => {
        const targetIndex = computeIndexFromNumericKey(inputNumber);
        if (targetIndex === -1) return;

        trySwitchToCollectionByIndex(targetIndex);
    };

    const trySwitchToPrevCollection = () => {
        if (collSelectedIndex === 0) return;

        trySwitchToCollectionByIndex(collSelectedIndex - 1);
    }

    const trySwitchToNextCollection = () => {
        if (collSelectedIndex === collectionList?.length - 1) return;

        trySwitchToCollectionByIndex(collSelectedIndex + 1);
    }

    const trySwitchToCollectionByIndex = (index: number) => {
        if (index < 0) return;

        const targetCollection = collectionList?.[index];
        if (!targetCollection) return;
        tryNavigateToCollection(targetCollection);
    };

    const tryNavigateToCollection = (collection: ItemCollection) => {
        setCurrCollection(collection);

        navigate(`/${user?.username}/${collection.slug}`);
    };

    return {
        trySwitchToCollectionById,
        trySwitchToCollectionBySlug,
        trySwitchToCollectionByNumericKey,
        trySwitchToPrevCollection,
        trySwitchToNextCollection,
        trySwitchToCollectionByIndex,
        tryNavigateToCollection,
    }
}
