import { RecordModel } from 'pocketbase';

export type Item = RecordModel | {
    id: string,
    owner: string,
    collection: string,
    title: string,
    content: string,
    type: ItemType,
    // defaultAction: DefaultAction,
    shouldCopyOnClick: boolean,
    faviconUrl: string,
    isTodoDone: boolean,
    // TODO: should validate these as ISO strings
    created: string,
    updated: string
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

// export enum DefaultAction {
//     COPY = "copy",
//     EDIT = "edit",
//     OPEN = "open"
// };

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

export interface RequestCallbackOptions {
    successfulCallback?: () => void,
    errorCallback?: () => void,
};

export type CreateUpdateCollectionOptions = {
    name: string,
    slug: string
};

export type ItemCreateUpdateType = {
    title?: string,
    content?: string
};