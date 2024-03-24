import { useContext } from "react";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { MainViewContext } from "@/contexts/MainViewContext";

export default function useCollectionMenuActions() {
    const { collections,  } = useContext(CollectionsContext);
    const { setCurrCollection } = useContext(CurrentCollectionContext);
    const { deselectItem } = useContext(MainViewContext);

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

    return {
        switchToCollectionById,
        switchToCollectionBySlug,
        switchToCollectionByNumricKey,
    }
};
