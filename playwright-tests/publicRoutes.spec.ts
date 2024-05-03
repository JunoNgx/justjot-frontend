import { test, expect } from '@playwright/test';

test.describe("Navigating public routes", () => {

    test.describe("Using pointer", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/');
        });

        test("Landing page", async ({ page }) => {
            await expect(page.getByRole('heading', { name: 'JustJot' })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Try now' })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Login', exact: true })).toBeVisible();
            await expect(page.getByRole('banner').getByRole('link', { name: 'Register' })).toBeVisible();
        });

        test("Login page", async ({ page }) => {
            await page.getByRole('link', { name: 'Login', exact: true }).click();
            await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Request reset' })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Request verification' })).toBeVisible();
        });

        test("Register page", async ({ page }) => {
            await page.getByRole('banner').getByRole('link', { name: 'Register' }).click();
            await expect(page.getByRole('link', { name: 'terms and conditions' })).toBeVisible();

            const page1Promise = page.waitForEvent('popup');
            await page.getByRole('link', { name: 'terms and conditions' }).click();
            const page1 = await page1Promise;
            await expect(page1.getByRole('heading', { name: 'Terms and Conditions' })).toBeVisible();
        });

        test("Reset password page", async ({ page }) => {
            await page.getByRole('link', { name: 'Login', exact: true }).click();
            await page.getByRole('link', { name: 'Request reset' }).click();
            await expect(page.getByRole('heading', { name: 'Request password change' })).toBeVisible();
        });

        test("Verify email page", async ({ page }) => {
            await page.getByRole('link', { name: 'Login', exact: true }).click();
            await page.getByRole('link', { name: 'Request verification' }).click();
            await expect(page.getByRole('heading', { name: 'Request email verification' })).toBeVisible();
        });

        test("Demo login page", async ({ page }) => {
            await page.getByRole('link', { name: 'Try now' }).click();
            await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
            await expect(page.getByText('Try using the test account')).toBeVisible();
        });
    });

    test.describe("Using Spotlight", () => {
        const spotlightTextboxSelector = 'input.mantine-Spotlight-search';

        test.beforeEach(async ({ page }) => {
            await page.goto('/');
            await page.locator('body').press('Control+k');
        });

        test("Spotlight is visible with shortcut", async ({ page }) => {
            await expect(page.locator(spotlightTextboxSelector)).toBeVisible();
            await page.locator(spotlightTextboxSelector).press('Escape');
            await page.locator('body').press('Control+p');
            await expect(page.locator(spotlightTextboxSelector)).toBeVisible();
        });

        test("Login page", async ({ page }) => {
            await page.locator(spotlightTextboxSelector).fill('login');
            await page.locator(spotlightTextboxSelector).press('Enter');
            await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
        });

        test("Register page", async ({ page }) => {
            await page.locator(spotlightTextboxSelector).fill('regist');
            await page.locator(spotlightTextboxSelector).press('Enter');
            await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
        });

        test("Terms and conditions page", async ({ page }) => {
            await page.locator(spotlightTextboxSelector).fill('terms');
            await page.locator(spotlightTextboxSelector).press('Enter');
            await expect(page.getByRole('heading', { name: 'Terms and Conditions' })).toBeVisible();
        });

        test("Reset password page", async ({ page }) => {
            await page.locator(spotlightTextboxSelector).fill('reset');
            await page.locator(spotlightTextboxSelector).press('Enter');
            await expect(page.getByRole('heading', { name: 'Request password change' })).toBeVisible();
        });

        test("Verify email page", async ({ page }) => {
            await page.locator(spotlightTextboxSelector).fill('verify');
            await page.locator(spotlightTextboxSelector).press('Enter');
            await expect(page.getByRole('heading', { name: 'Request email verification' })).toBeVisible();
        });

        test("Demo login page", async ({ page }) => {
            await page.locator(spotlightTextboxSelector).fill('demo');
            await page.locator(spotlightTextboxSelector).press('Enter');
            await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
            await expect(page.getByText('Try using the test account')).toBeVisible();
        });
    });
});