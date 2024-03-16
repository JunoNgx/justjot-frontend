import PocketBase, { AuthModel } from 'pocketbase';
// import User, { BaseAuthStore } from 'pocketbase';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { DbTable, Item, ItemCollection } from '../types';

// type AuthContextType = { authStore: BaseAuthStore } | null;
type BackendClientType = {
    pbClient: PocketBase,
    // authStore: BaseAuthStore | null,
    user: AuthModel,
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    logout: () => void,

    currCollection: ItemCollection | undefined,
    setCurrCollection: React.Dispatch<React.SetStateAction<ItemCollection | undefined>>,
    collections: ItemCollection[] | undefined,
    setCollections: React.Dispatch<React.SetStateAction<ItemCollection[] | undefined>>,
    items: Item[] | undefined,
    setItems: React.Dispatch<React.SetStateAction<Item[] | undefined>>,

    fetchItems: () => void,
};

// export const AuthContext = createContext<AuthContextType>(null);
export const BackendClientContext = createContext<BackendClientType>({
    pbClient: new PocketBase(import.meta.env.VITE_BACKEND_URL),
    // authStore: null,
    user: null,
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    logout: () => { },

    currCollection: undefined,
    setCurrCollection: () => { },
    collections: undefined,
    setCollections: () => { },
    items: undefined,
    setItems: () => { },

    fetchItems: () => { },
});

export default function BackendClientContextProvider({ children }: { children: ReactNode }) {
    const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);
    // const [ authStore, setAuthStore ] = useState(pbClient.authStore);
    const [isLoggedIn, setIsLoggedIn] = useState(pbClient.authStore.isValid);
    const logout = () => {
        pbClient.authStore.clear();
    };

    const [currCollection, setCurrCollection] = useState<ItemCollection>();
    const [collections, setCollections] = useState<ItemCollection[]>();
    const [items, setItems] = useState<Item[]>();

    useEffect(() => {
        if (!isLoggedIn) return;
        fetchCollections();
    }, []);

    useEffect(() => {
        if (!collections) return;
        // TODO calculate based on param slug
        setCurrCollection(collections![0]);
    }, [collections]);

    useEffect(() => {
        if (!currCollection) return;
        fetchItems();
    }, [currCollection]);

    const fetchCollections = async () => {
        await pbClient
            // .cancelAllRequests()
            .collection(DbTable.COLLECTIONS)
            .getFullList({
                sort: "sortOrder"
            })
            .then((records: ItemCollection[]) => {
                setCollections(records);
            })
            .catch(error => {
                console.error(error)
            });
    };

    const fetchItems = async () => {
        await pbClient
            // .cancelAllRequests()
            .collection(DbTable.ITEMS)
            .getFullList({
                // Single relation can be used without specifying the id
                filter: `collection="${currCollection?.id}"`,
                sort: "-created"
            })
            .then((records: Item[]) => {
                setItems(records);
            })
            .catch(error => {
                console.error(error);
            })
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
            logout,

            currCollection,
            setCurrCollection,
            collections,
            setCollections,
            items,
            setItems,

            fetchItems,
        }}
    >
        {children}
    </BackendClientContext.Provider>
}