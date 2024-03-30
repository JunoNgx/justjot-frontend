import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { ItemCollection } from "@/types";
import { useNavigate } from "react-router-dom";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { APP_NAME } from "@/utils/constants";
import { isValidIndex } from "@/utils/miscUtils";

export default function useCollectionNavActions() {
    const { user } = useContext(BackendClientContext);
    const { collections } = useContext(CollectionsContext);
    const { currCollection, setCurrCollection } = useContext(CurrentCollectionContext);
    const { currentSelectedCollectionIndexRef } = useContext(CurrentCollectionContext);

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
        let transcribedIndex;
        if (inputNumber < 0 || inputNumber > 9) return;
        else if (inputNumber === 0) transcribedIndex = 9;
        else transcribedIndex = inputNumber - 1;

        trySwitchToCollectionByIndex(transcribedIndex);
    };

    const trySwitchToPrevCollection = () => {
        if (!currentSelectedCollectionIndexRef) return;
        if (currentSelectedCollectionIndexRef.current === 0
            || currentSelectedCollectionIndexRef.current === undefined
            || currentSelectedCollectionIndexRef.current === null
        ) return;

        trySwitchToCollectionByIndex(currentSelectedCollectionIndexRef?.current - 1);
    }

    const trySwitchToNextCollection = () => {
        console.log("trySwitchToNextCollection")
        if (!currentSelectedCollectionIndexRef) return;
        if (currentSelectedCollectionIndexRef.current === collections?.length! - 1
            || currentSelectedCollectionIndexRef.current === undefined
            || currentSelectedCollectionIndexRef.current === null
        ) return;

        trySwitchToCollectionByIndex(currentSelectedCollectionIndexRef?.current + 1);
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
        if (!currentSelectedCollectionIndexRef) return;

        setCurrCollection(collection);
        currentSelectedCollectionIndexRef.current = index;

        navigate(`/${user?.username}/${collection.slug}`);
        document.title = `${collection.name} — ${APP_NAME}`;
    };

    const tryRetrackCurrentSelectedIndex = () => {
        const index = collections.map(collection => collection.id)
            .indexOf(currCollection!.id);
        currentSelectedCollectionIndexRef!.current = index;
    };

    return {
        trySwitchToCollectionById,
        trySwitchToCollectionBySlug,
        trySwitchToCollectionByNumericKey,
        trySwitchToPrevCollection,
        trySwitchToNextCollection,
        trySwitchToCollectionByIndex,
        tryNavigateToCollection,
        tryRetrackCurrentSelectedIndex,
    }
};
