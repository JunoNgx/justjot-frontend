import { Item } from "@/types";
import { Transition } from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";
import { EventBusContext } from "@/contexts/EventBusContext";

const CHAR_DISPLAY_COUNT = 150;
const COPIED_DISPLAY_DURATION = 1500;

export default function ItemComponentText({ item }: { item: Item }) {

    const { emitter } = useContext(EventBusContext);

    const [ hasCopied, setHasCopied ] = useState(false);
    const timeoutCopyRef = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);

    useEffect(() => {
        emitter.on("copyItemContent", handleCopyItemContentEvent);

        return () => {
            clearTimeout(timeoutCopyRef.current);
        };
    }, []);

    const handleCopyItemContentEvent = ( itemId: string ) => {
        if (item.id !== itemId) return;

        setHasCopied(true);

        clearTimeout(timeoutCopyRef.current);
        timeoutCopyRef.current = setTimeout(() => {
            setHasCopied(false);
        }, COPIED_DISPLAY_DURATION);
    };

    const transitionPropNormalText = {
        in: { opacity: 1, transform: 'translateY(0)' },
        out: { opacity: 0, transform: 'translateY(+50%)' },
        common: { transformOrigin: 'center' },
        transitionProperty: 'opacity, transform',
    };

    const transitionPropCopiedText = {
        in: { opacity: 1, transform: 'translateY(0)' },
        out: { opacity: 0, transform: 'translateY(-50%)' },
        common: { transformOrigin: 'center' },
        transitionProperty: 'opacity, transform',
    };

    return (<div className="Item__TextWrapper">
        <Transition
            mounted={!hasCopied}
            duration={400}
            exitDuration={50}
            transition={transitionPropNormalText}
        >
            {(transitionStyle) => (<>
                {item.title && <p className="Item__PrimaryText"
                    title={item.title}
                    style={transitionStyle}
                    data-testid="item-component-primary-text"
                >
                    {item.title.substring(0, CHAR_DISPLAY_COUNT)}
                </p>}
                {item.content && <p className="Item__SecondaryText"
                    title={item.content}
                    style={transitionStyle}
                    data-testid="item-component-secondary-text"
                >
                    {item.content.substring(0, CHAR_DISPLAY_COUNT)}
                </p>}
            </>)}
        </Transition>

        <Transition
            mounted={hasCopied}
            duration={300}
            exitDuration={150}
            transition={transitionPropCopiedText}
        >
            {(transitionStyle) => (
                <p className="Item__CopiedText"
                    style={transitionStyle}
                >
                    Content copied
                </p>
            )}
        </Transition>
    </div>);
}
