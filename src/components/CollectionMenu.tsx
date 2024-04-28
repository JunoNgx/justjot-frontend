import { useContext } from "react";
import { Group, Menu, MenuDivider, MenuItem, Text, UnstyledButton, em } from "@mantine/core";
import { ItemCollection } from "@/types";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck, IconEdit, IconSelector, IconSortAscendingShapes, IconStackPush, IconTrash, IconTrashX } from "@tabler/icons-react";

import useCollectionNavActions from "@/hooks/useCollectionNavActions";
import useCollectionDeletion from "@/hooks/useCollectionDeletion";
import { CollectionsContext } from "@/contexts/CollectionsContext";
import CollectionHotkey from "@/components/misc/CollectionHotkey";
import { BackendClientContext } from "@/contexts/BackendClientContext";
import useIconProps from "@/hooks/useIconProps";
import useCollectionActions from "@/hooks/useCollectionActions";

export default function CollectionMenu({isInMainView}: {isInMainView?: boolean}) {
    const { isLoggedIn } = useContext(BackendClientContext);
    const { collections, currCollection, isTrashCollection } = useContext(CollectionsContext);

    const { trySwitchToCollectionById } = useCollectionNavActions();
    const confirmCollectionDeletion = useCollectionDeletion();
    const {
        openCreateCollectionModal,
        openUpdateCollectionModal,
        openSortCollectionModal,
    } = useCollectionActions();
    const isMobile = useMediaQuery(`(max-width: ${em(720)})`);
    const { menuIconProps } = useIconProps();

    // The last one is always a trash bin
    const trashBin = collections[collections.length - 1];

    const collectionMenu = <Menu
        position={isInMainView ? "top-end" : "bottom-start"}
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

        <Menu.Dropdown className="collection-menu-dropdown">
            {/* Everything except for the trash bin */}
            {collections?.filter(collection => !collection.isTrashBin)
                .map((collection: ItemCollection, index: number) => {

                    const isSelected = currCollection?.id === collection.id;
                    const baseClassName = "collection-menu-dropdown__item "
                    const modifierClassName = isSelected
                            ? "collection-menu-dropdown__item--current"
                            : "";
                    const rightSection = isSelected
                        ? <IconCheck {...menuIconProps} />
                        : <CollectionHotkey index={index}/>

                    return <MenuItem
                        className={baseClassName + modifierClassName}
                        key={collection.id}
                        rightSection={rightSection}
                        aria-current={isSelected}
                        onClick={() => trySwitchToCollectionById(collection.id)}
                    >
                        {collection.name}
                    </MenuItem>
                }
            )}

            <MenuDivider/>
            {/* The trash bin */}
            <MenuItem
                color="violet"
                leftSection={<IconTrash {...menuIconProps} />}
                onClick={() => trySwitchToCollectionById(trashBin.id)}
            >
                {trashBin?.name}
            </MenuItem>
            
            <MenuDivider/>
            <MenuItem
                leftSection={<IconStackPush {...menuIconProps} />}
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

            {!isTrashCollection && <>
                <MenuDivider/>
                <MenuItem
                    color="red"
                    leftSection={<IconTrashX {...menuIconProps} />}
                    onClick={confirmCollectionDeletion}
                >
                    Delete collection
                </MenuItem>
            </>}
        </Menu.Dropdown>
    </Menu>

    return (isLoggedIn && currCollection) && collectionMenu;
}
