import { describe, test, expect } from "vitest";
import collections from "@/__tests__/fixtures/collections.json";
import { getCurrHighestCollectionSortOrder } from "@/utils/collectionUtils";

describe("collectionUtils", () => {
    describe("getCurrHighestCollectionSortOrder", () => {
        test("Normal condition", () => {
            expect(getCurrHighestCollectionSortOrder(collections)).toBe(13000);
        });
    });
});
