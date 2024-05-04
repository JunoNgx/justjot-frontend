import { test, expect } from '@playwright/test';
import { interceptApiRequestForTrashedItems, loginWithMocksAndFilledItems } from './_common';

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

        test("Link", async ({ page }) => {
            await page.locator('.item[data-id="h0u9n1899aylwz4"]').click({ button: 'right' });

            await expect(page.getByRole('button', { name: 'Copy', exact: true })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Move' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Trash' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'Restore' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'Refetch' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Convert to Todo' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'To copy' })).toBeVisible();
        });

        test("Trashed note", async ({ page }) => {
            await interceptApiRequestForTrashedItems(page);

            await page.goto("/e2eTestAcc/trash-bin")
            
            await expect(page.locator("header .collection-menu-btn"))
                .toContainText('Trash bin');
            await expect(page).toHaveURL("e2eTestAcc/trash-bin");
    
            await page.locator('.item[data-id="7msw3d3jj1owyan"]').click({ button: 'right' });
    
            await expect(page.getByRole('button', { name: 'Copy', exact: true })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Move' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'Trash', exact: true })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Restore' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Refetch' })).not.toBeVisible();
            await expect(page.getByRole('button', { name: 'Convert to Todo' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'To copy' })).toBeVisible();
        })
    });

    test.describe("Functionalities", () => {
        test.beforeEach(loginWithMocksAndFilledItems);

        test("Copy", async ({ page }) => {
            await page.locator('.item[data-id="hxz3757cizrkzsl"]').click({ button: 'right' });
            await page.getByRole('button', { name: 'Copy', exact: true }).click();

            await expect(page.locator('.item[data-id="hxz3757cizrkzsl"]')).toHaveText(/Content copied/);
            await expect(page.locator('#displayed-list')).toContainText(/Content copied/);
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