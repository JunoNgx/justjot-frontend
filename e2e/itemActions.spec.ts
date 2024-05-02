import { test, expect } from '@playwright/test';
import authWithPasswordRes from "./mocks/authWithPassword.json" assert { type: "json" };
import trashBins from "./mocks/trashBins.json" assert { type: "json" };
import itemCollections from "./mocks/itemsCollectionsInit.json" assert { type: "json" };
import regularNoteItemCreate from "./mocks/regularNoteItemCreate.json" assert { type: "json" };
import regularNoteItemEdit from "./mocks/regularNoteItemEdit.json" assert { type: "json" };

import noteWithTitleCreate from "./mocks/noteWithTitleCreate.json" assert { type: "json" };
import noteWithTitleEdit from "./mocks/noteWithTitleEdit.json" assert { type: "json" };
import noteWithTitleToggleCopy from "./mocks/noteWithTitleToggleCopy.json" assert { type: "json" };

import todoCreate from "./mocks/todoCreate.json" assert { type: "json" };
import todoEdit from "./mocks/todoEdit.json" assert { type: "json" };
import todoToggleDone from "./mocks/todoToggleDone.json" assert { type: "json" };

import convertedTodoCreate from "./mocks/convertedTodoCreate.json" assert { type: "json" };
import convertedTodoConvert from "./mocks/convertedTodoConvert.json" assert { type: "json" };
import convertedTodoToggleDone from "./mocks/convertedTodoToggleDone.json" assert { type: "json" };

test.describe("Item actions", () => {

    test.beforeEach(async ({ page }) => {
        await page.route("*/**/api/collections/users/auth-with-password", async route => {
            await route.fulfill({ json: authWithPasswordRes });
        });

        await page.route("*/**/api/collections/trashBins/records?page=1&perPage=1&filter=owner%3D%221x9diejq0lx6e0b%22&skipTotal=1", async route => {
            await route.fulfill({ json: trashBins });
        });

        await page.route("*/**/api/collections/itemCollections/records?page=1&perPage=500&skipTotal=1&sort=sortOrder", async route => {
            await route.fulfill({ json: itemCollections });
        });

        await page.goto('/');
        await page.getByRole('link', { name: 'Login', exact: true }).click();
        await page.getByPlaceholder('lucatiel@mirrah.com').fill('e2eTestAcc');
        await page.getByPlaceholder('BearSeekSeekLest').fill('testaccount');
        await page.getByPlaceholder('BearSeekSeekLest').press('Enter');
        await expect(page.locator("header .collection-menu-btn")).toContainText('Logbook');
    });

    test("Regular note without title, with keyboard", async ({ page }) => {

        /**
         * API Mocks
         */

        // Create Note 
        await page.route("*/**/api/collections/items/records", async route => {
            await route.fulfill({ json: regularNoteItemCreate });
        });

        // Edit
        await page.route("*/**/api/collections/items/records/6u81us701gxtati", async route => {
            await route.fulfill({ json: regularNoteItemEdit });
        });

        /**
         * Actual test
         */

        // Create
        await page.locator('body').press('Control+f');
        await page.getByLabel('Main input', { exact: true }).fill('New quick note');
        await page.getByLabel('Main input', { exact: true }).press('Enter');
        await expect(page.locator('.item[data-index="0"] .item__secondary-text')).toHaveText('New quick note');

        // Edit
        await page.getByLabel('Main input', { exact: true }).press('ArrowDown');
        await page.getByLabel('Main input', { exact: true }).press('Control+Enter');

        await expect(page.getByLabel('Title')).toBeVisible();
        await expect(page.getByLabel("Todo task name")).not.toBeVisible();
        await expect(page.getByLabel("Content", { exact: true })).toBeVisible();
        await expect(page.getByLabel("Content", { exact: true })).toHaveValue('New quick note');
    
        await page.getByLabel("Content", { exact: true }).fill('New quick note edited');
        await page.getByLabel("Content", { exact: true }).press('Control+s');
        await expect(page.locator('.item[data-index="0"] .item__secondary-text')).toHaveText('New quick note edited');

        // Move
        await page.getByLabel('Main input', { exact: true }).press('Control+m');
        await page.getByRole('button', { name: 'Coll2' }).press('Enter');
        await expect(page.locator('#displayed-list')).toBeEmpty();


        // await page.locator("header .collection-menu-btn").click();
        // await page.getByRole('menuitem', { name: 'Coll2' }).click();
        // await expect(page.locator('.item[data-index="0"] .item__secondary-text')).toHaveText('New quick note edited');

        // // Delete
        // await page.keyboard.press('Control+f');
        // await page.keyboard.press('ArrowDown');
        // await page.keyboard.press('Control+Shift+Backspace');

        // await expect(page.locator('#displayed-list')).toBeEmpty();

        // // Delete permanently
        // // await page.locator("header .collection-menu-btn").click();
        // // await page.getByRole('menuitem', { name: 'Trash bin' }).click();
        // // await page.keyboard.press('Control+f');
        // // await page.keyboard.press('ArrowDown');
        // // await page.keyboard.press('Control+Shift+Backspace');

        // // await expect(page.locator('#displayed-list')).toBeEmpty();
    });

    test("Note with title, with pointer", async ({ page }) => {
        // Create
        await page.route("*/**/api/collections/items/records", async route => {
            await route.fulfill({ json: noteWithTitleCreate });
        });

        await page.getByLabel('Main input', { exact: true }).click();
        await page.getByLabel('Main input', { exact: true }).fill('Sample title');
        await page.getByLabel('Extra functions and options').click();
        await page.getByRole('menuitem', { name: 'with title' }).click();
        await expect(page.getByLabel('Main input', { exact: true })).toHaveValue(':t: Sample title');        
        await page.getByLabel('Main input', { exact: true }).press('Enter');
        await expect(page.getByLabel('Title')).toBeVisible();
        await expect(page.getByLabel("Content", { exact: true })).toBeVisible();
        await page.getByLabel("Content", { exact: true }).click();
        await page.getByLabel("Content", { exact: true }).fill('Sample content');
        await page.getByRole('button', { name: 'Create' }).click();

        await expect(page.locator('.item[data-index="0"] .item__primary-text')).toHaveText('Sample title');
        await expect(page.locator('.item[data-index="0"] .item__secondary-text')).toHaveText('Sample content');

        // Edit
        await page.route("*/**/api/collections/items/records/lm9vmoh3yez44s2", async route => {
            await route.fulfill({ json: noteWithTitleEdit });
        });

        await page.locator('.item[data-index="0"]').click({ button: 'right' });
        await page.getByRole('button', { name: 'Edit', exact: true }).click();
        await page.getByLabel('Title').click();
        await page.getByLabel('Title').fill('Sample title edited');
        await page.getByLabel("Content", { exact: true }).click();
        await page.getByLabel("Content", { exact: true }).fill('Sample content edited');
        await page.getByLabel("Content", { exact: true }).press('Control+s');

        await expect(page.locator('.item[data-index="0"] .item__primary-text')).toHaveText('Sample title edited');
        await expect(page.locator('.item[data-index="0"] .item__secondary-text')).toHaveText('Sample content edited');

        // Mark to copy on click
        await page.route("*/**/api/collections/items/records/lm9vmoh3yez44s2", async route => {
            await route.fulfill({ json: noteWithTitleToggleCopy });
        });

        await page.locator('.item[data-index="0"]').click({ button: 'right' });
        await page.getByRole('button', { name: 'To copy' }).click();
        await page.waitForTimeout(500);
        await expect(page.getByLabel("Content", { exact: true })).not.toBeVisible();

        // Delete
        await page.locator('.item[data-index="0"]').click({ button: 'right' });
        await page.getByRole('button', { name: 'Trash' }).click();
        await expect(page.locator('#displayed-list')).toBeEmpty();
    });

    test("Create todo, with pointer", async ({ page }) => {
        // Create
        await page.route("*/**/api/collections/items/records", async route => {
            await route.fulfill({ json: todoCreate });
        });

        await page.getByLabel('Main input', { exact: true }).fill('Buy groceries');
        await page.getByLabel('Extra functions and options').click();
        await page.getByRole('menuitem', { name: 'as todo' }).click();
        await expect(page.getByLabel('Main input', { exact: true })).toHaveValue(':td: Buy groceries');
        await page.getByLabel('Main input', { exact: true }).press('Enter');

        await expect(page.locator('.item[data-index="0"] .item__primary-text')).toHaveText('Buy groceries');
        await expect(page.locator('.item[data-index="0"] .item__primary-text')).not.toHaveCSS("text-decoration", "line-through solid rgb(68, 68, 68)");

        // Mark as done
        await page.route("*/**/api/collections/items/records/umu61zocq8yq2a6", async route => {
            await route.fulfill({ json: todoToggleDone });
        });

        await page.locator('.item[data-index="0"]').click();
        await expect(page.locator('.item[data-index="0"] .item__primary-text')).toHaveCSS("text-decoration", "line-through solid rgb(68, 68, 68)");

        // Edit
        await page.route("*/**/api/collections/items/records/umu61zocq8yq2a6", async route => {
            await route.fulfill({ json: todoEdit });
        });

        await page.locator('.item[data-index="0"]').click({ button: 'right' });
        await page.getByRole('button', { name: 'Edit', exact: true }).click();
        await expect(page.getByLabel("Todo task name")).toBeVisible();
        await expect(page.getByLabel('Title')).not.toBeVisible();
        await expect(page.getByLabel("Content", { exact: true })).not.toBeVisible();

        await page.getByLabel("Todo task name").fill('Buy groceries 2');
        await page.keyboard.press('Control+s');
        await expect(page.locator('.item[data-index="0"] .item__primary-text')).toHaveText('Buy groceries 2');

        // Delete
        await page.locator('.item[data-index="0"]').click({ button: 'right' });
        await page.getByRole('button', { name: 'Trash' }).click();
        await expect(page.locator('#displayed-list')).toBeEmpty();
    });

    test("Convert to todo, with pointer", async ({ page }) => {
        // Create
        await page.route("*/**/api/collections/items/records", async route => {
            await route.fulfill({ json: convertedTodoCreate });
        });

        await page.getByLabel('Main input', { exact: true }).fill('Upgrade longsword');
        await page.getByLabel('Main input', { exact: true }).press('Enter');

        await expect(page.locator('.item[data-index="0"] .item__primary-text')).not.toBeVisible();
        await expect(page.locator('.item[data-index="0"] .item__secondary-text')).toHaveText('Upgrade longsword');

        // Convert
        await page.route("*/**/api/collections/items/records/s8h780lulq640kd", async route => {
            await route.fulfill({ json: convertedTodoConvert });
        });

        await page.locator('.item[data-index="0"]').click({ button: 'right' });
        await page.getByRole('button', { name: 'Convert to Todo', exact: true }).click();

        await expect(page.locator('.item[data-index="0"] .item__primary-text')).toHaveText('Upgrade longsword');
        await expect(page.locator('.item[data-index="0"] .item__secondary-text')).not.toBeVisible();

        // Mark as done
        await page.route("*/**/api/collections/items/records/s8h780lulq640kd", async route => {
            await route.fulfill({ json: convertedTodoToggleDone });
        });

        await page.locator('.item[data-index="0"]').click();
        await expect(page.locator('.item[data-index="0"] .item__primary-text')).toHaveCSS("text-decoration", "line-through solid rgb(68, 68, 68)");

        // Delete
        await page.locator('.item[data-index="0"]').click({ button: 'right' });
        await page.getByRole('button', { name: 'Trash' }).click();
        await expect(page.locator('#displayed-list')).toBeEmpty();
    });

    test("Create link, with keyboard", async ({ page }) => {
        await page.locator('body').press('Control+f');
        await page.getByLabel('Main input', { exact: true }).fill('mozilla.org');
        await page.getByLabel('Main input', { exact: true }).press('Enter');

        await page.waitForTimeout(2000);

        await expect(page.locator('.item[data-index="0"]')).toContainText('Internet for people, not profit — Mozilla Global');

        // Delete
        await page.keyboard.press('Control+f');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Control+Shift+Backspace');
    });

    test("Create note with trailing hex colour code, with keyboard", async ({ page }) => {
        await page.locator('body').press('Control+f');
        await page.getByLabel('Main input', { exact: true }).fill('Some random content #00FF00');
        await page.getByLabel('Main input', { exact: true }).press('Enter');
        await expect(page.locator('.item[data-index="0"]')).toContainText('Some random content #00FF00');
        await expect(page.locator('.item[data-index="0"] .item__icon-colour')).toHaveCSS("background-color", "rgb(0, 255, 0)");

        // Delete
        await page.keyboard.press('Control+f');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Control+Shift+Backspace');
    });
});