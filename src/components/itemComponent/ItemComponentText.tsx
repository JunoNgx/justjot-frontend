import { Item } from "@/types";
import { useContext, useEffect, useRef, useState } from "react";
import { EventBusContext } from "@/contexts/EventBusContext";

const CHAR_DISPLAY_COUNT = 150;
const COPIED_DISPLAY_DURATION = 1500;

export default function ItemComponentText({ item, index }: { item: Item, index: number }) {
    const { emitter } = useContext(EventBusContext);

    const [hasCopied, setHasCopied] = useState(false);
    const timeoutCopyRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    );

    useEffect(() => {
        emitter.on("copyItemContent", handleCopyItemContentEvent);

        return () => {
            clearTimeout(timeoutCopyRef.current);
        };
    }, []);

    const handleCopyItemContentEvent = (itemId: string) => {
        if (item.id !== itemId) return;

        setHasCopied(true);

        clearTimeout(timeoutCopyRef.current);
        timeoutCopyRef.current = setTimeout(() => {
            setHasCopied(false);
        }, COPIED_DISPLAY_DURATION);
    };

    const primaryText = item.title && (
        <p
            className="Item__PrimaryText"
            id={`item-${index}-title`}
            title={item.title}
            data-testid="item-component-primary-text"
        >
            {item.title.substring(0, CHAR_DISPLAY_COUNT)}
        </p>
    );

    const secondaryText = item.content && (
        <p
            className="Item__SecondaryText"
            id={`item-${index}-content`}
            title={item.content}
            data-testid="item-component-secondary-text"
        >
            {item.content.substring(0, CHAR_DISPLAY_COUNT)}
        </p>
    );

    const copiedText = <p className="Item__CopiedText">Content copied</p>;

    return (
        <div className="Item__TextWrapper">
            {!hasCopied && (
                <>
                    {primaryText}
                    {secondaryText}
                </>
            )}
            {hasCopied && copiedText}
        </div>
    );
}
