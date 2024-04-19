import { Item } from "@/types";
import { Group, Text, Transition } from "@mantine/core";

const CHAR_DISPLAY_COUNT = 150;

export default function ItemComponentText({ item }: { item: Item }) {

    const transitionPropNormalText = {
        in: { opacity: 1, transform: 'translateX(0)' },
        out: { opacity: 0, transform: 'translateX(+50%)' },
        common: { transformOrigin: 'center' },
        transitionProperty: 'opacity, transform',
    };

    const transitionPropCopiedText = {
        in: { opacity: 1, transform: 'translateY(0)' },
        out: { opacity: 0, transform: 'translateY(-50%)' },
        common: { transformOrigin: 'center' },
        transitionProperty: 'opacity, transform',
    };

    return (<Group className="item__text-wrapper"
        wrap="nowrap"
        gap="xs"
    >
        <Transition
            mounted={!item.hasCopied}
            duration={400}
            exitDuration={50}
            transition={transitionPropNormalText}
        >
            {(transitionStyle) => (<>
                {item.title && <Text className="item__primary-text"
                    title={item.title}
                    style={transitionStyle}
                >
                    {item.title.substring(0, CHAR_DISPLAY_COUNT)}
                </Text>}
                {item.content && <Text className="item__secondary-text"
                    title={item.content}
                    style={transitionStyle}
                >
                    {item.content.substring(0, CHAR_DISPLAY_COUNT)}
                </Text>}
            </>)}
        </Transition>

        <Transition
            mounted={item.hasCopied}
            duration={300}
            exitDuration={150}
            transition={transitionPropCopiedText}
        >
            {(transitionStyle) => (
                <Text className="item__copied-text"
                    style={transitionStyle}
                >
                    Content copied
                </Text>
            )}
        </Transition>
    </Group>);
};
