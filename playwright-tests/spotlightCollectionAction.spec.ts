import { test, expect } from '@playwright/test';
import fetchItemsEmpty from "./mocks/fetchItemsEmpty.json" assert { type: "json" };
import { loginWithMocks, spotlightTextboxSelector } from './_common';
import collectionNew from "./mocks/collectionNew.json" assert { type: "json" };
import collectionEdit from "./mocks/collectionEdit.json" assert { type: "json" };

test.describe("Spotlight collection action", () => {

     test.describe("Options visibility", () => {
        test.beforeEach(loginWithMocks);

        test("Normal collection", async ({ page }) => {
            await page.locator('body').press('Control+k');

            await expect(page.getByRole('button', { name: 'Logbook /logbook' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Coll2 /coll-' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Trash bin /trash-bin' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Create new collection .create' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Edit current collection .edit' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Sort collections .sort-coll' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Delete current collection .' })).toBeVisible();
        });

        test("Trash bin", async ({ page }) => {
            await page.locator('body').press('Control+k');
            await page.locator(spotlightTextboxSelector).fill('/trash-bin');
            await page.locator(spotlightTextboxSelector).press('Enter');

            await page.locator('body').press('Control+k');

            await expect(page.getByRole('button', { name: 'Logbook /logbook' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Coll2 /coll-' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Trash bin /trash-bin' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Create new collection .create' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Edit current collection .edit' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Sort collections .sort-coll' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Delete current collection .' })).not.toBeVisible();
        });
    });

    test.describe("Test keyboard shortcuts", () => {
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