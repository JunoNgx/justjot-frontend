import { Box, Group, Kbd, Menu, MenuDivider, MenuItem, Text, UnstyledButton, em } from "@mantine/core";
import { ItemCollection } from "../types";
import { IconEdit, IconPlus, IconSelector, IconSortAscendingShapes, IconTrash } from "@tabler/icons-react";
import { justJotTheme } from "../theme";
import useCollectionMenuActions from "../hooks/useCollectionMenuActions";
import { modals } from "@mantine/modals";
import CollectionCreateUpdateModal from "./modals/CollectionCreateUpdateModal";
import useDeleteCollectionConfirmation from "../hooks/useDeleteCollectionConfirmation";
import { useMediaQuery } from "@mantine/hooks";
import { CollectionsContext } from "../contexts/CollectionsContext";
import { CurrentCollectionContext } from "../contexts/CurrentCollectionContext";
import { useContext, useEffect } from "react";

// type CollectionProp = {
//     currCollection: ItemCollection | undefined,
//     collections: ItemCollection[] | undefined,
// }

export default function CollectionMenu() {
    const { collections, fetchCollections } = useContext(CollectionsContext);
    const { currCollection, setCurrCollection  } = useContext(CurrentCollectionContext);

    useEffect(() => {
        console.log("fetch collections")
        fetchCollections();
    }, []);

    useEffect(() => {
        console.log("use effect collections", collections)
        if (!collections) return;
        // TODO set from param
        console.log("setting")
        setCurrCollection(collections[0]);
    }, [collections]);

    const { switchToCollectionById } = useCollectionMenuActions();
    const confirmDeletion = useDeleteCollectionConfirmation();
    const isMobile = useMediaQuery(`(max-width: ${em(720)})`);

    return <Menu
        position="bottom-start"
        offset={isMobile ? 10 : 20}
    >
        <Menu.Target>
            <UnstyledButton className={"collection-menu-btn"}>
                <Group>
                    <Text>{currCollection?.name}</Text>
                    <IconSelector
                        size={justJotTheme.other.iconSizeMenu}
                        stroke={justJotTheme.other.iconStrokeWidth}
                    />
                </Group>
            </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className="dropdown-menu">
            {collections?.map((collection: ItemCollection, index: number) =>
                <MenuItem
                    key={collection.id}
                    rightSection={computeNumericHotkey(index)}
                    onClick={() => switchToCollectionById(collection.id)}
                >
                    {collection.name}
                </MenuItem>
            )}
            <MenuDivider/>
            <MenuItem
                leftSection={<IconPlus
                    size={justJotTheme.other.iconSizeMenu}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />}
                onClick={() => modals.open({
                    title: "Create new Collection",
                    children: (<CollectionCreateUpdateModal isEditMode={false}/>)
                })}
            >
                Create new collection
            </MenuItem>
            <MenuItem leftSection={<IconEdit
                    size={justJotTheme.other.iconSizeMenu}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />}
                onClick={() => modals.open({
                    title: "Create new Collection",
                    children: (<CollectionCreateUpdateModal isEditMode={true}/>)
                })}
            >
                Edit this collection
            </MenuItem>
            <MenuItem
                leftSection={<IconSortAscendingShapes
                    size={justJotTheme.other.iconSizeMenu}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />}
            >
                Sort all collections
            </MenuItem>

            <MenuDivider/>

            <MenuItem
                color="red"
                leftSection={<IconTrash
                    size={justJotTheme.other.iconSizeMenu}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />}
                onClick={confirmDeletion}
            >
                Delete this collection
            </MenuItem>
        </Menu.Dropdown>        
    </Menu>
}

const computeNumericHotkey = (index: number) => {
    switch (true) {
    case index === 9:
        return <Kbd>0</Kbd>
    case index < 9:
        return <Kbd>{index + 1}</Kbd>
    default:
        return <Box className="collection-menu-btn__number-placeholder"/>
    }
}