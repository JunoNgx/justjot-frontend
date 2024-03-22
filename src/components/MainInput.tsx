import { forwardRef, useContext, useState } from "react";
import { Input, InputProps, Loader } from "@mantine/core";
import { IconCircleTriangle } from "@tabler/icons-react";
import { justJotTheme } from "../theme";
import useCreateItem from "../hooks/useCreateItem";
import { ItemsContext } from "../contexts/ItemsContext";
import { CurrentCollectionContext } from "../contexts/CurrentCollectionContext";

interface MainInputParams extends InputProps {
    selectNextItem: () => void,
    selectPrevItem: () => void,
}

const MainInput = forwardRef<HTMLInputElement, MainInputParams>((props, ref) => {
    const { currCollection } = useContext(CurrentCollectionContext)
    const { fetchItems } = useContext(ItemsContext);
    const [inputVal, setInputVal] = useState("");

    const [createItem, isCreateItemLoading] = useCreateItem({
        successfulCallback: () => {
            setInputVal("");
            fetchItems(currCollection);
        }
    });

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "ArrowDown") {
            props.selectNextItem();
        }

        if (e.code === "ArrowUp") {
            props.selectPrevItem();
        }

        if (e.code === "Enter") {
            if (!inputVal) return;
            createItem({ content: inputVal });
        }
    }

    return <Input id="main-input" className="main-view__input"
        ref={ref}
        // {...props}
        size="lg"
        leftSection={<IconCircleTriangle
            size={32}
            stroke={justJotTheme.other.iconStrokeWidth}
        />}
        rightSectionPointerEvents="all"
        rightSection={
            isCreateItemLoading && <Loader size="xs"/>
        }
        type="text"
        value={inputVal}
        onChange={(event) => setInputVal(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
    />
});

export default MainInput;