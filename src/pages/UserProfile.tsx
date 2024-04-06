import ProfileChangeDisplayName from "@/components/profile/ProfileChangeDisplayName";
import ProfileChangeEmail from "@/components/profile/ProfileChangeEmail";
import ProfileChangePassword from "@/components/profile/ProfileChangePassword";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import { Box } from "@mantine/core";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {

    const { isLoggedIn } = useContext(BackendClientContext);
    const { setCurrCollection } = useContext(CurrentCollectionContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
            return;
        }

        setCurrCollection(undefined);
    }, []);

    return <Box>
        {isLoggedIn &&
            <>
                <ProfileChangeDisplayName/>
                <ProfileChangePassword/>
                <ProfileChangeEmail/>
            </>
        }
    </Box>
};