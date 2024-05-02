import { test, expect } from '@playwright/test';
import authWithPasswordRes from "./mocks/authWithPassword.json" assert { type: "json" };
import trashBins from "./mocks/trashBins.json" assert { type: "json" };
import itemCollections from "./mocks/itemsCollectionsInit.json" assert { type: "json" };
import itemsEmpty from "./mocks/itemsEmpty.json" assert { type: "json" };
import newItemCollection from "./mocks/newItemCollection.json" assert { type: "json" };
import editItemCollection from "./mocks/editItemCollection.json" assert { type: "json" };

test.describe("Collection actions", () => {

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

        await page.route("*/**/api/collections/items/records?page=1&perPage=500&skipTotal=1&filter=collection%3D%226qt1usrvke0tuac%22%20%26%26%20isTrashed%3Dfalse&sort=-created", async route => {
            await route.fulfill({ json: itemsEmpty });
        });

        await page.route("*/**/api/collections/itemCollections/records", async route => {
            await route.fulfill({ json: newItemCollection });
        });

        await page.route("*/**/api/collections/itemCollections/records/o01002w6k5krq60", async route => {
            await route.fulfill({ json: editItemCollection });
        });

        await page.goto('/');
        await page.getByRole('link', { name: 'Login', exact: true }).click();
        await page.getByPlaceholder('lucatiel@mirrah.com').fill('e2eTestAcc');
        await page.getByPlaceholder('BearSeekSeekLest').fill('testaccount');
        await page.getByPlaceholder('BearSeekSeekLest').press('Enter');
    });

    test("Collection lifespan", async ({ page }) => {
        // Create
        await page.locator("header .collection-menu-btn").click();
        await page.getByRole('menuitem', { name: 'Create collection' }).click();
        await page.getByPlaceholder('My collection').fill('Coll3');
        await page.getByRole('button', { name: 'Create collection' }).click();

        // Test: auto-navigate to new collection
        await expect(page).toHaveURL("e2eTestAcc/coll-3");
        await expect(page.locator("header .collection-menu-btn")).toContainText('Coll3');

        // Edit
        await page.locator("header .collection-menu-btn").click();
        await page.getByRole('menuitem', { name: 'Edit collection' }).click();

        // Test: current values are correctly passed to modal
        await expect(page.getByPlaceholder('My collection')).toHaveValue('Coll3');
        await expect(page.getByPlaceholder('my-collection')).toHaveValue('coll-3');

        await page.getByPlaceholder('My collection').click();
        await page.getByPlaceholder('My collection').fill('Coll3-!#+$%^-edited');

        // Test: slugify logic
        await expect(page.getByPlaceholder('my-collection')).toHaveValue('coll-3-edited');

        await page.getByRole('button', { name: 'Update collection' }).click();

        // Test: url slug is updated
        await expect(page).toHaveURL("e2eTestAcc/coll-3-edited");
        await expect(page.locator("header .collection-menu-btn")).toContainText('Coll3-!#+$%^-edited');

        // Delete
        await page.locator("header .collection-menu-btn").click();
        await page.getByRole('menuitem', { name: 'Delete collection' }).click();
        await page.getByRole('button', { name: 'Delete collection' }).click();

        // Test: auto-navigate to current index, meaning the next collection
        // In this case, it's the trash bin.
        await expect(page).toHaveURL("e2eTestAcc/trash-bin");
        await expect(page.locator("header .collection-menu-btn")).toContainText('Trash bin');
    });
});