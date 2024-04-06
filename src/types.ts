import { RecordModel } from 'pocketbase';

export type Item = RecordModel | {
    id: string,
    owner: string,
    collection: string,
    title: string,
    content: string,
    type: ItemType,
    shouldCopyOnClick: boolean,
    faviconUrl: string,
    isTodoDone: boolean,
    created: string,
    updated: string,

    /**
     * Frontend client-only value to mark temporary Record until backend's
     * response is received.
     */
    isPending?: boolean,
};

export type ItemCollection = RecordModel | {
    id: string,
    owner: string,
    name: string,
    slug: string,
    sortOrder: number,
    created: string,
    updated: string
};

export enum ItemType {
    TEXT = "text",
    LINK = "link",
    TODO = "todo"
};

export type User = (RecordModel | {
    id: string,
    email: string,
    username: string,
    displayName: string,
}) | null;

export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
    AUTO = "auto"
};

export enum ComputedThemeMode {
    LIGHT = "light",
    DARK = "dark"
};

export enum UserType {
    USER = "user",
    ADMIN = "admin",
    POWERUSER = "poweruser"
};

export enum DbTable {
    USERS = "users",
    ITEMS = "items",
    COLLECTIONS = "itemCollections"
};

export type ApiRequestCallbackOptions = {
    successfulCallback?: (response?: any) => void,
    errorCallback?: (err?: any) => void,
    setLoadingState?: React.Dispatch<React.SetStateAction<boolean>>,
};

export type CreateItemOptions = {
    title?: string,
    content: string,
} & ApiRequestCallbackOptions;

export type ItemCreateUpdateType = {
    title?: string,
    content?: string
};

export type MoveItemOptions = {
    itemId: string,
    collectionId: string,
} & ApiRequestCallbackOptions;

export type UpdateItemTitleOptions = {
    itemId: string,
    title: string,
} & ApiRequestCallbackOptions;

export type UpdateItemContentOptions = {
    itemId: string,
    content: string,
} & ApiRequestCallbackOptions;

export type UpdateItemTitleAndContentOptions = {
    itemId: string,
    title: string,
    content: string,
} & ApiRequestCallbackOptions;