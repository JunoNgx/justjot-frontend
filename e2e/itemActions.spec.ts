import { test, expect } from '@playwright/test';

test.describe("Item actions", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: 'Login', exact: true }).click();
        await page.getByPlaceholder('lucatiel@mirrah.com').fill('e2eTestAcc');
        await page.getByPlaceholder('BearSeekSeekLest').fill('testaccount');
        await page.getByPlaceholder('BearSeekSeekLest').press('Enter');
    });

    test("Regular note without title", async ({ page }) => {
        // Create
        await page.locator('body').press('Control+f');
        await page.getByLabel('Main input', { exact: true }).fill('New quick note');
        await page.getByLabel('Main input', { exact: true }).press('Enter');
        await expect(page.locator('.item[data-index="0"] .item__secondary-text')).toHaveText('New quick note');

        // Edit
        await page.getByLabel('Main input', { exact: true }).press('ArrowDown');
        await page.getByLabel('Main input', { exact: true }).press('Control+Enter');
        await expect(page.getByLabel('Title')).toBeVisible();
        await expect(page.getByPlaceholder('Enter your note content here')).toBeVisible();
        await expect(page.getByPlaceholder('Enter your note content here')).toHaveValue('New quick note');
        await page.getByPlaceholder('Enter your note content here').press('Control+a');
        await page.getByPlaceholder('Enter your note content here').fill('New quick note edited');
        await page.getByPlaceholder('Enter your note content here').press('Control+s');
        await expect(page.locator('.item[data-index="0"] .item__secondary-text')).toHaveText('New quick note edited');

        // Move
        await page.getByLabel('Main input', { exact: true }).press('Control+m');
        await page.getByRole('button', { name: 'Coll2' }).press('Enter');
        await page.locator("header .collection-menu-btn").click();
        await page.getByRole('menuitem', { name: 'Coll2' }).click();

        await expect(page.locator('.item[data-index="0"] .item__secondary-text')).toHaveText('New quick note edited');
        await page.keyboard.press('Control+f');
        await page.getByLabel('Main input', { exact: true }).press('ArrowDown');
        await page.keyboard.press('Control+Shift+Backspace');

        // await expect(page.locator('.item[data-index="0"]')).toBeEmpty();
        await expect(page.locator('#displayed-list')).toBeEmpty();

        // Delete permanently
        await page.locator("header .collection-menu-btn").click();
        await page.getByRole('menuitem', { name: 'Trash bin' }).click();
        await page.keyboard.press('Control+f');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Control+Shift+Backspace');

        await expect(page.locator('#displayed-list')).toBeEmpty();
    });
});