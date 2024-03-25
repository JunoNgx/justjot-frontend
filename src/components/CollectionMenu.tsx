import { useContext } from "react";
import { Group, Menu, MenuDivider, MenuItem, Text, UnstyledButton, em } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ItemCollection } from "@/types";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconPlus, IconSelector, IconSortAscendingShapes, IconTrash } from "@tabler/icons-react";

import { justJotTheme } from "@/theme";
import useCollectionNavActions from "@/hooks/useCollectionNavActions";
import CollectionCreateUpdateModal from "@/components/modals/CollectionCreateUpdateModal";
import useDeleteCollectionConfirmation from "@/hooks/useDeleteCollectionConfirmation";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import CollectionHotkey from "@/components/misc/CollectionHotkey";
import CollectionsSortModal from "@/components/modals/CollectionsSortModal";

export default function CollectionMenu({isInMainView}: {isInMainView?: boolean}) {
    const { collections } = useContext(CollectionsContext);
    const { currCollection } = useContext(CurrentCollectionContext);

    const { trySwitchToCollectionById } = useCollectionNavActions();
    const confirmDeletion = useDeleteCollectionConfirmation();
    const isMobile = useMediaQuery(`(max-width: ${em(720)})`);

    return <Menu
        position="bottom-start"
        offset={isMobile ? 5 : 15}
    >
        <Menu.Target>
            <UnstyledButton className={"collection-menu-btn "
                + (isInMainView && "collection-menu-btn--is-in-main-view")}
            >
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
                    onClick={() => trySwitchToCollectionById(collection.id)}
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
                Create collection
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
                Edit collection
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
                Sort collections
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
                Delete collection
            </MenuItem>
        </Menu.Dropdown>        
    </Menu>
}
