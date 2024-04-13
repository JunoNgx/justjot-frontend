import ProfileAccountDeletion from "@/components/profile/ProfileAccountDeletion";
import ProfileChangeDisplayName from "@/components/profile/ProfileChangeDisplayName";
import ProfileChangeEmail from "@/components/profile/ProfileChangeEmail";
import ProfileChangePassword from "@/components/profile/ProfileChangePassword";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { APP_NAME } from "@/utils/constants";
import { Box } from "@mantine/core";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {

    const { isLoggedIn } = useContext(BackendClientContext);
    const { setCurrCollection } = useContext(CollectionsContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
            return;
        }

        setCurrCollection(undefined);
        document.title = `Account — ${APP_NAME}`;
    }, []);

    return <Box pb="xl">
        {isLoggedIn &&
            <>
                <ProfileChangeDisplayName/>
                <ProfileChangeEmail/>
                <ProfileChangePassword/>
                <ProfileAccountDeletion/>
            </>
        }
    </Box>
};