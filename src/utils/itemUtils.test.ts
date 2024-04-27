import { canRefetchItem, canToggleItemShouldCopyOnClick, findIndexById, isValidHexColourCode } from "./itemUtils";
import * as items from "@/tests/fixtures/items.json";

describe("itemUtils", () => {
    describe("isValidHexColourCode", () => {
        test("A valid hex colour code", () => {
            expect(isValidHexColourCode("#123ABC")).toBe(true);
        })
        test("A blank string", () => {
            expect(isValidHexColourCode("")).toBe(false);
        })
        test("An invalid hex colour code", () => {
            expect(isValidHexColourCode("#123ABG")).toBe(false);
        })
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
});