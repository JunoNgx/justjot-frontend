import { describe, test, expect } from 'vitest';
import { slugify } from "@/utils/miscUtils";

describe("miscUtils", () => {
    describe("slugify", () => {
        test("converts a simple string to a slug", () => {
            expect(slugify("Hello World")).toBe("hello-world");
        });
    
        test("trims leading and trailing spaces", () => {
            expect(slugify("  Hello World  ")).toBe("hello-world");
        });
    
        test("removes special characters", () => {
            expect(slugify("Hello, World!")).toBe("hello-world");
        });
    
        test("replaces multiple spaces with a single hyphen", () => {
            expect(slugify("Hello    World")).toBe("hello-world");
        });
    
        test("handles multiple hyphens correctly", () => {
            expect(slugify("Hello---World")).toBe("hello-world");
        });
    
        test("removes leading hyphens", () => {
            expect(slugify("---Hello World")).toBe("hello-world");
        });
    
        test("removes trailing hyphens", () => {
            expect(slugify("Hello World---")).toBe("hello-world");
        });
    
        test("returns an empty string when given an empty string", () => {
            expect(slugify("")).toBe("");
        });
    
        test("converts uppercase to lowercase", () => {
            expect(slugify("HELLO WORLD")).toBe("hello-world");
        });
    
        test("handles strings with only special characters", () => {
            expect(slugify("!@#$%^&*()")).toBe("");
        });

        test("handles emoji (should remove)", () => {
            expect(slugify("🦥hello-🐌world")).toBe("hello-world");
        });

        test("handles strings with only spaces", () => {
            expect(slugify("   ")).toBe("");
        });
    
        test("handles strings with numbers", () => {
            expect(slugify("Hello World 123")).toBe("hello-world-123");
        });
    
        test("handles strings with mixed characters", () => {
            expect(slugify("Hello, World! 123")).toBe("hello-world-123");
        });

        test("separates alpha characters from numbers", () => {
            expect(slugify("item123")).toBe("item-123");
            expect(slugify("123Item")).toBe("123-item");
            expect(slugify("one123two")).toBe("one-123-two");
        });

        test.skip("handles accents", () => {
            expect(slugify("Nín hǎo. Wǒ shì zhōng guó rén")).toBe("nin-hao-wo-shi-zhong-guo-ren");
        });

        test.skip("handles Cyrillic scripts", () => {
            expect(slugify("Компьютер")).toBe("kompiuter");
        });
    });
});