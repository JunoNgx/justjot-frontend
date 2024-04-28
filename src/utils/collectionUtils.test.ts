import { describe, test, expect } from 'vitest';
import collections from "@/tests/fixtures/collections.json";
import { getCurrHighestCollectionSortOrder } from "./collectionUtils";

describe("collectionUtils", () => {
    describe("getCurrHighestCollectionSortOrder", () => {
        test("Normal condition", () => {
            expect(getCurrHighestCollectionSortOrder(collections)).toBe(13000);
        });
    });
});