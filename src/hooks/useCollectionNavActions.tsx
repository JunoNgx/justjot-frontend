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
    const { setCurrCollection } = useContext(CurrentCollectionContext);
    const { currentSelectedCollectionIndexRef } = useContext(CurrentCollectionContext);

    const navigate = useNavigate();

    const trySwitchToCollectionById = (collectionId: string) => {
        const index = collections?.map(c => c.id)
            .indexOf(collectionId);

        if (index === -1) return;

        const targetCollection = collections?.[index!];
        tryNavigateToCollection(targetCollection);
    };

    const trySwitchToCollectionBySlug = (collectionSlug?: string) => {
        if (!collectionSlug) return;

        const index = collections?.map(c => c.slug)
            .indexOf(collectionSlug);

        if (index === -1) {
            tryNavigateToCollection(collections![0]);
            return;
        }

        const targetCollection = collections?.[index!];
        tryNavigateToCollection(targetCollection);
    };

    const trySwitchToCollectionByNumericKey = (inputNumber: number) => {
        let transcribedIndex;
        if (inputNumber < 0 || inputNumber > 9) return;
        else if (inputNumber === 0) transcribedIndex = 9;
        else transcribedIndex = inputNumber - 1;

        trySwitchToCollectionByIndex(transcribedIndex);
    };

    const trySwitchToPrevCollection = () => {
        if (!isValidIndex(currentSelectedCollectionIndexRef?.current)) return;
        if (currentSelectedCollectionIndexRef?.current === 0) return;

        // @ts-expect-error
        currentSelectedCollectionIndexRef.current -= 1;
        trySwitchToCollectionByIndex(currentSelectedCollectionIndexRef?.current!);
    }

    const trySwitchToNextCollection = () => {
        if (!isValidIndex(currentSelectedCollectionIndexRef?.current)) return;
        if (currentSelectedCollectionIndexRef?.current === collections?.length! - 1) return;

        // @ts-expect-error
        currentSelectedCollectionIndexRef.current += 1;
        trySwitchToCollectionByIndex(currentSelectedCollectionIndexRef?.current!);
    }

    const trySwitchToCollectionByIndex = (index: number) => {
        if (!isValidIndex(index)) return;

        const targetCollection = collections?.[index];
        if (!targetCollection) return;
        tryNavigateToCollection(targetCollection);
    };

    const tryNavigateToCollection = (collection?: ItemCollection) => {
        if (!collection) return;

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
        tryNavigateToCollection,
    }
};
