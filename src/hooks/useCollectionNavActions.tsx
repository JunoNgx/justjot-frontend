import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { ItemCollection } from "@/types";
import { useNavigate } from "react-router-dom";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { APP_NAME } from "@/utils/constants";
import { isValidIndex } from "@/utils/miscUtils";
import useNumericHotkeyUtils from "@/hooks/useNumericHotkeyUtils";

export default function useCollectionNavActions() {
    const { user } = useContext(BackendClientContext);
    const {
        collections,
        setCurrCollection,
        currSelectedCollectionIndex,
        setCurrSelectedCollectionIndex,
    } = useContext(CollectionsContext);
    const { computeIndexFromNumericKey } = useNumericHotkeyUtils();

    const navigate = useNavigate();

    const trySwitchToCollectionById = (collectionId: string) => {
        const targetIndex = collections?.findIndex(c => c.id === collectionId);
        if (targetIndex === -1) return;

        const targetCollection = collections?.[targetIndex];
        if (!targetCollection) return;

        tryNavigateToCollection(targetCollection, targetIndex);
    };

    const trySwitchToCollectionBySlug = (collectionSlug?: string) => {
        if (!collectionSlug) return;

        const targetIndex = collections?.findIndex(c => c.slug === collectionSlug);
        if (targetIndex === -1) {
            tryNavigateToCollection(collections![0], 0);
            return;
        }

        const targetCollection = collections?.[targetIndex];
        if (!targetCollection) return;

        tryNavigateToCollection(targetCollection, targetIndex);
    };

    const trySwitchToCollectionByNumericKey = (inputNumber: number) => {
        const targetIndex = computeIndexFromNumericKey(inputNumber);
        if (targetIndex === -1) return;

        trySwitchToCollectionByIndex(targetIndex);
    };

    const trySwitchToPrevCollection = () => {
        if (currSelectedCollectionIndex === 0) return;

        trySwitchToCollectionByIndex(currSelectedCollectionIndex - 1);
    }

    const trySwitchToNextCollection = () => {
        if (currSelectedCollectionIndex === collections?.length! - 1)
            return;

        trySwitchToCollectionByIndex(currSelectedCollectionIndex + 1);
    }

    const trySwitchToCollectionByIndex = (index: number) => {
        if (!isValidIndex(index)) return;

        const targetCollection = collections?.[index];
        if (!targetCollection) return;
        tryNavigateToCollection(targetCollection, index);
    };

    const tryNavigateToCollection = (
        collection: ItemCollection, index: number
    ) => {

        setCurrCollection(collection);
        setCurrSelectedCollectionIndex(index);

        navigate(`/${user?.username}/${collection.slug}`);
        document.title = `${collection.name} — ${APP_NAME}`;
    };

    const tryRetrackCurrentSelectedIndexWithId = (currCollection?: ItemCollection) => {
        if (!currCollection) return;
        if (collections.length === 0) return;

        const targetIndex = collections.findIndex(c => c.id === currCollection!.id);
        setCurrSelectedCollectionIndex(targetIndex);
    };

    return {
        trySwitchToCollectionById,
        trySwitchToCollectionBySlug,
        trySwitchToCollectionByNumericKey,
        trySwitchToPrevCollection,
        trySwitchToNextCollection,
        trySwitchToCollectionByIndex,
        tryNavigateToCollection,
        tryRetrackCurrentSelectedIndexWithId,
    }
};
