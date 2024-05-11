import ProfileAccountDeletion from "@/components/profile/ProfileAccountDeletion";
import ProfileChangeDisplayName from "@/components/profile/ProfileChangeDisplayName";
import ProfileChangeEmail from "@/components/profile/ProfileChangeEmail";
import ProfileChangePassword from "@/components/profile/ProfileChangePassword";
import ProfileFaviconCookies from "@/components/profile/ProfileFaviconCookies";
import ProfileTestAccountNotice from "@/components/profile/ProfileTestAccountNotice";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { APP_NAME } from "@/utils/constants";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Pages.scss";

export default function Profile() {

    const { isLoggedIn, isDemoUser, refreshAuth } = useContext(BackendClientContext);
    const { setCurrCollection } = useContext(CollectionsContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
            return;
        }

        refreshAuth();

        setCurrCollection(undefined);
        document.title = `Account — ${APP_NAME}`;
    }, []);

    return <div className="Cardlike Cardlike--WithBottomMargin">
        {isLoggedIn &&
            <>
                <h2>Account management</h2>
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
    </div>
}