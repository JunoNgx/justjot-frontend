import { useContext } from "react";
import { Group, Menu, MenuDivider, MenuItem, Text, UnstyledButton, em } from "@mantine/core";
import { ItemCollection } from "@/types";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconFolderPlus, IconSelector, IconSortAscendingShapes, IconTrash } from "@tabler/icons-react";

import useCollectionNavActions from "@/hooks/useCollectionNavActions";
import useDeleteCollectionConfirmation from "@/hooks/useDeleteCollectionConfirmation";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import CollectionHotkey from "@/components/misc/CollectionHotkey";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import useIconProps from "@/hooks/useIconProps";
import useCollectionActions from "@/hooks/useCollectionActions";

export default function CollectionMenu({isInMainView}: {isInMainView?: boolean}) {
    const { isLoggedIn } = useContext(BackendClientContext);
    const { collections, currCollection } = useContext(CollectionsContext);

    const { trySwitchToCollectionById } = useCollectionNavActions();
    const confirmDeletion = useDeleteCollectionConfirmation();
    const {
        openCreateCollectionModal,
        openUpdateCollectionModal,
        openSortCollectionModal,
    } = useCollectionActions();
    const isMobile = useMediaQuery(`(max-width: ${em(720)})`);
    const { menuIconProps } = useIconProps();

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
                leftSection={<IconFolderPlus {...menuIconProps} />}
                onClick={openCreateCollectionModal}
            >
                Create collection
            </MenuItem>
            <MenuItem leftSection={<IconEdit {...menuIconProps} />}
                onClick={openUpdateCollectionModal}
            >
                Edit collection
            </MenuItem>
            <MenuItem
                leftSection={<IconSortAscendingShapes {...menuIconProps} />}
                onClick={openSortCollectionModal}
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
