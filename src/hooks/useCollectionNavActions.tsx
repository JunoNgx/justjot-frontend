import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { ItemCollection } from "@/types";
import { useNavigate } from "react-router-dom";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { APP_NAME } from "@/utils/constants";
import { isValidIndex } from "@/utils/miscUtils";
import useNumericHotkeyUtils from "@/hooks/useNumericHotkeyUtils";

export default function useCollectionNavActions() {
    const { user } = useContext(BackendClientContext);
    const { collections } = useContext(CollectionsContext);
    const {
        setCurrCollection,
        currSelectedCollectionIndex,
        setCurrSelectedCollectionIndex,
    } = useContext(CurrentCollectionContext);
    const { computeIndexFromNumericKey } = useNumericHotkeyUtils();

    const navigate = useNavigate();

    const trySwitchToCollectionById = (collectionId: string) => {
        const index = collections?.map(c => c.id)
            .indexOf(collectionId);

        if (index === -1 || index === undefined || index === null) return;

        const targetCollection = collections?.[index];
        if (!targetCollection) return;

        tryNavigateToCollection(targetCollection, index);
    };

    const trySwitchToCollectionBySlug = (collectionSlug?: string) => {
        if (!collectionSlug) return;

        const index = collections?.map(c => c.slug)
            .indexOf(collectionSlug);

        if (index === -1 || index === undefined || index === null) {
            tryNavigateToCollection(collections![0], 0);
            return;
        }

        const targetCollection = collections?.[index];
        if (!targetCollection) return;

        tryNavigateToCollection(targetCollection, index);
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

        const index = collections.map(collection => collection.id)
            .indexOf(currCollection!.id);
        setCurrSelectedCollectionIndex(index);
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
