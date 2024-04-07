import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { ItemCollection } from "@/types";
import { useNavigate } from "react-router-dom";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { APP_NAME } from "@/utils/constants";
import useNumericHotkeyUtils from "@/hooks/useNumericHotkeyUtils";

export default function useCollectionNavActions() {
    const { user } = useContext(BackendClientContext);
    const {
        collections,
        setCurrCollection,
        collSelectedIndex,
    } = useContext(CollectionsContext);
    const { computeIndexFromNumericKey } = useNumericHotkeyUtils();

    const navigate = useNavigate();

    const trySwitchToCollectionById = (collectionId: string) => {
        const targetCollection = collections.find(c => c.id === collectionId);
        if (!targetCollection) return;

        tryNavigateToCollection(targetCollection);
    };

    const trySwitchToCollectionBySlug = (collectionSlug?: string) => {
        if (!collectionSlug) return;

        const targetCollection = collections.find(c => c.slug === collectionSlug);
        if (!targetCollection) return;

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
        if (collSelectedIndex === collections?.length! - 1) return;

        trySwitchToCollectionByIndex(collSelectedIndex + 1);
    }

    const trySwitchToCollectionByIndex = (index: number) => {
        if (index < 0) return;

        const targetCollection = collections?.[index];
        if (!targetCollection) return;
        tryNavigateToCollection(targetCollection);
    };

    const tryNavigateToCollection = (
        collection: ItemCollection
    ) => {
        setCurrCollection(collection);

        navigate(`/${user?.username}/${collection.slug}`);
        document.title = `${collection.name} — ${APP_NAME}`;
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
};
