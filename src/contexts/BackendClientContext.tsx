import { User } from '@/types';
import PocketBase, { AuthModel } from 'pocketbase';
import { ReactNode, SetStateAction, createContext, useCallback, useState } from 'react';

type BackendClientContextType = {
    pbClient: PocketBase,
    user: AuthModel & User,
    setUser: React.Dispatch<SetStateAction<User>>,
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    logout: () => void,
};

export const BackendClientContext = createContext<BackendClientContextType>(
    {} as BackendClientContextType);

export default function BackendClientContextProvider({ children }: { children: ReactNode }) {
    const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);

    const [isLoggedIn, setIsLoggedIn] = useState(pbClient.authStore.isValid);
    const [user, setUser] = useState<User>(pbClient.authStore.model as User);

    const logout = useCallback(() => {
        pbClient.authStore.clear();
        setIsLoggedIn(false);
    }, []);

    return <BackendClientContext.Provider value={{
        pbClient,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        logout,
    }}>
        {children}
    </BackendClientContext.Provider>
}