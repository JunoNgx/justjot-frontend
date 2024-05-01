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

    // test('Using pointer', async ({ page }) => {
    //     await page.goto('/');
    
    //     // Landing page
    //     await expect(page.getByRole('heading', { name: 'JustJot' })).toBeVisible();
    //     await expect(page.getByRole('link', { name: 'Try now' })).toBeVisible();
    //     await expect(page.getByRole('link', { name: 'Login', exact: true })).toBeVisible();
    //     await expect(page.getByRole('banner').getByRole('link', { name: 'Register' })).toBeVisible();
    
    //     // Login page
    //     await page.getByRole('link', { name: 'Login', exact: true }).click();
    //     await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    //     await expect(page.getByRole('link', { name: 'Request reset' })).toBeVisible();
    //     await expect(page.getByRole('link', { name: 'Request verification' })).toBeVisible();
    
    //     // Register page
    //     await page.getByRole('banner').getByRole('link', { name: 'Register' }).click();
    //     await expect(page.getByRole('link', { name: 'terms and conditions' })).toBeVisible();
    //     const page1Promise = page.waitForEvent('popup');
    //     await page.getByRole('link', { name: 'terms and conditions' }).click();
    //     const page1 = await page1Promise;
    //     await expect(page1.getByRole('heading', { name: 'Terms and Conditions' })).toBeVisible();
    
    //     // Reset page
    //     await page1.getByRole('link', { name: 'Login' }).click();
    //     await page1.getByRole('link', { name: 'Request reset' }).click();
    //     await expect(page1.getByRole('heading', { name: 'Request password change' })).toBeVisible();
    
    //     // Verify page
    //     await page1.getByRole('banner').getByRole('link', { name: 'Login' }).click();
    //     await page1.getByRole('link', { name: 'Request verification' }).click();
    //     await expect(page1.getByRole('heading', { name: 'Request email verification' })).toBeVisible();

    //     // Demo login page
    //     await page.getByLabel('Link to home page').click();
    //     await page.getByRole('link', { name: 'Try now' }).click();
    //     await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    //     await expect(page.getByText('Try using the test account')).toBeVisible();
    // });

    // test('Using Spotlight', async ({ page }) => {
    //     const spotlightTextboxSelector = 'input.mantine-Spotlight-search';
    
    //     await page.goto('/');
    
    //     await page.locator('body').press('Control+k');
    //     await expect(page.locator(spotlightTextboxSelector)).toBeVisible();
    
    //     await page.locator(spotlightTextboxSelector).fill('login');
    //     await page.locator(spotlightTextboxSelector).press('Enter');
    //     await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    
    //     await page.locator('body').press('Control+k');
    //     await page.locator(spotlightTextboxSelector).fill('regist');
    //     await page.locator(spotlightTextboxSelector).press('Enter');
    //     await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
    
    //     await page.locator('body').press('Control+k');
    //     await page.locator(spotlightTextboxSelector).fill('reset');
    //     await page.locator(spotlightTextboxSelector).press('Enter');
    //     await expect(page.getByRole('heading', { name: 'Request password change' })).toBeVisible();
    
    //     await page.locator('body').press('Control+k');
    //     await page.locator(spotlightTextboxSelector).fill('verify');
    //     await page.locator(spotlightTextboxSelector).press('Enter');
    //     await expect(page.getByRole('heading', { name: 'Request email verification' })).toBeVisible();
    
    //     await page.locator('body').press('Control+k');
    //     await page.locator(spotlightTextboxSelector).fill('demo');
    //     await page.locator(spotlightTextboxSelector).press('Enter');
    //     await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    //     await expect(page.getByText('Try using the test account')).toBeVisible();
    // });
});