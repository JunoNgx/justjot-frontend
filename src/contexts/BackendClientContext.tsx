import PocketBase from 'pocketbase';
// import User, { BaseAuthStore } from 'pocketbase';
import { ReactNode, createContext } from 'react';

// type AuthContextType = { authStore: BaseAuthStore } | null;
// type BackendClientType = { pbClient: PocketBase };

// export const AuthContext = createContext<AuthContextType>(null);
export const BackendClientContext = createContext<PocketBase>(
    new PocketBase(import.meta.env.VITE_BACKEND_URL));

export default function BackendClientContextProvider({children}: {children: ReactNode}) {
    const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);
    // const authStore = pbClient.authStore;

    return <BackendClientContext.Provider value={ pbClient }>
        {children}
    </BackendClientContext.Provider>
}