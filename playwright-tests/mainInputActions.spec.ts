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

        test("Navigate to adjacent collections with arrow keys", async ({ page }) => {
            await expect(page.locator("header .collection-menu-btn")).toContainText('Logbook');
            await expect(page).toHaveURL("e2eTestAcc/logbook");

            // Do nothing if already on the first collection
            await page.locator('body').press('ArrowLeft');
            await expect(page.locator("header .collection-menu-btn")).toContainText('Logbook');
            await expect(page).toHaveURL("e2eTestAcc/logbook");
            
            await page.locator('body').press('ArrowRight');

            await expect(page.locator("header .collection-menu-btn")).toContainText('Coll2');
            await expect(page).toHaveURL("e2eTestAcc/coll-2");

            // Do nothing if already on the last collection
            await page.locator('body').press('ArrowRight');
            await expect(page.locator("header .collection-menu-btn")).toContainText('Trash bin');
            await expect(page).toHaveURL("e2eTestAcc/trash-bin");

            await page.locator('body').press('ArrowRight');
            
            await expect(page.locator("header .collection-menu-btn")).toContainText('Trash bin');
            await expect(page).toHaveURL("e2eTestAcc/trash-bin");

            await page.locator('body').press('ArrowLeft');
            
            await expect(page.locator("header .collection-menu-btn")).toContainText('Coll2');
            await expect(page).toHaveURL("e2eTestAcc/coll-2");
        });

        test("Navigate to collection with numeric keys", async ({ page }) => {
            // TODO: this is not great, find out why I needed to press around
            // before pressing 3
            await page.locator('body').press('Control+F');
            await page.locator('body').press('Escape');
            await page.locator('body').press('Digit3');

            await expect(page.locator("header .collection-menu-btn"))
                .toContainText('Trash bin');
            await expect(page).toHaveURL("e2eTestAcc/trash-bin");
        });

        test("Focus on main input", async ({ page }) => {
            await page.locator('body').press('Control+F');
            expect(await page.$eval("#main-input", (el) => el === document.activeElement)).toBeTruthy();

            await page.locator('body').press('Escape');
            expect(await page.$eval("#main-input", (el) => el === document.activeElement)).toBeFalsy();
        });

        test("Arrow key navigations", async ({ page }) => {
            await page.locator('body').press('Control+F');

            await page.locator('body').press('ArrowDown');
            expect(await page.$eval(".item[data-index='0']", (el) => el.classList.contains("item--is-selected"))).toBeTruthy();
            
            await page.locator('body').press('ArrowDown');
            expect(await page.$eval(".item[data-index='1']", (el) => el.classList.contains("item--is-selected"))).toBeTruthy();

            await page.locator('body').press('Shift+ArrowDown');
            expect(await page.$eval(".item[data-index='6']", (el) => el.classList.contains("item--is-selected"))).toBeTruthy();

            await page.locator('body').press('Control+Shift+ArrowDown');
            expect(await page.$eval(".item[data-index='8']", (el) => el.classList.contains("item--is-selected"))).toBeTruthy();

            await page.locator('body').press('ArrowUp');
            expect(await page.$eval(".item[data-index='7']", (el) => el.classList.contains("item--is-selected"))).toBeTruthy();

            await page.locator('body').press('ArrowUp');
            expect(await page.$eval(".item[data-index='6']", (el) => el.classList.contains("item--is-selected"))).toBeTruthy();

            await page.locator('body').press('Shift+ArrowUp');
            expect(await page.$eval(".item[data-index='1']", (el) => el.classList.contains("item--is-selected"))).toBeTruthy();

            await page.locator('body').press('Shift+Control+ArrowUp');
            expect(await page.$eval(".item[data-index='0']", (el) => el.classList.contains("item--is-selected"))).toBeTruthy();
        });

        test("Primary action: edit a note", async ({ page }) => {
            await page.locator('body').press('Control+F');
            await page.locator('body').press('Control+Shift+ArrowDown');
            await page.getByLabel('Main input', { exact: true }).press('Control+Enter');

            await expect(page.getByLabel('Title')).toBeVisible();
            await expect(page.getByLabel("Title", { exact: true })).toHaveValue('Another note with title');
            await expect(page.getByLabel("Todo task name")).not.toBeVisible();
            await expect(page.getByLabel("Content", { exact: true })).toBeVisible();
            await expect(page.getByLabel("Content", { exact: true })).toHaveValue('Just an extra item');
        });

        test("Primary action: open a link", async ({ page }) => {
            await page.locator('body').press('Control+F');
            await page.locator('body').press('Shift+ArrowDown');
            await page.locator('body').press('Control+Enter');

            const newTabPromise = page.waitForEvent("popup");
            const newTab = await newTabPromise;
            await newTab.waitForLoadState();
            await expect(newTab).toHaveURL(/mozilla.org/);
        });

        test("Primary action: copy a note content that was marked to copy", async ({ page }) => {
            await page.locator('body').press('Control+F');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('Control+Enter');

            await expect(page.locator('.item[data-index="3"]')).toHaveText(/Content copied/);
            await expect(page.locator('#displayed-list')).toContainText(/Content copied/);
        });

        test("Primary action: copy a link content that was marked to copy", async ({ page }) => {
            await page.locator('body').press('Control+F');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('Control+Enter');

            await expect(page.locator('.item[data-index="2"]')).toHaveText(/Content copied/);
            await expect(page.locator('#displayed-list')).toContainText(/Content copied/);
        });

        test("Primary action: toggling a todo isDone status", async ({ page }) => {
            await page.locator('body').press('Control+F');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('ArrowDown');

            await expect(page.locator('.item[data-index="1"] .item__primary-text')).not.toHaveCSS("text-decoration", /line-through/);
            await page.locator('body').press('Control+Enter');
            await expect(page.locator('.item[data-index="1"] .item__primary-text')).toHaveCSS("text-decoration", /line-through/);
            await page.locator('body').press('Control+Enter');
            await expect(page.locator('.item[data-index="1"] .item__primary-text')).not.toHaveCSS("text-decoration", /line-through/);
        });

        test("Edit item", async ({ page }) => {
            await page.locator('body').press('Control+F');
            await page.locator('body').press('Control+Shift+ArrowDown');
            await page.locator('body').press('ArrowUp');
            await page.locator('body').press('Control+E');

            await page.getByLabel('Title').fill('Sample title edited');
            await page.getByLabel("Content", { exact: true }).click();
            await page.getByLabel("Content", { exact: true }).fill('Sample content edited');
            await page.locator('body').press('Control+S');

            await expect(page.locator('.item[data-index="7"] .item__primary-text')).toHaveText('Sample title edited');
            await expect(page.locator('.item[data-index="7"] .item__secondary-text')).toHaveText('Sample content edited');
        });

        test("Move item", async ({ page }) => {
            await page.locator('body').press('Control+F');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('Control+M');

            await page.locator('.item-move-modal').press("2");

            await expect(page.locator('.item[data-index="7"] .item__primary-text'))
                .not.toHaveText(/A todo item that has been marked as completed/);
        });

        test("Trash item", async ({ page }) => {
            await page.locator('body').press('Control+F');
            await page.locator('body').press('ArrowDown');
            await page.locator('body').press('Control+Shift+Delete');

            await expect(page.locator('.item[data-index="7"] .item__primary-text'))
                .not.toHaveText(/A todo item that has been marked as completed/);
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