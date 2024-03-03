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

    return <main className="main-content">
        <div className="main-content__top">
            <div>Last updated</div>
        </div>
        <div className="main-content__main">
            {list?.map(item =>
                <ItemComponent key={item.id} item={item} />
            )}
        </div>
    </main>
}
