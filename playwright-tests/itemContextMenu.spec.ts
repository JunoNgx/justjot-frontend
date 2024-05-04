import { test, expect } from '@playwright/test';
import { loginWithMocksAndFilledItems } from './_common';

test.describe("Item context menu", () => {

    test.describe("Options visibility", () => {
        test.beforeEach(loginWithMocksAndFilledItems);

        test("Note without title", async ({ page }) => {
            await page.locator('.item[data-id="yrcn8ax4fph01tx"]').click({ button: 'right' });

            await expect(page.getByRole('button', { name: 'Copy', exact: true })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Move' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Trash' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'Restore' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'Refetch' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'Convert to Todo' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'To copy' })).toBeVisible();
        });

        test("Note with title", async ({ page }) => {
            await page.locator('.item[data-id="o9t5o6fpehcd0pw"]').click({ button: 'right' });

            await expect(page.getByRole('button', { name: 'Copy', exact: true })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Move' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Trash' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'Restore' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'Refetch' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'Convert to Todo' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'To copy' })).toBeVisible();
        });

        test.fixme("Link", async ({ page }) => {

        });

        test.fixme("Trashed note", async ({ page }) => {

        });
    });

    test.describe("Functionalities", () => {
        test.fixme("Copy", async ({ page }) => {

        });

        test.fixme("Edit", async ({ page }) => {

        });

        test.fixme("Move", async ({ page }) => {

        });

        test.fixme("Trash", async ({ page }) => {

        });

        test.fixme("Delete", async ({ page }) => {

        });

        test.fixme("Restore", async ({ page }) => {

        });

        test.fixme("Refetch", async ({ page }) => {

        });

        test.fixme("Convert to Todo", async ({ page }) => {

        });

        test.fixme("Toggle should copy on click", async ({ page }) => {

        });

    });

});