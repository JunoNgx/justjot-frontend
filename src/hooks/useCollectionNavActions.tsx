import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { MainViewContext } from "@/contexts/MainViewContext";
import { ItemCollection } from "@/types";
import { useNavigate } from "react-router-dom";
import { BackendClientContext } from "@/contexts/BackendClientContext";

export default function useCollectionNavActions() {
    const { user } = useContext(BackendClientContext);
    const { collections,  } = useContext(CollectionsContext);
    const { setCurrCollection } = useContext(CurrentCollectionContext);
    const { deselectItem } = useContext(MainViewContext);

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

        if (index === -1) return;

        const targetCollection = collections?.[index!];
        tryNavigateToCollection(targetCollection);
    };

    const trySwitchToCollectionByNumericKey = (inputNumber: number) => {
        let transcribedIndex;
        if (inputNumber < 0 || inputNumber > 9) return;
        else if (inputNumber === 0) transcribedIndex = 9;
        else transcribedIndex = inputNumber - 1;

        const targetCollection = collections?.[transcribedIndex];
        if (!targetCollection) return;
        tryNavigateToCollection(targetCollection);
    };

    const tryNavigateToCollection = (collection?: ItemCollection) => {
        if (!collection) return;

        setCurrCollection(collection);
        deselectItem();
        navigate(`/${user?.username}/${collection.slug}`);
    };

    return {
        trySwitchToCollectionById,
        trySwitchToCollectionBySlug,
        trySwitchToCollectionByNumericKey,
        tryNavigateToCollection,
    }
};
