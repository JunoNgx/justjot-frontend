import { useContext, useState } from "react";
import { Input, Loader } from "@mantine/core";
import { IconCircleTriangle } from "@tabler/icons-react";
import { justJotTheme } from "../theme";
import { BackendClientContext } from "../contexts/BackendClientContext";
import useCreateItem from "../hooks/useCreateItem";

export default function MainInput() {
    const { fetchItems } = useContext(BackendClientContext);
    const [inputVal, setInputVal] = useState("");

    const [createItem, isCreateItemLoading] = useCreateItem({
        successfulCallback: () => {
            setInputVal("");
            fetchItems();
        }
    });

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            createItem({ content: inputVal });
        }
    }

    return <Input id="main-input" className="main-view__input"
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
}