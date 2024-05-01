import { test, expect } from '@playwright/test';

test('Navigating public routes, using Spotlight', async ({ page }) => {
    const spotlightTextboxSelector = 'input.mantine-Spotlight-search';

    await page.goto('http://localhost:4173/');

    await page.locator('body').press('Control+k');
    await expect(page.locator(spotlightTextboxSelector)).toBeVisible();

    await page.locator(spotlightTextboxSelector).fill('login');
    await page.locator(spotlightTextboxSelector).press('Enter');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    await page.locator('body').press('Control+k');
    await page.locator(spotlightTextboxSelector).fill('regist');
    await page.locator(spotlightTextboxSelector).press('Enter');
    await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();

    await page.locator('body').press('Control+k');
    await page.locator(spotlightTextboxSelector).fill('reset');
    await page.locator(spotlightTextboxSelector).press('Enter');
    await expect(page.getByRole('heading', { name: 'Request password change' })).toBeVisible();

    await page.locator('body').press('Control+k');
    await page.locator(spotlightTextboxSelector).fill('verify');
    await page.locator(spotlightTextboxSelector).press('Enter');
    await expect(page.getByRole('heading', { name: 'Request email verification' })).toBeVisible();

    await page.locator('body').press('Control+k');
    await page.locator(spotlightTextboxSelector).fill('demo');
    await page.locator(spotlightTextboxSelector).press('Enter');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByText('Try using the test account')).toBeVisible();
});