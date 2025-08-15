import { describe, expect, test, afterEach } from "vitest";
import items from "@/__tests__/fixtures/items.json";
import { render, cleanup } from "@testing-library/react";
import { justJotCssVarsResolver, justJotTheme } from "@/theme.ts";

import { MantineProvider } from "@mantine/core";
import ItemComponentIcon from "@/components/itemComponent/ItemComponentIcon";
import { Item, ThemeMode } from "@/types";
import { UserLocalSettingsContext } from "@/contexts/UserLocalSettingsContext";

describe("ItemComponentIcon", () => {
    const renderItemComponentIcon = (item: Item) =>
        render(
            <MantineProvider
                theme={justJotTheme}
                cssVariablesResolver={justJotCssVarsResolver}
            >
                <UserLocalSettingsContext.Provider
                    value={{
                        themeMode: ThemeMode.LIGHT,
                        isFaviconEnabled: true,
                        setThemeMode: () => {},
                        setIsFaviconEnabled: () => {},
                    }}
                >
                    <ItemComponentIcon item={item} />
                </UserLocalSettingsContext.Provider>
            </MantineProvider>
        );

    afterEach(() => {
        cleanup();
    });

    test("Text note icon", async () => {
        const item = items[7];
        renderItemComponentIcon(item);
        const iconEl = document.querySelector(".tabler-icon");
        const classList = [...iconEl!.classList];

        expect(classList.includes("tabler-icon-file-text")).toBe(true);
    });

    test("Link icon without favicon", async () => {
        const item = { ...items[4] };
        item.faviconUrl = "";
        renderItemComponentIcon(item);
        const iconEl = document.querySelector(".tabler-icon");
        const classList = [...iconEl!.classList];

        expect(classList.includes("tabler-icon-world")).toBe(true);
    });

    test("Favicon", async () => {
        const item = items[4];
        renderItemComponentIcon(item);
        const iconEl = document.querySelector("img");
        expect(iconEl?.getAttribute("src")).toBe(item.faviconUrl);
    });

    test("Pending icon", async () => {
        const item: Item = { ...items[0] };
        item.isPending = true;
        renderItemComponentIcon(item);
        const iconEl = document.querySelector(".tabler-icon");
        const classList = [...iconEl!.classList];

        expect(classList.includes("tabler-icon-hourglass-low")).toBe(true);
    });

    test("Notated hex colour code icon", async () => {
        const item: Item = { ...items[7] };
        item.content += "#FF0000";
        renderItemComponentIcon(item);
        const iconEl = document.querySelector(".Item__IconColour");

        expect(iconEl?.getAttribute("style")).toBe(
            "background-color: #FF0000;"
        );
    });

    test("Todo icon, has NOT marked as completed", async () => {
        const item = items[1];
        renderItemComponentIcon(item);
        const iconEl = document.querySelector(".tabler-icon");
        const classList = [...iconEl!.classList];

        expect(classList.includes("tabler-icon-square")).toBe(true);
    });

    test("Todo icon, has been marked as completed", async () => {
        const item = items[0];
        renderItemComponentIcon(item);
        const iconEl = document.querySelector(".tabler-icon");
        const classList = [...iconEl!.classList];

        expect(classList.includes("tabler-icon-checkbox")).toBe(true);
    });
});
