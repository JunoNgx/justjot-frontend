import { DbTable, User } from "@/types";
import { AUTO_CLOSE_ERROR_TOAST, TEST_ACC_USERNAME } from "@/utils/constants";
import { notifications } from "@mantine/notifications";
import PocketBase, { AuthModel } from "pocketbase";
import { ReactNode, SetStateAction, createContext, useState } from "react";

type BackendClientContextType = {
    pbClient: PocketBase;
    user: AuthModel & User;
    setUser: React.Dispatch<SetStateAction<User>>;
    isLoggedIn: boolean;
    logout: () => void;
    isDemoUser: boolean;
    refreshAuth: () => void;
};

export const BackendClientContext = createContext<BackendClientContextType>(
    {} as BackendClientContextType
);

export default function BackendClientContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);

    const [user, setUser] = useState<User>(pbClient.authStore.record as User);

    const logout = () => {
        pbClient.authStore.clear();
        setUser(null);
    };

    const isDemoUser = user?.username === TEST_ACC_USERNAME;
    const refreshAuth = async () => {
        await pbClient
            .collection(DbTable.USERS)
            .authRefresh()
            .catch((err) => {
                if (err?.status === 401) {
                    notifications.show({
                        message: "Auth token expired; please re-login",
                        color: "red",
                        autoClose: AUTO_CLOSE_ERROR_TOAST,
                        withCloseButton: true,
                    });
                }
            });
        setUser(pbClient.authStore.record as User);
    };

    return (
        <BackendClientContext
            value={{
                pbClient,
                user,
                setUser,
                isLoggedIn: pbClient.authStore.isValid,
                logout,
                isDemoUser,
                refreshAuth,
            }}
        >
            {children}
        </BackendClientContext>
    );
}
