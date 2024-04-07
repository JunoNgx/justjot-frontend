import { CollectionsContext } from "@/contexts/CollectionsContext";
import { useContext, useEffect } from "react";

export default function Help() {
    const { setCurrCollection } = useContext(CollectionsContext);

    useEffect(() => {
        setCurrCollection(undefined);
    });

    return <>
        <h1>Help route</h1>
    </>
}
