import { useContext, useEffect, useState } from "react";
import { DbTable, Item, ItemCollection } from '../types';
import { Group, Input, Loader, Stack } from '@mantine/core';
import ItemComponent from '../components/ItemComponent';
import { BackendClientContext } from '../contexts/BackendClientContext';
import { useNavigate } from 'react-router-dom';
import { IconCircleTriangle } from '@tabler/icons-react';
import CollectionMenu from "../components/CollectionMenu";
import { justJotTheme } from "../theme";

export default function MainView() {

    const { pbClient, isLoggedIn, user } = useContext(BackendClientContext);
    const [currCollection, setCurrCollection] = useState<ItemCollection>();
    const [collections, setCollections] = useState<ItemCollection[]>();
    const [items, setItems] = useState<Item[]>();
    const [inputVal, setInputVal] = useState("");
    const [isInputLoading, setIsInputLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
            return;
        }

        const fetchCollections = async () => {
            await pbClient
                // .cancelAllRequests()
                .collection(DbTable.COLLECTIONS)
                .getFullList()
                .then((records: ItemCollection[]) => {
                    setCollections(records);
                })
                .catch(error => {
                    console.error(error)
                });
        };

        fetchCollections();
    }, []);

    useEffect(() =>{
        if (!collections) return;
        // TODO calculate based on param slug
        setCurrCollection(collections![0]);
    }, [collections]);

    useEffect(() => {
        if (!currCollection) return;
        fetchItems();
    }, [currCollection]);

    const fetchItems = async () => {
        await pbClient
            // .cancelAllRequests()
            .collection(DbTable.ITEMS)
            .getFullList({
                // TODO: filter syntax
                // filter: "collection = @currCollection.id",
                sort: "-created"
            })
            .then((records: Item[]) => {
                setItems(records);
            })
            .catch(error => {
                console.error(error);
            })
    };
    
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
        {/* current collection: {currCollection?.name}
        <Group className="main-view__collections-wrapper">
            <Text>list of collections:</Text>
            {collections?.map(collection => <Text key={collection.id}>{collection.name}</Text>)

            }
        </Group>  */}
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
