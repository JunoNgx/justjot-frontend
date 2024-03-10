import { useContext, useEffect, useState } from "react";
import { DbTable, Item, ItemCollection } from '../types';
import { Group, Input, Stack, Text } from '@mantine/core';
import ItemComponent from '../components/ItemComponent';
import { BackendClientContext } from '../contexts/BackendClientContext';
import { useNavigate } from 'react-router-dom';
import { IconCircleTriangle } from '@tabler/icons-react';

export default function MainView() {

    const { pbClient, isLoggedIn, user } = useContext(BackendClientContext);
    const [currCollection, setCurrCollection] = useState<ItemCollection>();
    const [collections, setCollections] = useState<ItemCollection[]>();
    const [items, setItems] = useState<Item[]>();
    const [inputVal, setInputVal] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("on mount use effect")
        console.trace();
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
            return;
        }

        const fetchCollections = async () => {
            console.log("fetch collections")
            await pbClient
                // .cancelAllRequests()
                .collection(DbTable.COLLECTIONS)
                .getFullList()
                .then((records: ItemCollection[]) => {
                    setCollections(records);
                    // TODO: search collection by slug from params
                })
                .catch(error => {
                    console.log("fetch collection error")
                    console.error(error)
                });
        };

        fetchCollections();
    }, []);

    // useEffect(() =>{
    //     console.log("useEffect collections", collections);
    //     if (!collections) return;
    //     setCurrCollection(collections![0]);
    // }, [collections]);

    // useEffect(() => {
    //     const fetchItems = async () => {
    //         console.log("fetch items")
    //         await pbClient
    //             .cancelAllRequests()
    //             .collection(DbTable.ITEMS)
    //             .getFullList({
    //                 // TODO: fix this
    //                 // filter: "collection = @currCollection.id",
    //                 sort: "-created"
    //             })
    //             .then((records: Item[]) => {
    //                 setItems(records);
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             })
    //     };

    //     fetchItems();
    // }, [currCollection]);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
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
                })
        }
        // TODO create new record
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
        current collection: {currCollection?.name}
        <Group className="main-view__collections-wrapper">
            <Text>fjdslkfjkldsflsd</Text>
            {collections?.map(collection => <Text key={collection.id}>{collection.name}</Text>)

            }
        </Group> 
        <Input id="main-input" className="main-view__input"
            size="lg"
            leftSection={<IconCircleTriangle size={32} stroke={1}/>}
            type="text"
            value={inputVal}
            onChange={(event) => setInputVal(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
        />
        {/* <Box className="main-view__list-top">
            <div>Last updated</div>
        </Box> */}
        <Stack className="main-view__items-container"
            gap="xs"
        >
            {items?.map(item =>
                <ItemComponent key={item.id} item={item} />
            )}
        </Stack>
    </Stack>
}
