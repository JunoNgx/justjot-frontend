import PocketBase, { AuthModel } from 'pocketbase';
// import User, { BaseAuthStore } from 'pocketbase';
import { ReactNode, createContext, useCallback, useState } from 'react';
// import { DbTable, Item, ItemCollection } from '../types';

// type AuthContextType = { authStore: BaseAuthStore } | null;
type BackendClientType = {
    pbClient: PocketBase,
    // authStore: BaseAuthStore | null,
    user: AuthModel,
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    logout: () => void,

    // currCollection: ItemCollection | undefined,
    // setCurrCollection: React.Dispatch<React.SetStateAction<ItemCollection | undefined>>,
    // collections: ItemCollection[] | undefined,
    // setCollections: React.Dispatch<React.SetStateAction<ItemCollection[] | undefined>>,
    // items: Item[] | undefined,
    // setItems: React.Dispatch<React.SetStateAction<Item[] | undefined>>,
    // currItem: Item | undefined,
    // setCurrItem: React.Dispatch<React.SetStateAction<Item | undefined>>,

    // fetchItems: () => void,
    // fetchCollections: () => void,
};

// export const AuthContext = createContext<AuthContextType>(null);
export const BackendClientContext = createContext<BackendClientType>({
    pbClient: new PocketBase(import.meta.env.VITE_BACKEND_URL),
    // authStore: null,
    user: null,
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    logout: () => { },

    // currCollection: undefined,
    // setCurrCollection: () => { },
    // collections: undefined,
    // setCollections: () => { },
    // items: undefined,
    // setItems: () => { },
    // currItem: undefined,
    // setCurrItem: () => { },

    // fetchItems: () => { },
    // fetchCollections: () => { },
});

export default function BackendClientContextProvider({ children }: { children: ReactNode }) {
    const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);
    // pbClient.autoCancellation(false);
    const [isLoggedIn, setIsLoggedIn] = useState(pbClient.authStore.isValid);
    const logout = useCallback(() => {
        pbClient.authStore.clear();
        setIsLoggedIn(false);
    }, []);

    // const [currCollection, setCurrCollection] = useState<ItemCollection>();
    // const [collections, setCollections] = useState<ItemCollection[]>();
    // const [items, setItems] = useState<Item[]>();
    // const [currItem, setCurrItem] = useState<Item>();

    // useEffect(() => {
    //     if (!isLoggedIn) return;
    //     fetchCollections();
    // }, []);

    // useEffect(() => {
    //     if (!collections) return;
    //     // TODO calculate based on param slug
    //     setCurrCollection(collections![0]);
    // }, [collections]);

    // useEffect(() => {
    //     if (!currCollection) return;
    //     fetchItems();
    // }, [currCollection]);

    // const fetchCollections = async () => {
    //     await pbClient
    //         // .cancelAllRequests()
    //         .collection(DbTable.COLLECTIONS)
    //         .getFullList({
    //             sort: "sortOrder"
    //         })
    //         .then((records: ItemCollection[]) => {
    //             setCollections(records);
    //         })
    //         .catch(error => {
    //             console.error(error)
    //         });
    // };

    // const fetchItems = async () => {
    //     await pbClient
    //         // .cancelAllRequests()
    //         .collection(DbTable.ITEMS)
    //         .getFullList({
    //             // Single relation can be used without specifying the id
    //             filter: `collection="${currCollection?.id}"`,
    //             sort: "-created"
    //         })
    //         .then((records: Item[]) => {
    //             setItems(records);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // };

    return <BackendClientContext.Provider value=
        {{
            pbClient,
            user: pbClient.authStore.model,
            isLoggedIn,
            setIsLoggedIn,
            logout,

            // currCollection,
            // setCurrCollection,
            // collections,
            // setCollections,
            // items,
            // setItems,
            // currItem,
            // setCurrItem,

            // fetchItems,
            // fetchCollections,
        }}
    >
        {children}
    </BackendClientContext.Provider>
}