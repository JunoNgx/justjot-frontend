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

    await page.route("*/**/api/collections/trashBins/*", async route => {
        await route.fulfill({ json: fetchTrashBin });
    });

    await page.route("*/**/api/collections/itemCollections/*", async route => {
        await route.fulfill({ json: fetchCollectionsInit });
    });
}

export const interceptApiRequestForItems = async (page: Page) => {
    await page.route("*/**/api/collections/items/*", async route => {
        await route.fulfill({ json: fetchItemsFilled });
    });
}

export const interceptApiRequestForTrashedItems = async (page: Page) => {
    await page.route("*/**/api/collections/items/*", async route => {
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
