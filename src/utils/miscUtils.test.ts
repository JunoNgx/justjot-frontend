// import { isValidUrl } from "./miscUtils";

import { slugify } from "./miscUtils";

describe("miscUtils", () => {
//     test("isValidUrl", () => {
//         expect(isValidUrl("mozilla.org")).toBe(true);
//         expect(isValidUrl("https://www.mozilla.org")).toBe(true);
//         expect(isValidUrl("www.mozilla.org")).toBe(true);
//         expect(isValidUrl("www.mozilla..org")).toBe(false);
//         expect(isValidUrl(".org")).toBe(false);
//         expect(isValidUrl("mozilla")).toBe(false);
//         expect(isValidUrl("mozilla.")).toBe(false);
//     });

    describe('slugify', () => {
        test('converts string to lowercase', () => {
            const result = slugify('Hello World');
            expect(result).toEqual('hello-world');
        });
    
        test('replaces spaces with hyphens', () => {
            const result = slugify('Hello World');
            expect(result).toEqual('hello-world');
        });
    
        test('removes special characters', () => {
            const result = slugify('Hello!@#$%^&*()_+World');
            expect(result).toEqual('helloworld');
        });
    
        test('replaces consecutive spaces with single hyphen', () => {
            const result = slugify('Hello      World');
            expect(result).toEqual('hello-world');
        });
    
        test('trims leading and trailing hyphens', () => {
            const result = slugify('  -Hello World-  ');
            expect(result).toEqual('hello-world');
        });
    
        test('works with numbers', () => {
            const result = slugify('Testing 123');
            expect(result).toEqual('testing-123');
        });
    });
});
