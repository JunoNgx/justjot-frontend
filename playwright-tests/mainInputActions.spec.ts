import { test, expect } from '@playwright/test';
import { loginWithMocks, loginWithMocksAndFilledItems } from './_common';

test.describe("Main input", () => {

    test.describe("General functions", () => {
        test.beforeEach(loginWithMocks);

        test("Basic functionalities", async ({ page }) => {
            // Typing changes the input value
            await page.getByLabel('Main input', { exact: true }).fill('Seek greater souls');
            await expect(page.getByLabel('Main input', { exact: true })).toHaveValue("Seek greater souls");

            // Input is cleared upon item creation
            await page.getByLabel('Main input', { exact: true }).press('Enter');
            await expect(page.getByLabel('Main input', { exact: true })).toHaveValue("");
        });

        test("Extended menu: with title", async ({ page }) => {
            await page.getByLabel('Main input', { exact: true }).fill('Favourite assembled weapons');
            await page.getByLabel('Extra functions and options').click();
            await page.getByRole('menuitem', { name: 'with title' }).click();
            await expect(page.getByLabel('Main input', { exact: true })).toHaveValue(':t: Favourite assembled weapons');
        });

        test("Extended menu: as todo", async ({ page }) => {
            await page.getByLabel('Main input', { exact: true }).fill('Buy armor');
            await page.getByLabel('Extra functions and options').click();
            await page.getByRole('menuitem', { name: 'as todo' }).click();
            await expect(page.getByLabel('Main input', { exact: true })).toHaveValue(':td: Buy armor');
        });

        // Requires clipboard access, to not run at the moment
        // test("Extended menu: from clipboard", async ({ page }) => {
        //     // Get something onto clipboard
        //     await page.getByLabel('Main input', { exact: true }).fill('I was born in a prison');
        //     await page.getByLabel('Main input', { exact: true }).press('Control+A');
        //     await page.getByLabel('Main input', { exact: true }).press('Control+X');

        //     await page.getByLabel('Extra functions and options').click();
        //     await page.getByRole('menuitem', { name: 'from clipboard' }).click();
        //     await expect(page.getByLabel('Main input', { exact: true })).toHaveValue('');
        //     await expect(page.locator('#displayed-list')).toContainText('I was born in a prison');
        // });

        test("Extended menu: clear input", async ({ page }) => {
            await page.getByLabel('Main input', { exact: true }).fill('A good puppet');
            await page.getByLabel('Extra functions and options').click();
            await page.getByRole('menuitem', { name: 'clear input' }).click();
            await expect(page.getByLabel('Main input', { exact: true })).toHaveValue('');
        });

        test("Extended menu: open spotlight", async ({ page }) => {
            await page.getByLabel('Main input', { exact: true }).fill('A good puppet');
            await page.getByLabel('Extra functions and options').click();
            await page.getByRole('menuitem', { name: 'spotlight' }).click();
            await expect(page.getByRole('dialog').getByRole('textbox')).toBeVisible();
        });
    });

    test.describe("Test keyboard shortcuts", () => {
        test.beforeEach(loginWithMocksAndFilledItems);
        
        test("Focus on main input", async ({ page }) => {
            await page.locator('body').press('Control+F');
            expect(await page.$eval("#main-input", (el) => el === document.activeElement)).toBeTruthy();
        });

        test("Select items with arrow keys", async ({ page }) => {
            await page.locator('body').press('Control+F');
            await page.locator('body').press('ArrowDown');
            expect(await page.$eval(".item[data-index='0']", (el) => el.classList.contains("item--is-selected"))).toBeTruthy();
        });

        test.fixme("Primary action: edit a note", async ({ page }) => {

        });

        test.fixme("Primary action: open a link", async ({ page }) => {

        });

        test.fixme("Primary action: copy a note content that was marked to copy", async ({ page }) => {

        });

        test.fixme("Primary action: copy a link content that was marked to copy", async ({ page }) => {

        });

        test.fixme("Primary action: toggling a todo isDone status", async ({ page }) => {

        });

        test.fixme("Edit item", async ({ page }) => {

        });

        test.fixme("Move item", async ({ page }) => {

        });

        test.fixme("Trash item", async ({ page }) => {

        });

        test.fixme("Restore trashed item", async ({ page }) => {

        });

        test.fixme("Toggle shouldCopyOnClick", async ({ page }) => {

        });

        test.fixme("Refetch link metadata", async ({ page }) => {

        });

        test.fixme("Convert title-less note to todo", async ({ page }) => {

        });
    });
});