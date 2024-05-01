import { describe, expect, test, afterEach } from 'vitest';
import items from "@/__tests__/fixtures/items.json";
import { render, cleanup, screen } from "@testing-library/react";
import { justJotCssVarsResolver, justJotTheme } from '@/theme.ts';
import { MantineProvider } from '@mantine/core';
import ItemComponentText from '@/components/itemComponent/ItemComponentText';
import { Item } from '@/types';
import EventBusContextProvider from '@/contexts/EventBusContext';

describe("ItemComponentText", () => {

    const renderItemComponentText = (item: Item) => render(
        <MantineProvider
            theme={justJotTheme}
            cssVariablesResolver={justJotCssVarsResolver}
        >
            <EventBusContextProvider>
                <ItemComponentText item={item} />
            </EventBusContextProvider>
        </MantineProvider>
    );

    afterEach(() => {
        cleanup();
    });

    test("Normal text note with title and content", async () => {
        const item = items[7];
        renderItemComponentText(item);
        const priTextEl = screen.queryByTestId("item-component-primary-text");
        const secTextEl = screen.queryByTestId("item-component-secondary-text");

        expect(priTextEl?.textContent).toBe("A normal text note");
        expect(secTextEl?.textContent).toBe("Content sample");
    });

    test("Text note without title", async () => {
        const item = items[6];
        renderItemComponentText(item);
        const priTextEl = screen.queryByTestId("item-component-primary-text");
        const secTextEl = screen.queryByTestId("item-component-secondary-text");

        expect(priTextEl).toBe(null);
        expect(secTextEl?.textContent).toBe("A note without title");
    });

    test("Text note without content", async () => {
        const item = items[5];
        renderItemComponentText(item);
        const priTextEl = screen.queryByTestId("item-component-primary-text");
        const secTextEl = screen.queryByTestId("item-component-secondary-text");

        expect(priTextEl?.textContent).toBe("A note with title but no content");
        expect(secTextEl).toBe(null);
    });

    test("A link", async () => {
        const item = items[4];
        renderItemComponentText(item);
        const priTextEl = screen.queryByTestId("item-component-primary-text");
        const secTextEl = screen.queryByTestId("item-component-secondary-text");

        expect(priTextEl?.textContent).toBe("Internet for people, not profit — Mozilla (US)");
        expect(secTextEl?.textContent).toBe("https://www.mozilla.org/en-US/");
    });

    test("A todo item", () => {
        const item = items[0];
        renderItemComponentText(item);
        const priTextEl = screen.queryByTestId("item-component-primary-text");
        const secTextEl = screen.queryByTestId("item-component-secondary-text");

        expect(priTextEl?.textContent).toBe("A todo item that has been marked as completed");
        expect(secTextEl).toBe(null);
    });

});
