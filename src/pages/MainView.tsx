import { useContext, useEffect } from "react";
import { Stack } from '@mantine/core';
import { BackendClientContext } from '../contexts/BackendClientContext';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import ItemComponent from '../components/ItemComponent';
import MainInput from "../components/MainInput";
import { ItemsContext } from "../contexts/ItemsContext";
import { CurrentCollectionContext } from "../contexts/CurrentCollectionContext";

export default function MainView() {
    const { isLoggedIn } = useContext(BackendClientContext);
    const { items, fetchItems } = useContext(ItemsContext);
    const { currCollection } = useContext(CurrentCollectionContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/login`, { replace: true });
            return;
        }
    }, []);

    useEffect(() => {
        if (!currCollection) return;
        fetchItems(currCollection);
    }, [currCollection]);

    // TODO: move these to App for better coverage
    const handleClickEvent = () => {
        console.log("click")
    }
    const handleFocusEvent = (e: React.FocusEvent<HTMLDivElement, Element>) => {
        console.log("focus", e)
    };

    return <Stack className="main-view"
        gap="xl"
        p="sm"
        onClick={() => {handleClickEvent()}}
        onFocus={(e) => handleFocusEvent(e)}
    >
        <Notifications className="notifications-container"
            limit={5}
            position="bottom-center"
            autoClose={1000}
        />

        <MainInput/>
        <Stack className="main-view__items-container"
            gap="xs"
        >
            {items?.map((item, index) =>
                <ItemComponent key={item.id} item={item} index={index}/>
            )}
        </Stack>
    </Stack>
}
