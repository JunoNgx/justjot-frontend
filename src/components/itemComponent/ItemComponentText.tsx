import { Item } from "@/types";
import { Group, Text, Transition } from "@mantine/core";

const CHAR_DISPLAY_COUNT = 150;

export default function ItemComponentText({ item }: { item: Item }) {

    const transitionProp = {
        in: { opacity: 1, transform: 'scale(1)' },
        out: { opacity: 0, transform: 'scale(0.9)' },
        common: { transformOrigin: 'center' },
        transitionProperty: 'opacity, transform',
    };

    return (<Group className="item__text-wrapper"
        wrap="nowrap"
        gap="xs"
    >
        <Transition
            mounted={!item.hasCopied}
            duration={300}
            exitDuration={100}
            transition={transitionProp}
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
            exitDuration={100}
            transition={transitionProp}
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
