import { isValidHexColourCode } from "./itemUtils";

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
});