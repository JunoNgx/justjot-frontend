import { test, expect } from "@playwright/test";
import fetchItemsEmpty from "./mocks/fetchItemsEmpty.json" assert { type: "json" };
import { loginWithMocks } from "./_common";
import collectionNew from "./mocks/collectionNew.json" assert { type: "json" };
import collectionEdit from "./mocks/collectionEdit.json" assert { type: "json" };

test.describe("Collection Menu", () => {
    test.describe("Options visibility", () => {
        test.beforeEach(loginWithMocks);

        test("Normal collection", async ({ page }) => {
            await page.route("*/**/api/collections/items/*", async (route) => {
                await route.fulfill({ json: fetchItemsEmpty });
            });

            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Logbook");
            await page.locator("header .CollectionMenuBtn").click();

            await expect(
                page.getByRole("menuitem", { name: "Create collection" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Edit collection" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Sort collections" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Delete collection" })
            ).toBeVisible();
        });

        test("Trash bin", async ({ page }) => {
            await page.locator("header .CollectionMenuBtn").click();
            await page.getByRole("menuitem", { name: "Trash bin" }).click();
            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Trash bin");
            await page.locator("header .CollectionMenuBtn").click();

            await expect(
                page.getByRole("menuitem", { name: "Create collection" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Edit collection" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Sort collections" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Delete collection" })
            ).not.toBeVisible();
        });
    });

    test.describe("Functionalities", () => {
        test.beforeEach(loginWithMocks);

        test("Auto-navigates to first collection", async ({ page }) => {
            await expect(page.locator("header")).toContainText("Logbook");
            await expect(page).toHaveURL("e2eTestAcc/logbook");
        });

        test("Switch collection", async ({ page }) => {
            await page.locator("header .CollectionMenuBtn").click();
            await page.getByRole("menuitem", { name: "Coll2" }).click();

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

            await page.locator("header .CollectionMenuBtn").click();
            await page
                .getByRole("menuitem", { name: "Create collection" })
                .click();
            await page.getByPlaceholder("My collection").fill("Coll3");
            await expect(page.getByPlaceholder("my-collection")).toHaveValue(
                "coll-3"
            );
            await page
                .getByRole("button", { name: "Create collection" })
                .click();

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

            await page.locator("header .CollectionMenuBtn").click();
            await page
                .getByRole("menuitem", { name: "Edit collection" })
                .click();

            // Test: current values are correctly passed to modal
            await expect(page.getByPlaceholder("My collection")).toHaveValue(
                "Logbook"
            );
            await expect(page.getByPlaceholder("my-collection")).toHaveValue(
                "logbook"
            );

            await page.getByPlaceholder("My collection").click();
            await page
                .getByPlaceholder("My collection")
                .fill("Logbook-!#+$%^-edited");

            // Test: slugify logic
            await expect(page.getByPlaceholder("my-collection")).toHaveValue(
                "logbook-edited"
            );

            await page
                .getByRole("button", { name: "Update collection" })
                .click();

            // Test: url slug is updated
            await expect(page).toHaveURL("e2eTestAcc/logbook-edited");
            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Logbook-!#+$%^-edited");
        });

        test("Sort collection", async ({ page }) => {
            await page.locator("header .CollectionMenuBtn").click();
            await page
                .getByRole("menuitem", { name: "Sort collections" })
                .click();

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

            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Logbook");

            await page.locator("header .CollectionMenuBtn").click();
            await page
                .getByRole("menuitem", { name: "Delete collection" })
                .click();
            await page
                .getByRole("button", { name: "Delete collection" })
                .click();

            // Test: auto-navigate to current index, meaning the next collection
            await expect(page).toHaveURL("e2eTestAcc/coll-2");
        });
    });
});
