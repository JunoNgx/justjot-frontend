import { test, expect } from "@playwright/test";
import {
    interceptApiRequestForTrashedItems,
    loginWithMocksAndFilledItems,
} from "./_common";

test.describe("Item context menu", () => {
    test.describe("Options visibility", () => {
        test.beforeEach(loginWithMocksAndFilledItems);

        test("Note without title", async ({ page }) => {
            await page
                .locator('.Item[data-id="yrcn8ax4fph01tx"]')
                .click({ button: "right" });

            await expect(
                page.getByRole("menuitem", { name: "Copy", exact: true })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Edit" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Move" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Trash" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Delete" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Restore" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Refetch" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Convert to Todo" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "To copy" })
            ).toBeVisible();
        });

        test("Note with title", async ({ page }) => {
            await page
                .locator('.Item[data-id="o9t5o6fpehcd0pw"]')
                .click({ button: "right" });

            await expect(
                page.getByRole("menuitem", { name: "Copy", exact: true })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Edit" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Move" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Trash" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Delete" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Restore" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Refetch" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Convert to Todo" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "To copy" })
            ).toBeVisible();
        });

        test("Link", async ({ page }) => {
            await page
                .locator('.Item[data-id="h0u9n1899aylwz4"]')
                .click({ button: "right" });

            await expect(
                page.getByRole("menuitem", { name: "Copy", exact: true })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Edit" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Move" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Trash" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Delete" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Restore" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Refetch" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Convert to Todo" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "To copy" })
            ).toBeVisible();
        });

        test("Trashed note", async ({ page }) => {
            await interceptApiRequestForTrashedItems(page);

            await page.locator("header .CollectionMenuBtn").click();
            await page.getByRole("menuitem", { name: "Trash bin" }).click();

            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Trash bin");
            await expect(page).toHaveURL("e2eTestAcc/trash-bin");

            await page
                .locator('.Item[data-id="7msw3d3jj1owyan"]')
                .click({ button: "right" });

            await expect(
                page.getByRole("menuitem", { name: "Copy", exact: true })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Edit" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Move" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Trash", exact: true })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Delete" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Restore" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Refetch" })
            ).not.toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "Convert to Todo" })
            ).toBeVisible();
            await expect(
                page.getByRole("menuitem", { name: "To copy" })
            ).toBeVisible();
        });
    });

    test.describe("Functionalities", () => {
        test.beforeEach(loginWithMocksAndFilledItems);

        test("Copy", async ({ page }) => {
            await page
                .locator('.Item[data-id="hxz3757cizrkzsl"]')
                .click({ button: "right" });
            await page
                .getByRole("menuitem", { name: "Copy", exact: true })
                .click();

            await expect(
                page.locator('.Item[data-id="hxz3757cizrkzsl"]')
            ).toHaveText(/Content copied/);
            await expect(page.locator("#DisplayedList")).toContainText(
                /Content copied/
            );
        });

        // test("Edit", async ({ page }) => {
        //     await page.route(
        //         "*/**/api/collections/items/records/o9t5o6fpehcd0pw",
        //         async (route) => {
        //             await route.fulfill({
        //                 json: {
        //                     collection: "6qt1usrvke0tuac",
        //                     collectionId: "zge7ncngf5zodei",
        //                     collectionName: "items",
        //                     content: "Sample content edited",
        //                     created: "2023-02-24 10:02:24.563Z",
        //                     faviconUrl: "",
        //                     id: "o9t5o6fpehcd0pw",
        //                     isTodoDone: false,
        //                     isTrashed: false,
        //                     owner: "1x9diejq0lx6e0b",
        //                     shouldCopyOnClick: false,
        //                     title: "Sample title edited",
        //                     trashedDateTime: "",
        //                     type: "text",
        //                     updated: "2024-04-27 10:45:24.565Z",
        //                 },
        //             });
        //         }
        //     );

        //     await page
        //         .locator('.Item[data-id="o9t5o6fpehcd0pw"]')
        //         .click({ button: "right" });
        //     await page.getByRole("menuitem", { name: "Edit" }).click();

        //     await expect(page.getByLabel("Title of item o9t5o6fpehcd0pw")).toBeVisible();
        //     await expect(page.getByLabel("Title of item o9t5o6fpehcd0pw", { exact: true })).toHaveValue(
        //         "A normal text note"
        //     );
        //     await expect(page.getByLabel("Title of item 7msw3d3jj1owyan")).not.toBeVisible();
        //     await expect(
        //         page.getByLabel("Content", { exact: true })
        //     ).toBeVisible();
        //     await expect(
        //         page.getByLabel("Content", { exact: true })
        //     ).toHaveValue("Content sample");

        //     await page.getByLabel("Title", { exact: true }).click();
        //     await page
        //         .getByLabel("Title", { exact: true })
        //         .fill("Sample title edited");
        //     await page.getByLabel("Content", { exact: true }).click();
        //     await page
        //         .getByLabel("Content", { exact: true })
        //         .fill("Sample content edited");
        //     await page.getByLabel("Content", { exact: true }).press("Escape");
        //     await page.waitForTimeout(500);

        //     await expect(
        //         page.locator(
        //             '.Item[data-id="o9t5o6fpehcd0pw"] .Item__PrimaryText'
        //         )
        //     ).toHaveText("Sample title edited");
        //     await expect(
        //         page.locator(
        //             '.Item[data-id="o9t5o6fpehcd0pw"] .Item__SecondaryText'
        //         )
        //     ).toHaveText("Sample content edited");
        // });

        test("Move", async ({ page }) => {
            await page.route(
                "*/**/api/collections/items/records/hxz3757cizrkzsl",
                async (route) => {
                    await route.fulfill({
                        json: {
                            collection: "rhy45jt7zbhk6de",
                            collectionId: "zge7ncngf5zodei",
                            collectionName: "items",
                            content: "",
                            created: "2024-04-27 10:07:01.712Z",
                            faviconUrl: "",
                            id: "hxz3757cizrkzsl",
                            isTodoDone: true,
                            isTrashed: false,
                            owner: "1x9diejq0lx6e0b",
                            shouldCopyOnClick: false,
                            title: "A todo item that has been marked as completed",
                            trashedDateTime: "",
                            type: "todo",
                            updated: "2024-04-27 10:07:03.136Z",
                        },
                    });
                }
            );

            await page
                .locator('.Item[data-id="hxz3757cizrkzsl"]')
                .click({ button: "right" });
            await page.getByRole("menuitem", { name: "Move" }).click();
            await expect(
                page
                    .getByLabel("Move to another collection")
                    .getByRole("banner")
            ).toContainText("Move to another collection");
            await page.getByRole("button", { name: "Coll2" }).click();

            await expect(
                page.locator('.Item[data-id="hxz3757cizrkzsl"]')
            ).not.toBeVisible();
        });

        test("Trash", async ({ page }) => {
            await page.route(
                "*/**/items/trash/1x9diejq0lx6e0b/*",
                async (route) => {
                    await route.fulfill({
                        status: 204,
                        json: {
                            collection: "6qt1usrvke0tuac",
                            collectionId: "zge7ncngf5zodei",
                            collectionName: "items",
                            content: "",
                            created: "2024-04-27 10:07:01.712Z",
                            faviconUrl: "",
                            id: "hxz3757cizrkzsl",
                            isTodoDone: true,
                            isTrashed: true,
                            owner: "1x9diejq0lx6e0b",
                            shouldCopyOnClick: false,
                            title: "A todo item that has been marked as completed",
                            trashedDateTime: "",
                            type: "todo",
                            updated: "2024-04-27 10:07:03.136Z",
                        },
                    });
                }
            );

            await page
                .locator('.Item[data-id="hxz3757cizrkzsl"]')
                .click({ button: "right" });
            await page.getByRole("menuitem", { name: "Trash" }).click();

            await expect(
                page.locator('.Item[data-id="hxz3757cizrkzsl"]')
            ).not.toBeVisible();
        });

        test("Delete", async ({ page }) => {
            await interceptApiRequestForTrashedItems(page);

            await page.locator("header .CollectionMenuBtn").click();
            await page.getByRole("menuitem", { name: "Trash bin" }).click();

            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Trash bin");
            await expect(page).toHaveURL("e2eTestAcc/trash-bin");

            await page
                .locator('.Item[data-id="7msw3d3jj1owyan"]')
                .click({ button: "right" });
            await page.getByRole("menuitem", { name: "Delete" }).click();

            await expect(
                page.locator('.Item[data-id="7msw3d3jj1owyan"]')
            ).not.toBeVisible();
        });

        test("Restore", async ({ page }) => {
            await interceptApiRequestForTrashedItems(page);

            await page.locator("header .CollectionMenuBtn").click();
            await page.getByRole("menuitem", { name: "Trash bin" }).click();

            await expect(
                page.locator("header .CollectionMenuBtn")
            ).toContainText("Trash bin");
            await expect(page).toHaveURL("e2eTestAcc/trash-bin");

            await page
                .locator('.Item[data-id="7msw3d3jj1owyan"]')
                .click({ button: "right" });
            await page.getByRole("menuitem", { name: "Restore" }).click();

            await expect(
                page.locator('.Item[data-id="7msw3d3jj1owyan"]')
            ).not.toBeVisible();
        });

        test("Refetch", async ({ page }) => {
            await page.route(
                "*/**/refetch/1x9diejq0lx6e0b/*",
                async (route) => {
                    await route.fulfill({
                        json: {
                            collection: "u9v6d9osqqzy6ml",
                            collectionId: "zge7ncngf5zodei",
                            collectionName: "items",
                            content: "https://xkcd.com",
                            created: "2024-05-04 07:03:53.811Z",
                            faviconUrl: "https://xkcd.com/s/919f27.ico",
                            id: "lzbedvc667m3r3r",
                            isTodoDone: false,
                            isTrashed: false,
                            owner: "i2gqwoydsgu1m24",
                            shouldCopyOnClick: false,
                            title: "xkcd: Software Testing Day",
                            trashedDateTime: "",
                            type: "link",
                            updated: "2024-05-04 07:03:53.811Z",
                        },
                    });
                }
            );

            await page
                .locator('.Item[data-id="lzbedvc667m3r3r"]')
                .click({ button: "right" });
            await page.getByRole("menuitem", { name: "Refetch" }).click();

            await expect(
                page.locator(
                    '.Item[data-id="lzbedvc667m3r3r"] .Item__PrimaryText'
                )
            ).toHaveText(/xkcd/);
            await expect(
                page.locator(
                    '.Item[data-id="lzbedvc667m3r3r"] .Item__SecondaryText'
                )
            ).toHaveText(/xkcd.com/);
        });

        test("Convert to Todo", async ({ page }) => {
            await page.route(
                "*/**/api/collections/items/records/yrcn8ax4fph01tx",
                async (route) => {
                    await route.fulfill({
                        json: {
                            collection: "6qt1usrvke0tuac",
                            collectionId: "zge7ncngf5zodei",
                            collectionName: "items",
                            content: "",
                            created: "2024-04-24 10:04:46.604Z",
                            faviconUrl: "",
                            id: "yrcn8ax4fph01tx",
                            isTodoDone: false,
                            isTrashed: false,
                            owner: "1x9diejq0lx6e0b",
                            shouldCopyOnClick: false,
                            title: "A note without title",
                            trashedDateTime: "",
                            type: "todo",
                            updated: "2024-04-27 10:04:59.615Z",
                        },
                    });
                }
            );

            await page
                .locator('.Item[data-id="yrcn8ax4fph01tx"]')
                .click({ button: "right" });
            await page
                .getByRole("menuitem", { name: "Convert to Todo" })
                .click();

            await expect(
                page.locator(
                    '.Item[data-id="yrcn8ax4fph01tx"] .Item__PrimaryText'
                )
            ).toHaveText("A note without title");
            await expect(
                page.locator(
                    '.Item[data-id="yrcn8ax4fph01tx"] .Item__SecondaryText'
                )
            ).not.toBeVisible();
        });

        test("Toggle should copy on click", async ({ page }) => {
            await page.route(
                "*/**/api/collections/items/records/7msw3d3jj1owyan",
                async (route) => {
                    await route.fulfill({
                        json: {
                            collection: "6qt1usrvke0tuac",
                            collectionId: "zge7ncngf5zodei",
                            collectionName: "items",
                            content: "Just an extra item",
                            created: "2024-05-04 03:38:06.711Z",
                            faviconUrl: "",
                            id: "7msw3d3jj1owyan",
                            isTodoDone: false,
                            isTrashed: false,
                            owner: "1x9diejq0lx6e0b",
                            shouldCopyOnClick: true,
                            title: "Another note with title",
                            trashedDateTime: "",
                            type: "text",
                            updated: "2024-05-04 03:38:06.712Z",
                        },
                    });
                }
            );

            await expect(
                page.locator(
                    '.Item[data-id="7msw3d3jj1owyan"] .Item__ShouldCopyIcon'
                )
            ).not.toBeVisible();

            await page
                .locator('.Item[data-id="7msw3d3jj1owyan"]')
                .click({ button: "right" });
            await page.getByRole("menuitem", { name: "To copy" }).click();

            await expect(
                page.locator(
                    '.Item[data-id="7msw3d3jj1owyan"] .Item__ShouldCopyIcon'
                )
            ).toBeVisible();
        });
    });
});
