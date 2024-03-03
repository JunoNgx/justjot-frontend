import { RecordModel } from 'pocketbase';

export type Item = RecordModel | {
    id: string,
    owner: string,
    group: string,
    title: string,
    content: string,
    type: ItemType,
    defaultAction: DefaultAction,
    isMarkedDone: boolean,
    // TODO: should validate these as ISO strings
    created: string,
    updated: string
};

export enum ItemType {
    TEXT = "text",
    LINK = "link",
    TODO = "todo"
};

export enum DefaultAction {
    COPY = "copy",
    EDIT = "edit",
    OPEN = "open"
};
