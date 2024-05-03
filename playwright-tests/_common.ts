import { Page } from "@playwright/test";
import authWithPasswordRes from "./mocks/authWithPassword.json" assert { type: "json" };
import fetchTrashBin from "./mocks/fetchTrashBin.json" assert { type: "json" };
import fetchCollectionsInit from "./mocks/fetchCollectionsInit.json" assert { type: "json" };

export const loginWithMocks = async ({ page }: { page: Page}) => {
    await page.route("*/**/api/collections/users/auth-with-password", async route => {
        await route.fulfill({ json: authWithPasswordRes });
    });

    await page.route("*/**/api/collections/trashBins/records?page=1&perPage=1&filter=owner%3D%221x9diejq0lx6e0b%22&skipTotal=1", async route => {
        await route.fulfill({ json: fetchTrashBin });
    });

    await page.route("*/**/api/collections/itemCollections/records?page=1&perPage=500&skipTotal=1&sort=sortOrder", async route => {
        await route.fulfill({ json: fetchCollectionsInit });
    });

    await page.goto('/');
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await page.getByPlaceholder('lucatiel@mirrah.com').fill('e2eTestAcc');
    await page.getByPlaceholder('BearSeekSeekLest').fill('testaccount');
    await page.getByPlaceholder('BearSeekSeekLest').press('Enter');
}

export const spotlightTextboxSelector = 'input.mantine-Spotlight-search';
