import PocketBase from 'pocketbase';

import { useContext, useEffect, useState } from "react";

import { Item } from '../types';

import { Stack } from '@mantine/core';

import Searchbar from '../components/Searchbar';
import ItemComponent from '../components/ItemComponent';
import { BackendClientContext } from '../contexts/BackendClientContext';
import { useNavigate } from 'react-router-dom';

export default function GroupView() {
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

    return <div className="main-content">
        <Searchbar/>
        <div className="main-content__top">
            <div>Last updated</div>
        </div>
        <Stack
            // h={300}
            // bg="var(--mantine-color-body)"
            gap="xs"
        >
            {list?.map(item =>
                <ItemComponent key={item.id} item={item} />
            )}
        </Stack>
    </div>
}
