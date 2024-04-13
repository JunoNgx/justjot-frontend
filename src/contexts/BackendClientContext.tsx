import { DbTable, User } from '@/types';
import { TEST_ACC_USERNAME } from '@/utils/constants';
import PocketBase, { AuthModel } from 'pocketbase';
import { ReactNode, SetStateAction, createContext, useCallback, useState } from 'react';

type BackendClientContextType = {
    pbClient: PocketBase,
    user: AuthModel & User,
    setUser: React.Dispatch<SetStateAction<User>>,
    isLoggedIn: boolean,
    logout: () => void,
    isDemoUser: boolean,
    refreshAuth: () => void,
};

export const BackendClientContext = createContext<BackendClientContextType>(
    {} as BackendClientContextType);

export default function BackendClientContextProvider({ children }: { children: ReactNode }) {
    const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);

    const [user, setUser] = useState<User>(pbClient.authStore.model as User);

    const logout = useCallback(() => {
        pbClient.authStore.clear();
        setUser(null);
    }, []);

    const isDemoUser = user?.username === TEST_ACC_USERNAME;
    const refreshAuth = async () => {
        await pbClient.collection(DbTable.USERS).authRefresh();
        setUser(pbClient.authStore.model as User);
    };

    return <BackendClientContext.Provider value={{
        pbClient,
        user,
        setUser,
        isLoggedIn: pbClient.authStore.isValid,
        logout,
        isDemoUser,
        refreshAuth,
    }}>
        {children}
    </BackendClientContext.Provider>
}