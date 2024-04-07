import { useContext } from "react";
import { Group, Menu, MenuDivider, MenuItem, Text, UnstyledButton, em } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ItemCollection } from "@/types";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconPlus, IconSelector, IconSortAscendingShapes, IconTrash } from "@tabler/icons-react";

import useCollectionNavActions from "@/hooks/useCollectionNavActions";
import CollectionCreateUpdateModal from "@/components/modals/CollectionCreateUpdateModal";
import useDeleteCollectionConfirmation from "@/hooks/useDeleteCollectionConfirmation";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import { CurrentCollectionContext } from "@/contexts/CurrentCollectionContext";
import CollectionHotkey from "@/components/misc/CollectionHotkey";
import CollectionsSortModal from "@/components/modals/CollectionsSortModal";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import useIconPropsFromTheme from "@/hooks/useIconPropsFromTheme";

export default function CollectionMenu({isInMainView}: {isInMainView?: boolean}) {
    const { isLoggedIn } = useContext(BackendClientContext);
    const { collections } = useContext(CollectionsContext);
    const { currCollection } = useContext(CurrentCollectionContext);

    const { trySwitchToCollectionById } = useCollectionNavActions();
    const confirmDeletion = useDeleteCollectionConfirmation();
    const isMobile = useMediaQuery(`(max-width: ${em(720)})`);
    const { menuIconProps } = useIconPropsFromTheme();

    const collectionMenu = <Menu
        position="bottom-start"
        offset={isMobile ? 5 : 15}
    >
        <Menu.Target>
            <UnstyledButton className={"collection-menu-btn "
                + (isInMainView && "collection-menu-btn--is-in-main-view")}
            >
                <Group gap="xs">
                    <Text className="collection-menu-btn__label">
                        {currCollection?.name}
                    </Text>
                    <IconSelector className="collection-menu-btn__icon"
                        {...menuIconProps}
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
                leftSection={<IconPlus {...menuIconProps} />}
                onClick={() => modals.open({
                    centered: true,
                    title: "Create New Collection",
                    children: (<CollectionCreateUpdateModal isEditMode={false}/>)
                })}
            >
                Create collection
            </MenuItem>
            <MenuItem leftSection={<IconEdit {...menuIconProps} />}
                onClick={() => modals.open({
                    centered: true,
                    title: "Edit Collection",
                    children: (<CollectionCreateUpdateModal isEditMode={true}/>)
                })}
            >
                Edit collection
            </MenuItem>
            <MenuItem
                leftSection={<IconSortAscendingShapes {...menuIconProps} />}
                onClick={() => modals.open({
                    size: "35rem",
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
                leftSection={<IconTrash {...menuIconProps} />}
                onClick={confirmDeletion}
            >
                Delete collection
            </MenuItem>
        </Menu.Dropdown>
    </Menu>

    return (isLoggedIn && currCollection) && collectionMenu;
}
