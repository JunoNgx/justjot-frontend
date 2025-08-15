import { test, expect } from "@playwright/test";

test("Accessing test account", async ({ page }) => {
    await page.goto("/demo-login");

    await expect(page.getByText("Try using the test account")).toBeVisible();
    await expect(page.getByPlaceholder("lucatiel@mirrah.com")).toHaveValue(
        "JayDoeTest"
    );
    await expect(page.getByPlaceholder("BearSeekSeekLest")).toHaveValue(
        "password123"
    );
});
