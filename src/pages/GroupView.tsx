import PocketBase from 'pocketbase';

import { useEffect, useState } from "react";

import { Item } from '../types';

import ItemComponent from '../components/ItemComponent';

export default function GroupView() {
    const [list, setList] = useState<Item[]>();

    useEffect(() => {
        const fetch = async () => {
            const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);
            const records: Item[] = await pbClient.collection("items").getFullList();
            setList(records)
        };

        fetch();
        console.log(list)
    }, []);

    return <div>
        {list?.map(item =>
            <ItemComponent key={item.id} item={item} />
        )}
    </div>
}
