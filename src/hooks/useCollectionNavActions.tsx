import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { MainViewContext } from "@/contexts/MainViewContext";
import { ItemCollection } from "@/types";
import { useNavigate } from "react-router-dom";
import { BackendClientContext } from "@/contexts/BackendClientContext";

export default function useCollectionMenuActions() {
    const { user } = useContext(BackendClientContext);
    const { collections,  } = useContext(CollectionsContext);
    const { setCurrCollection } = useContext(CurrentCollectionContext);
    const { deselectItem } = useContext(MainViewContext);

    const navigate = useNavigate();

    const switchToCollectionById = (collectionId: string) => {
        const index = collections?.map(c => c.id)
            .indexOf(collectionId);

        if (index === -1) return;

        const targetCollection = collections?.[index!];
        setCurrCollection(targetCollection);
        deselectItem();
    };

    const switchToCollectionBySlug = (collectionSlug?: string) => {
        if (!collectionSlug) return;

        const index = collections?.map(c => c.slug)
            .indexOf(collectionSlug);

        if (index === -1) return;

        const targetCollection = collections?.[index!];
        setCurrCollection(targetCollection);
        deselectItem();
    };

    const switchToCollectionByNumricKey = (inputNumber: number) => {
        let transcribedIndex;
        if (inputNumber < 0 || inputNumber > 9) return;
        else if (inputNumber === 0) transcribedIndex = 9;
        else transcribedIndex = inputNumber - 1;

        const targetCollection = collections?.[transcribedIndex];
        if (!targetCollection) return;
        setCurrCollection(targetCollection);
        deselectItem();
    };

    const tryNavigateToCollection = (collection?: ItemCollection) => {
        if (!collection) return;

        setCurrCollection(collection);
        deselectItem();
        navigate(`/${user?.username}/${collection.slug}`);
    };

    return {
        switchToCollectionById,
        switchToCollectionBySlug,
        switchToCollectionByNumricKey,
        tryNavigateToCollection,
    }
};
