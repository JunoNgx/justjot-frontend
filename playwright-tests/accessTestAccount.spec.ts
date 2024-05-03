import { test, expect } from '@playwright/test';

test('Accessing test account', async ({ page }) => {
    await page.goto('/demo-login');

    // await expect(page.getByText('Just want to take a look?Account-free live demo availableTry now')).toBeVisible();
    // await expect(page.getByRole('link', { name: 'Try now' })).toBeVisible();

    // await page.getByRole('link', { name: 'Try now' }).click();

    await expect(page.getByText('Try using the test account')).toBeVisible();
    await expect(page.getByPlaceholder('lucatiel@mirrah.com')).toHaveValue('JayDoeTest');
    await expect(page.getByPlaceholder('BearSeekSeekLest')).toHaveValue('password123');

//     await page.getByRole('button', { name: 'Login' }).click();

//     // Test account default data
//     await expect(page.getByText('You are using the test')).toBeVisible();
//     // TODO: to fix and uncomment
//     // await expect(page.getByRole('button', { name: 'Buy bacon' })).toBeVisible();
//     await expect(page.getByLabel('Link to this item content')).toBeVisible();

//     // Switch collection
//     await page.getByRole('button', { name: 'Personal' }).click();
//     await expect(page.getByRole('menuitem', { name: 'Work' })).toBeVisible();

//     await page.getByRole('menuitem', { name: 'Work' }).click();
//     await expect(page.getByRole('button', { name: 'Hexcode validator func export' })).toBeVisible();
});