import { findIndexById, isValidHexColourCode } from "./itemUtils";
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
});