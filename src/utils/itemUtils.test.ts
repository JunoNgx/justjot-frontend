import { describe, test, expect } from "vitest";
import {
    canConvertItemToTodo,
    canRefetchItem,
    canToggleItemShouldCopyOnClick,
    findIndexById,
    isValidHexColourCode,
} from "@/utils/itemUtils";
import items from "@/__tests__/fixtures/items.json";

describe("itemUtils", () => {
    describe("isValidHexColourCode", () => {
        test("A valid hex colour code", () => {
            expect(isValidHexColourCode("#123ABC")).toBe(true);
        });
        test("A blank string", () => {
            expect(isValidHexColourCode("")).toBe(false);
        });
        test("An invalid hex colour code", () => {
            expect(isValidHexColourCode("#123ABG")).toBe(false);
        });
    });

    describe("findIndexById", () => {
        test("Normal condition", () => {
            expect(findIndexById("475ati3yh4v15qy", items)).toBe(2);
        });

        test("No item found", () => {
            expect(findIndexById("zzzzzzz", items)).toBe(-1);
        });
    });

    describe("canToggleItemShouldCopyOnClick", () => {
        test("Text note", () => {
            expect(canToggleItemShouldCopyOnClick(items[6])).toBe(true);
        });
        test("Link", () => {
            expect(canToggleItemShouldCopyOnClick(items[4])).toBe(true);
        });
        test("Todo", () => {
            expect(canToggleItemShouldCopyOnClick(items[0])).toBe(false);
        });
    });

    describe("canRefetchItem", () => {
        test("Text note", () => {
            expect(canRefetchItem(items[6])).toBe(false);
        });
        test("Link", () => {
            expect(canRefetchItem(items[4])).toBe(true);
        });
        test("Text note", () => {
            expect(canRefetchItem(items[0])).toBe(false);
        });
    });

    describe("canConvertItemToTodo", () => {
        test("Text note without title", () => {
            expect(canConvertItemToTodo(items[6])).toBe(true);
        });
        test("Text note with title and content", () => {
            expect(canConvertItemToTodo(items[7])).toBe(false);
        });
        test("Text note with title but no content", () => {
            expect(canConvertItemToTodo(items[5])).toBe(false);
        });
        test("Link", () => {
            expect(canConvertItemToTodo(items[4])).toBe(false);
        });
        test("Todo", () => {
            expect(canConvertItemToTodo(items[0])).toBe(false);
        });
    });
});
