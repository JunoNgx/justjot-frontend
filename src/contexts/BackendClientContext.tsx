import PocketBase, { AuthModel } from 'pocketbase';
import { ReactNode, createContext, useCallback, useState } from 'react';

type BackendClientContextType = {
    pbClient: PocketBase,
    user: AuthModel,
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    logout: () => void,
};

export const BackendClientContext = createContext<BackendClientContextType>({
    pbClient: new PocketBase(import.meta.env.VITE_BACKEND_URL),
    user: null,
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    logout: () => {},
});

export default function BackendClientContextProvider({ children }: { children: ReactNode }) {
    const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);

    const [isLoggedIn, setIsLoggedIn] = useState(pbClient.authStore.isValid);
    const logout = useCallback(() => {
        pbClient.authStore.clear();
        setIsLoggedIn(false);
    }, []);

    return <BackendClientContext.Provider value={{
        pbClient,
        user: pbClient.authStore.model,
        isLoggedIn,
        setIsLoggedIn,
        logout,
    }}>
        {children}
    </BackendClientContext.Provider>
}