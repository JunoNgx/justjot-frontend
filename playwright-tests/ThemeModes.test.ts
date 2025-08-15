import { test, expect } from "@playwright/test";

test.describe("Theme modes", () => {
    const spotlightTextboxSelector = "input.mantine-Spotlight-search";

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test.describe("System mode", () => {
        test.describe("With header button", () => {
            test.beforeEach(async ({ page }) => {
                await page
                    .getByRole("button", { name: "Theme mode: System" })
                    .click();
            });

            test("Light mode", async ({ page }) => {
                await page.emulateMedia({ colorScheme: "light" });
                await expect(page.locator("body")).toHaveCSS(
                    "background-color",
                    "rgb(224, 224, 224)"
                );
            });

            test("Dark mode", async ({ page }) => {
                await page.emulateMedia({ colorScheme: "dark" });
                await expect(page.locator("body")).toHaveCSS(
                    "background-color",
                    "rgb(18, 18, 18)"
                );
            });
        });

        test.describe("With spotlight action", () => {
            test.beforeEach(async ({ page }) => {
                await page.locator("body").press("Control+k");
                await page
                    .locator(spotlightTextboxSelector)
                    .fill(".theme-system");
                await page.locator(spotlightTextboxSelector).press("Enter");
            });

            test("Light mode", async ({ page }) => {
                await page.emulateMedia({ colorScheme: "light" });
                await expect(page.locator("body")).toHaveCSS(
                    "background-color",
                    "rgb(224, 224, 224)"
                );
            });

            test("Dark mode", async ({ page }) => {
                await page.emulateMedia({ colorScheme: "dark" });
                await expect(page.locator("body")).toHaveCSS(
                    "background-color",
                    "rgb(18, 18, 18)"
                );
            });
        });
    });

    test.describe("Light mode", () => {
        test("With header button", async ({ page }) => {
            await page
                .getByRole("button", { name: "Theme mode: Light" })
                .click();
            await expect(page.locator("body")).toHaveCSS(
                "background-color",
                "rgb(224, 224, 224)"
            );
        });

        test("With spotlight action", async ({ page }) => {
            await page.locator("body").press("Control+k");
            await page.locator(spotlightTextboxSelector).fill(".theme-light");
            await page.locator(spotlightTextboxSelector).press("Enter");
            await expect(page.locator("body")).toHaveCSS(
                "background-color",
                "rgb(224, 224, 224)"
            );
        });
    });

    test.describe("Dark mode", () => {
        test("With header button", async ({ page }) => {
            await page
                .getByRole("button", { name: "Theme mode: Dark" })
                .click();
            await expect(page.locator("body")).toHaveCSS(
                "background-color",
                "rgb(18, 18, 18)"
            );
        });

        test("With spotlight action", async ({ page }) => {
            await page.locator("body").press("Control+k");
            await page.locator(spotlightTextboxSelector).fill(".theme-dark");
            await page.locator(spotlightTextboxSelector).press("Enter");
            await expect(page.locator("body")).toHaveCSS(
                "background-color",
                "rgb(18, 18, 18)"
            );
        });
    });
});
