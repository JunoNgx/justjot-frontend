import ProfileChangeDisplayName from "@/components/profile/ProfileChangeDisplayName";
import ProfileChangeEmail from "@/components/profile/ProfileChangeEmail";
import ProfileChangePassword from "@/components/profile/ProfileChangePassword";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { Box } from "@mantine/core";
import { useContext, useEffect } from "react";

export default function UserProfile() {

    const { setCurrCollection } = useContext(CurrentCollectionContext);

    useEffect(() => {
        setCurrCollection(undefined);
    });

    return <Box>
        <ProfileChangeDisplayName/>
        <ProfileChangePassword/>
        <ProfileChangeEmail/>
    </Box>
};