import ProfileAccountDeletion from "@/components/profile/ProfileAccountDeletion";
import ProfileChangeDisplayName from "@/components/profile/ProfileChangeDisplayName";
import ProfileChangeEmail from "@/components/profile/ProfileChangeEmail";
import ProfileChangePassword from "@/components/profile/ProfileChangePassword";
import ProfileFaviconCookies from "@/components/profile/ProfileFaviconCookies";
import ProfileTestAccountNotice from "@/components/profile/ProfileTestAccountNotice";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { APP_NAME } from "@/utils/constants";
import { Box } from "@mantine/core";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {

    const { isLoggedIn, isDemoUser } = useContext(BackendClientContext);
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
                <ProfileFaviconCookies />
                <ProfileChangeDisplayName/>
                {isDemoUser
                ? <ProfileTestAccountNotice />
                : <>
                    <ProfileChangeEmail/>
                    <ProfileChangePassword/>
                    <ProfileAccountDeletion/>
                </>}
            </>
        }
    </Box>
}