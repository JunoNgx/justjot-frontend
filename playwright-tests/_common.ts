import { Page } from "@playwright/test";
import authWithPasswordRes from "./mocks/authWithPassword.json" assert { type: "json" };
import fetchTrashBin from "./mocks/fetchTrashBin.json" assert { type: "json" };
import fetchCollectionsInit from "./mocks/fetchCollectionsInit.json" assert { type: "json" };
import fetchItemsFilled from "./mocks/fetchItemsFilled.json" assert { type: "json" };
import fetchItemsTrashed from "./mocks/fetchItemsTrashed.json" assert { type: "json" };

const interceptBasicApiRequests = async (page: Page) => {
    await page.route("*/**/api/collections/users/auth-with-password", async route => {
        await route.fulfill({ json: authWithPasswordRes });
    });

    await page.route("*/**/api/collections/trashBins/records?page=1&perPage=1&filter=owner%3D%221x9diejq0lx6e0b%22&skipTotal=1", async route => {
        await route.fulfill({ json: fetchTrashBin });
    });

    await page.route("*/**/api/collections/itemCollections/records?page=1&perPage=500&skipTotal=1&sort=sortOrder", async route => {
        await route.fulfill({ json: fetchCollectionsInit });
    });
}

export const interceptApiRequestForItems = async (page: Page) => {
    await page.route("*/**/api/collections/items/records?page=1&perPage=500&skipTotal=1&filter=collection%3D%226qt1usrvke0tuac%22%20%26%26%20isTrashed%3Dfalse&sort=-created", async route => {
        await route.fulfill({ json: fetchItemsFilled });
    });
}

export const interceptApiRequestForTrashedItems = async (page: Page) => {
    await page.route("*/**/api/collections/items/records?page=1&perPage=500&skipTotal=1&filter=isTrashed%3Dtrue&sort=-trashedDateTime", async route => {
        await route.fulfill({ json: fetchItemsTrashed });
    });
}

const navigateToLogin = async (page: Page) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await page.getByPlaceholder('lucatiel@mirrah.com').fill('e2eTestAcc');
    await page.getByPlaceholder('BearSeekSeekLest').fill('testaccount');
    await page.getByPlaceholder('BearSeekSeekLest').press('Enter');
}

export const loginWithMocks = async ({ page }: { page: Page }) => {
    await interceptBasicApiRequests(page);
    await navigateToLogin(page);
}

export const loginWithMocksAndFilledItems = async ({ page }: { page: Page }) => {
    await interceptBasicApiRequests(page);
    await interceptApiRequestForItems(page);
    await navigateToLogin(page);
}

export const spotlightTextboxSelector = 'input.mantine-Spotlight-search';
