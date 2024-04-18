import { Item } from "@/types";
import { Text, Transition } from "@mantine/core";

const CHAR_DISPLAY_COUNT = 120;

export default function ItemComponentText({ item }: { item: Item }) {

    return (<>
        <Transition
            mounted={!item.hasCopied}
            duration={200}
            exitDuration={1}
            transition="fade"
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
            exitDuration={1}
            transition="fade"
        >
            {(transitionStyle) => (
                <Text className="item__copied-text"
                    style={transitionStyle}
                >
                    Content copied
                </Text>
            )}
        </Transition>
    </>);
};
