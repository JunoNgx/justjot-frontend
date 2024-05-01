import { test, expect } from '@playwright/test';

test('Navigating public routes, using pointer', async ({ page }) => {
    await page.goto('/');

    // Landing page
    await expect(page.getByRole('heading', { name: 'JustJot' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Try now' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login', exact: true })).toBeVisible();
    await expect(page.getByRole('banner').getByRole('link', { name: 'Register' })).toBeVisible();

    // Login page
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Request reset' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Request verification' })).toBeVisible();

    // Register page
    await page.getByRole('banner').getByRole('link', { name: 'Register' }).click();
    await expect(page.getByRole('link', { name: 'terms and conditions' })).toBeVisible();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'terms and conditions' }).click();
    const page1 = await page1Promise;
    await expect(page1.getByRole('heading', { name: 'Terms and Conditions' })).toBeVisible();

    // Reset page
    await page1.getByRole('link', { name: 'Login' }).click();
    await page1.getByRole('link', { name: 'Request reset' }).click();
    await expect(page1.getByRole('heading', { name: 'Request password change' })).toBeVisible();

    // Verify page
    await page1.getByRole('banner').getByRole('link', { name: 'Login' }).click();
    await page1.getByRole('link', { name: 'Request verification' }).click();
    await expect(page1.getByRole('heading', { name: 'Request email verification' })).toBeVisible();
});