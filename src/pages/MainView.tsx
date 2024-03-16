import { useContext, useEffect, useState } from "react";
import { DbTable, Item, ItemCollection } from '../types';
import { Button, Group, Input, Loader, Stack } from '@mantine/core';
import ItemComponent from '../components/ItemComponent';
import { BackendClientContext } from '../contexts/BackendClientContext';
import { useNavigate } from 'react-router-dom';
import { IconCircleTriangle } from '@tabler/icons-react';
import CollectionMenu from "../components/CollectionMenu";
import { justJotTheme } from "../theme";
import { notifications, Notifications } from '@mantine/notifications';

export default function MainView() {

    const {
        pbClient,
        isLoggedIn,
        user,

        currCollection,
        collections,
        items,

        fetchItems,
    } = useContext(BackendClientContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
            return;
        }
    });

    const [inputVal, setInputVal] = useState("");
    const [isInputLoading, setIsInputLoading] = useState(false);
    
    
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") createNewItemFromInput()
    }

    // TODO: move these to App for better coverage
    const handleClickEvent = () => {
        console.log("click")
    }
    const handleFocusEvent = (e) => {
        console.log("focus", e)
    };

    /**
     * Logic methods
     */

    const createNewItemFromInput = async () => {
        setIsInputLoading(true);
        pbClient.collection(DbTable.ITEMS)
            .create({
                owner: user?.id,
                collection: currCollection?.id,
                content: inputVal
            })
            .then((_record: Item) => {
                fetchItems();
                setInputVal("");
            })
            .catch(error => {
                console.error(error);
            });
        setIsInputLoading(false);
    }

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
            <CollectionMenu
                currCollection={currCollection}
                collections={collections}
            />
        </Group>
        <Input id="main-input" className="main-view__input"
            size="lg"
            leftSection={<IconCircleTriangle
                size={32}
                stroke={justJotTheme.other.iconStrokeWidth}
            />}
            rightSectionPointerEvents="all"
            rightSection={
                isInputLoading && <Loader size="xs"/>
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
