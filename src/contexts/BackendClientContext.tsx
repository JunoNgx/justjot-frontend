import PocketBase, { BaseAuthStore, AuthModel } from 'pocketbase';
// import User, { BaseAuthStore } from 'pocketbase';
import { ReactNode, createContext, useEffect, useState } from 'react';

// type AuthContextType = { authStore: BaseAuthStore } | null;
type BackendClientType = {
    pbClient: PocketBase,
    // authStore: BaseAuthStore | null,
    user: AuthModel,
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    logout: () => void
};

// export const AuthContext = createContext<AuthContextType>(null);
export const BackendClientContext = createContext<BackendClientType>({
    pbClient: new PocketBase(import.meta.env.VITE_BACKEND_URL),
    // authStore: null,
    user: null,
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    logout: () => {}
});

export default function BackendClientContextProvider({children}: {children: ReactNode}) {
    const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);
    // const [ authStore, setAuthStore ] = useState(pbClient.authStore);
    const [ isLoggedIn, setIsLoggedIn ] = useState(pbClient.authStore.isValid);
    const logout = () => {
        pbClient.authStore.clear();
    };

    // useEffect(() => {
    //     console.log("on mount backend context")
    //     pbClient.authStore.onChange((_token: any, _model: any) => {
    //         setIsLoggedIn(pbClient.authStore.isValid);
    //     });
    // }, []);

    return <BackendClientContext.Provider value=
        {{
            pbClient,
            user: pbClient.authStore.model,
            isLoggedIn,
            setIsLoggedIn,
            logout
        }}
    >
        {children}
    </BackendClientContext.Provider>
}