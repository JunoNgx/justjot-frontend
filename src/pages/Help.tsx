import { CollectionsContext } from "@/contexts/CollectionsContext";
import { APP_NAME } from "@/utils/constants";
import { useContext, useEffect } from "react";

export default function Help() {
    const { setCurrCollection } = useContext(CollectionsContext);

    useEffect(() => {
        setCurrCollection(undefined);
        document.title = `User Manual — ${APP_NAME}`;
    });

    return <>
        <h1>Help route</h1>
    </>
}
