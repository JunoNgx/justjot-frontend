import { test, expect } from "@playwright/test";
import {
    loginWithMocks,
    spotlightTextboxSelector,
} from "./_common";
import collectionNew from "./mocks/collectionNew.json" assert { type: "json" };
import collectionEdit from "./mocks/collectionEdit.json" assert { type: "json" };

test.describe("Spotlight collection action", () => {
    test.describe("Options visibility", () => {
        test.beforeEach(loginWithMocks);

        test("Normal collection", async ({ page }) => {
            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Logbook");

            await page.locator("body").press("Control+k");

            await expect(
                page.getByRole("button", { name: "Logbook /logbook" })
            ).toBeVisible();
            await expect(
                page.getByRole("button", { name: "Coll2 /coll-" })
            ).toBeVisible();
            await expect(
                page.getByRole("button", { name: "Trash bin /trash-bin" })
            ).toBeVisible();
            await expect(
                page.getByRole("button", {
                    name: "Create new collection .create",
                })
            ).toBeVisible();
            await expect(
                page.getByRole("button", {
                    name: "Edit current collection .edit",
                })
            ).toBeVisible();
            await expect(
                page.getByRole("button", {
                    name: "Sort collections .sort-coll",
                })
            ).toBeVisible();
            await expect(
                page.getByRole("button", { name: "Delete current collection" })
            ).toBeVisible();
        });

        test("Trash bin", async ({ page }) => {
            await page.locator("body").press("Control+k");
            await page.locator(spotlightTextboxSelector).fill("/trash-bin");
            await page.locator(spotlightTextboxSelector).press("Enter");
            await page.locator(spotlightTextboxSelector).fill("");

            await page.locator("body").press("Control+k");

            await expect(
                page.getByRole("button", { name: "Logbook /logbook" })
            ).toBeVisible();
            await expect(
                page.getByRole("button", { name: "Coll2 /coll-" })
            ).toBeVisible();
            await expect(
                page.getByRole("button", { name: "Trash bin /trash-bin" })
            ).toBeVisible();
            await expect(
                page.getByRole("button", {
                    name: "Create new collection .create",
                })
            ).toBeVisible();
            await expect(
                page.getByRole("button", {
                    name: "Edit current collection .edit",
                })
            ).toBeVisible();
            await expect(
                page.getByRole("button", {
                    name: "Sort collections .sort-coll",
                })
            ).toBeVisible();
            await expect(
                page.getByRole("button", {
                    name: "Delete current collection .",
                })
            ).not.toBeVisible();
        });
    });

    test.describe("Test keyboard shortcuts", () => {
        test.beforeEach(loginWithMocks);

        test("Switch collection", async ({ page }) => {
            await page.locator("body").press("Control+k");
            await page.locator(spotlightTextboxSelector).fill("/coll-2");
            await page.locator(spotlightTextboxSelector).press("Enter");

            await expect(page).toHaveURL("e2eTestAcc/coll-2");
            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Coll2");
        });

        test("Create collection", async ({ page }) => {
            await page.route(
                "*/**/api/collections/itemCollections/records",
                async (route) => {
                    await route.fulfill({ json: collectionNew });
                }
            );

            await page.locator("body").press("Control+k");
            await page.locator(spotlightTextboxSelector).fill(".create");
            await page.locator(spotlightTextboxSelector).press("Enter");

            await page.getByPlaceholder("My collection").fill("Coll3");
            await page
                .getByRole("button", { name: "Create collection" })
                .click();
            await expect(page.getByPlaceholder("my-collection")).toHaveValue(
                "coll-3"
            );
            await page.getByPlaceholder("My collection").press("Enter");

            await expect(page).toHaveURL("e2eTestAcc/coll-3");
            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Coll3");
        });

        test("Edit collection", async ({ page }) => {
            await page.route(
                "*/**/api/collections/itemCollections/records/6qt1usrvke0tuac",
                async (route) => {
                    await route.fulfill({ json: collectionEdit });
                }
            );

            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Logbook");

            await page.locator("body").press("Control+k");
            await page.locator(spotlightTextboxSelector).fill(".edit");
            await page.locator(spotlightTextboxSelector).press("Enter");

            // Test: current values are correctly passed to modal
            await expect(page.getByPlaceholder("My collection")).toHaveValue(
                "Logbook"
            );
            await expect(page.getByPlaceholder("my-collection")).toHaveValue(
                "logbook"
            );

            await page
                .getByPlaceholder("My collection")
                .fill("Logbook-!#+$%^-edited");

            // Test: slugify logic
            await expect(page.getByPlaceholder("my-collection")).toHaveValue(
                "logbook-edited"
            );

            await page.getByPlaceholder("My collection").press("Enter");

            // Test: url slug is updated
            await expect(page).toHaveURL("e2eTestAcc/logbook-edited");
            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Logbook-!#+$%^-edited");
        });

        test("Sort collection", async ({ page }) => {
            await page.locator("body").press("Control+k");
            await page.locator(spotlightTextboxSelector).fill(".sort");
            await page.locator(spotlightTextboxSelector).press("Enter");

            await expect(page.locator(".mantine-Modal-header")).toContainText(
                "Sort Collections"
            );
            await expect(
                page
                    .getByLabel("Sort Collections")
                    .getByRole("button", { name: "Logbook" })
            ).toBeVisible();
            await expect(
                page
                    .getByLabel("Sort Collections")
                    .getByRole("button", { name: "Coll2" })
            ).toBeVisible();
        });

        test("Delete collection", async ({ page }) => {
            await page.route(
                "*/**/api/collections/itemCollections/records/6qt1usrvke0tuac",
                async (route) => {
                    await route.fulfill({ status: 204 });
                }
            );

            await page.locator("body").press("Control+k");
            await page.locator(spotlightTextboxSelector).fill(".delete");
            await page.locator(spotlightTextboxSelector).press("Enter");
            // Double tabbing and entering seem to be unreliable
            // await page.locator('body').press('Tab');
            // await page.locator('body').press('Tab');
            // await page.locator('body').press('Enter');
            await page
                .getByRole("button", { name: "Delete collection" })
                .click();

            // Test: auto-navigate tno current index, meaning the next collection
            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText(/Coll2/);
            await expect(page).toHaveURL("e2eTestAcc/coll-2");
        });
    });
});
