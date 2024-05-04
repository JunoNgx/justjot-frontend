import { test, expect } from '@playwright/test';
import { loginWithMocks } from './_common';

test.describe("Main input", () => {

    test.beforeEach(loginWithMocks);

    test.describe("General functions", () => {
        test("Typing changes the main input value", async ({ page }) => {
            await page.locator('body').press('Control+k');
            await page.getByLabel('Main input', { exact: true }).fill('Seek greater souls');
            await expect(page.getByLabel('Main input', { exact: true })).toHaveValue("Seek greater souls");
        });

        test("Pressing enter clearing the main input", async ({ page }) => {
            await page.locator('body').press('Control+k');
            await page.getByLabel('Main input', { exact: true }).fill('I was born in a prison');
            await page.getByLabel('Main input', { exact: true }).press('Enter');
            await expect(page.getByLabel('Main input', { exact: true })).toHaveValue("");
        });

        test.fixme("Extended menu: with title", async ({ page }) => {

        });

        test.fixme("Extended menu: as todo", async ({ page }) => {

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