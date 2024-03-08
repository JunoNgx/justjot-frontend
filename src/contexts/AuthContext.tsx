import PocketBase from 'pocketbase';
import User, { BaseAuthStore } from 'pocketbase';
import { ReactNode, createContext } from 'react';


type AuthContextType = { authStore: BaseAuthStore } | null;

export const AuthContext = createContext<AuthContextType>(null);

export default function AuthContextProvider({children}: {children: ReactNode}) {
    const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);
    const authStore = pbClient.authStore;

    return <AuthContext.Provider value={ { authStore } }>
        {children}
    </AuthContext.Provider>
}