import { test, expect } from '@playwright/test';
import { loginWithMocks } from './_common';

test.describe("Main input", () => {

    test.beforeEach(loginWithMocks);

    test.describe("General functions", () => {
        test("Basic functionalities", async ({ page }) => {
            await page.locator('body').press('Control+k');

            // Ctrl + F should focus
            expect(page.$eval("#main-input", (el) => el === document.activeElement)).toBeTruthy();
            await page.getByLabel('Main input', { exact: true }).fill('Seek greater souls');

            // Typing changes the input value
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

        test.fixme("Extended menu: from clipboard", async ({ page }) => {

        });

        test.fixme("Extended menu: clear input", async ({ page }) => {

        });

        test.fixme("Extended menu: open spotlight", async ({ page }) => {

        });
    });

    test.describe("Test keyboard shortcuts", () => {
        test.fixme("Focus on main input", async ({ page }) => {

        });

        test.fixme("Select items with arrow keys", async ({ page }) => {

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