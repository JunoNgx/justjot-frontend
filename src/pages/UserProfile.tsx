import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { Text } from "@mantine/core";
import { useContext, useEffect } from "react";

export default function UserProfile() {

    const { setCurrCollection } = useContext(CurrentCollectionContext);

    useEffect(() => {
        setCurrCollection(undefined);
    });

    return <Text>User profile</Text>
};