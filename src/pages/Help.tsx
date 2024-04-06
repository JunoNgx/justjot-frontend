import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { useContext, useEffect } from "react";

export default function Help() {
    const { setCurrCollection } = useContext(CurrentCollectionContext);

    useEffect(() => {
        setCurrCollection(undefined);
    });

    return <h1>Help route</h1>
}
