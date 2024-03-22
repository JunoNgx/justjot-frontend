import { useContext, useEffect } from "react";
import { Group, Menu, MenuDivider, MenuItem, Text, UnstyledButton, em } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ItemCollection } from "src/types";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconPlus, IconSelector, IconSortAscendingShapes, IconTrash } from "@tabler/icons-react";

import { justJotTheme } from "src/theme";
import useCollectionMenuActions from "src/hooks/useCollectionMenuActions";
import CollectionCreateUpdateModal from "./modals/CollectionCreateUpdateModal";
import useDeleteCollectionConfirmation from "src/hooks/useDeleteCollectionConfirmation";
import { CollectionsContext } from "src/contexts/CollectionsContext";
import { CurrentCollectionContext } from "src/contexts/CurrentCollectionContext";
import CollectionHotkey from "src/components/misc/CollectionHotkey";
import CollectionsSortModal from "src/components/modals/CollectionsSortModal";

export default function CollectionMenu() {
    const { collections, fetchCollections } = useContext(CollectionsContext);
    const { currCollection, setCurrCollection  } = useContext(CurrentCollectionContext);

    useEffect(() => {
        fetchCollections();
    }, []);

    useEffect(() => {
        if (!collections) return;
        // TODO set from param
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
                    rightSection={<CollectionHotkey index={index}/>}
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
                    centered: true,
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
                    centered: true,
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
                onClick={() => modals.open({
                    size: "xl",
                    centered: true,
                    title: "Sort Collections",
                    children: <CollectionsSortModal/>
                })}
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
