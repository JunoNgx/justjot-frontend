import ProfileAccountDeletion from "@/components/profile/ProfileAccountDeletion";
import ProfileChangeDisplayName from "@/components/profile/ProfileChangeDisplayName";
import ProfileChangeEmail from "@/components/profile/ProfileChangeEmail";
import ProfileChangePassword from "@/components/profile/ProfileChangePassword";
import ProfileFaviconCookies from "@/components/profile/ProfileFaviconCookies";
import ProfileTestAccountNotice from "@/components/profile/ProfileTestAccountNotice";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { APP_NAME } from "@/utils/constants";
import { useContext, useEffect } from "react";

import "./Pages.scss";

export default function Profile() {
    const { isLoggedIn, isDemoUser, refreshAuth } =
        useContext(BackendClientContext);

    useEffect(() => {
        refreshAuth();
    }, []);

    return (
        <div className="Cardlike Cardlike--WithBottomMargin">
            <title>{`Account — ${APP_NAME}`}</title>

            {isLoggedIn && (
                <>
                    <h2>Account management</h2>
                    <ProfileFaviconCookies />
                    <ProfileChangeDisplayName />
                    {isDemoUser ? (
                        <ProfileTestAccountNotice />
                    ) : (
                        <>
                            <ProfileChangeEmail />
                            <ProfileChangePassword />
                            <ProfileAccountDeletion />
                        </>
                    )}
                </>
            )}
        </div>
    );
}
