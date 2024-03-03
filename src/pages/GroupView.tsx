import PocketBase from 'pocketbase';
import { RecordModel } from 'pocketbase';

import { useEffect, useState } from "react";

export default function GroupView() {
    const [list, setList] = useState<RecordModel[]>();

    useEffect(() => {
        const fetch = async () => {
            const pbClient = new PocketBase(import.meta.env.VITE_BACKEND_URL);
            const records = await pbClient.collection("items").getFullList();
            setList(records)
        };

        fetch();
        console.log(list)
    }, []);
    
    return <h1>Main item list view</h1>
}
