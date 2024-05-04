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

        test("Edit", async ({ page }) => {
            await page.route("*/**/api/collections/items/records/o9t5o6fpehcd0pw", async route => {
                await route.fulfill({
                    json:
                    {
                        "collection": "6qt1usrvke0tuac",
                        "collectionId": "zge7ncngf5zodei",
                        "collectionName": "items",
                        "content": "Sample content edited",
                        "created": "2023-02-24 10:02:24.563Z",
                        "faviconUrl": "",
                        "id": "o9t5o6fpehcd0pw",
                        "isTodoDone": false,
                        "isTrashed": false,
                        "owner": "1x9diejq0lx6e0b",
                        "shouldCopyOnClick": false,
                        "title": "Sample title edited",
                        "trashedDateTime": "",
                        "type": "text",
                        "updated": "2024-04-27 10:45:24.565Z"
                    }
                });
            });

            await page.locator('.item[data-id="o9t5o6fpehcd0pw"]').click({ button: 'right' });
            await page.getByRole('button', { name: 'Edit' }).click();

            await expect(page.getByLabel('Title')).toBeVisible();
            await expect(page.getByLabel("Title", { exact: true })).toHaveValue('A normal text note');
            await expect(page.getByLabel("Todo task name")).not.toBeVisible();
            await expect(page.getByLabel("Content", { exact: true })).toBeVisible();
            await expect(page.getByLabel("Content", { exact: true })).toHaveValue('Content sample');

            await page.getByLabel("Title", { exact: true }).click();
            await page.getByLabel("Title", { exact: true }).fill("Sample title edited");
            await page.getByLabel("Content", { exact: true }).click();
            await page.getByLabel("Content", { exact: true }).fill('Sample content edited');
            await page.getByLabel("Content", { exact: true }).press("Escape");
            await page.waitForTimeout(500);

            await expect(page.locator('.item[data-id="o9t5o6fpehcd0pw"] .item__primary-text')).toHaveText('Sample title edited');
            await expect(page.locator('.item[data-id="o9t5o6fpehcd0pw"] .item__secondary-text')).toHaveText('Sample content edited');
        });

        test("Move", async ({ page }) => {
            await page.route("*/**/api/collections/items/records/hxz3757cizrkzsl", async route => {
                await route.fulfill({
                    json:
                    {
                        "collection": "rhy45jt7zbhk6de",
                        "collectionId": "zge7ncngf5zodei",
                        "collectionName": "items",
                        "content": "",
                        "created": "2024-04-27 10:07:01.712Z",
                        "faviconUrl": "",
                        "id": "hxz3757cizrkzsl",
                        "isTodoDone": true,
                        "isTrashed": false,
                        "owner": "1x9diejq0lx6e0b",
                        "shouldCopyOnClick": false,
                        "title": "A todo item that has been marked as completed",
                        "trashedDateTime": "",
                        "type": "todo",
                        "updated": "2024-04-27 10:07:03.136Z"
                    }
                });
            });

            await page.locator('.item[data-id="hxz3757cizrkzsl"]').click({ button: 'right' });
            await page.getByRole('button', { name: 'Move' }).click();
            await expect(page.locator(".mantine-Modal-header")).toHaveText("Move to another collection");
            await page.getByRole('button', { name: 'Coll2' }).click();

            await expect(page.locator('.item[data-id="hxz3757cizrkzsl"]')).not.toBeVisible();
        });

        test("Trash", async ({ page }) => {
            await page.route("*/**/items/trash/1x9diejq0lx6e0b/hxz3757cizrkzsl?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE3MTU4NjA3ODcsImlkIjoiaTJncXdveWRzZ3UxbTI0IiwidHlwZSI6ImF1dGhSZWNvcmQifQ.yGMpxtYyya7JYncmlbQXGxFgI5RKzKIDtlTqe_L1RbM", async route => {
                await route.fulfill({
                    status: 204,
                    json: {
                        "collection": "6qt1usrvke0tuac",
                        "collectionId": "zge7ncngf5zodei",
                        "collectionName": "items",
                        "content": "",
                        "created": "2024-04-27 10:07:01.712Z",
                        "faviconUrl": "",
                        "id": "hxz3757cizrkzsl",
                        "isTodoDone": true,
                        "isTrashed": true,
                        "owner": "1x9diejq0lx6e0b",
                        "shouldCopyOnClick": false,
                        "title": "A todo item that has been marked as completed",
                        "trashedDateTime": "",
                        "type": "todo",
                        "updated": "2024-04-27 10:07:03.136Z"
                    }
                });
            });

            await page.locator('.item[data-id="hxz3757cizrkzsl"]').click({ button: 'right' });
            await page.getByRole('button', { name: 'Trash' }).click();

            await expect(page.locator('.item[data-id="hxz3757cizrkzsl"]')).not.toBeVisible();
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