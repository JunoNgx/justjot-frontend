import { User } from '@/types';
import PocketBase, { AuthModel } from 'pocketbase';
import { ReactNode, SetStateAction, createContext, useCallback, useState } from 'react';

type BackendClientContextType = {
    pbClient: PocketBase,
    user: AuthModel & User,
    setUser: React.Dispatch<SetStateAction<User>>,
    isLoggedIn: boolean,
    logout: () => void,
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

    return <BackendClientContext.Provider value={{
        pbClient,
        user,
        setUser,
        isLoggedIn: pbClient.authStore.isValid,
        logout,
    }}>
        {children}
    </BackendClientContext.Provider>
}