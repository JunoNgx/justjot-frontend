import { useContext, useEffect, useState } from "react";
import { Group, Input, Loader, Stack } from '@mantine/core';
import ItemComponent from '../components/ItemComponent';
import { BackendClientContext } from '../contexts/BackendClientContext';
import { useNavigate } from 'react-router-dom';
import { IconCircleTriangle } from '@tabler/icons-react';
import { justJotTheme } from "../theme";
import { Notifications } from '@mantine/notifications';
import useCreateItem from "../hooks/useCreateItem";

export default function MainView() {

    const {
        isLoggedIn,
        items,
        fetchItems,
    } = useContext(BackendClientContext);

    const navigate = useNavigate();
    const [createItem, isCreateItemLoading] = useCreateItem({
        successfulCallback: () => {
            setInputVal("");
            fetchItems();
        }
    });

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
            return;
        }
    });

    const [inputVal, setInputVal] = useState("");
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            createItem({ content: inputVal });
        }
    }

    // TODO: move these to App for better coverage
    const handleClickEvent = () => {
        console.log("click")
    }
    const handleFocusEvent = (e) => {
        console.log("focus", e)
    };

    return <Stack className="main-view"
        gap="xl"
        p="sm"
        onClick={() => {handleClickEvent()}}
        onFocus={handleFocusEvent}
    >
        <Notifications className="notifications-container"
            limit={5}
            position="bottom-center"
            autoClose={1000}
        />
        <Group className="main-view__menu-flex-container">
        </Group>
        <Input id="main-input" className="main-view__input"
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
        <Stack className="main-view__items-container"
            gap="xs"
        >
            {items?.map(item =>
                <ItemComponent key={item.id} item={item} />
            )}
        </Stack>
    </Stack>
}
