import { describe, expect, test, afterEach } from 'vitest';
import items from "@/__tests__/fixtures/items.json";
import { render, screen, cleanup } from "@testing-library/react";
import { justJotCssVarsResolver, justJotTheme } from '@/theme.ts';
import { DateTime, Settings } from 'luxon';

import ItemComponentCreatedDate from '@/components/itemComponent/ItemComponentCreatedDate';
import { MantineProvider } from '@mantine/core';

describe("ItemComponentCreatedDate", () => {

    const mockedNowDateTime = DateTime.utc(2024, 4, 27, 18, 0, 0);
    Settings.now = () => mockedNowDateTime.toMillis();
    Settings.defaultZone = "Europe/Berlin";

    const renderItemComponentCreatedTime = (createdTimeString: string) => render(
        <MantineProvider
                theme={justJotTheme}
                cssVariablesResolver={justJotCssVarsResolver}
            >
            <ItemComponentCreatedDate createdDatetime={createdTimeString} />
        </MantineProvider>
    );

    afterEach(() => {
        cleanup();
    });

    test("Created more than one year ago", async () => {
        renderItemComponentCreatedTime(items[7].created)
        const itemCreatedDatetime = await screen
            .findByTestId("item-component-created-date");
        expect(itemCreatedDatetime.textContent).toBe("Feb 24 2023");
    });

    test("Created more one than one day ago", async () => {
        renderItemComponentCreatedTime(items[6].created)
        const itemCreatedDatetime = await screen
            .findByTestId("item-component-created-date");
        expect(itemCreatedDatetime.textContent).toBe("Apr 24");
    });

    test("Created today", async () => {
        renderItemComponentCreatedTime(items[5].created)
        const itemCreatedDatetime = await screen
            .findByTestId("item-component-created-date");
        expect(itemCreatedDatetime.textContent).toBe("12:05");
    });
});
