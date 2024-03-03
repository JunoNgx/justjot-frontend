import { RecordModel } from 'pocketbase';

export type Item = RecordModel | {
    id: string,
    owner: string,
    group: string,
    title: string,
    content: string,
    type: itemType,
    defaultAction: defaultAction,
    isMarkedDone: boolean,
    // TODO: should validate these as ISO strings
    created: string,
    updated: string
};

export enum itemType {
    TEXT = "text",
    LINK = "link",
    TODO = "todo"
};

export enum defaultAction {
    COPY = "copy",
    EDIT = "edit",
    OPEN = "open"
};
