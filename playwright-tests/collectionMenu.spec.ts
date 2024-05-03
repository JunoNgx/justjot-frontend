import { test, expect } from '@playwright/test';
import fetchItemsEmpty from "./mocks/fetchItemsEmpty.json" assert { type: "json" };
import { loginWithMocks } from './_common';

test.describe("Collection Menu", () => {

    test.describe("Options visibility", () => {
        test.beforeEach(loginWithMocks);

        test("Normal collection", async ({ page }) => {
            await page.route("*/**/api/collections/items/records?page=1&perPage=500&skipTotal=1&filter=collection%3D%226qt1usrvke0tuac%22%20%26%26%20isTrashed%3Dfalse&sort=-created", async route => {
                await route.fulfill({ json: fetchItemsEmpty });
            });

            await page.locator("header .collection-menu-btn").click();

            await expect(page.getByRole('menuitem', { name: 'Create collection' })).toBeVisible();
            await expect(page.getByRole('menuitem', { name: 'Edit collection' })).toBeVisible();
            await expect(page.getByRole('menuitem', { name: 'Sort collections' })).toBeVisible();
            await expect(page.getByRole('menuitem', { name: 'Delete collection' })).toBeVisible();
        });

        test("Trash bin", async ({ page }) => {
            await page.locator("header .collection-menu-btn").click();
            await page.getByRole('menuitem', { name: 'Trash bin' }).click();

            await expect(page.getByRole('menuitem', { name: 'Create collection' })).toBeVisible();
            await expect(page.getByRole('menuitem', { name: 'Edit collection' })).toBeVisible();
            await expect(page.getByRole('menuitem', { name: 'Sort collections' })).toBeVisible();
            await expect(page.getByRole('menuitem', { name: 'Delete collection' })).not.toBeVisible();
        });
    });

    test.describe("Functionalities", () => {
        test.fixme("Switch collection", async ({ page }) => {

        });

        test.fixme("Create collection", async ({ page }) => {

        });

        test.fixme("Edit collection", async ({ page }) => {

        });

        test.fixme("Sort collection", async ({ page }) => {

        });

        test.fixme("Delete collection", async ({ page }) => {

        });
    });
});