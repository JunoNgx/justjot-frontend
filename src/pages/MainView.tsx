import PocketBase from 'pocketbase';

import { useContext, useEffect, useState } from "react";

import { Item } from '../types';

import { Input, Stack } from '@mantine/core';

import ItemComponent from '../components/ItemComponent';
import { BackendClientContext } from '../contexts/BackendClientContext';
import { useNavigate } from 'react-router-dom';
import { IconCircleTriangle } from '@tabler/icons-react';

export default function MainView() {
    const { isLoggedIn } = useContext(BackendClientContext);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
        }

        const fetch = async () => {
            const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);
            const records: Item[] = await pbClient.collection("items").getFullList();
            setList(records)
        };

        fetch();
    }, []);

    const navigate = useNavigate();
    const [list, setList] = useState<Item[]>();

    return <Stack className="main-view"
        gap="xl"
    >
        <Input id="main-input" className="main-view__input"
            size="lg"
            leftSection={<IconCircleTriangle size={32} stroke={1}/>}
        />
        {/* <Box className="main-view__list-top">
            <div>Last updated</div>
        </Box> */}
        <Stack className="main-view__item-container"
            gap="xs"
        >
            {list?.map(item =>
                <ItemComponent key={item.id} item={item} />
            )}
        </Stack>
    </Stack>
}
