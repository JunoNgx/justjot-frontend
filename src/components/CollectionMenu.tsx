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

import "./CollectionMenu.scss";

export default function CollectionMenu({isMobile}: {isMobile?: boolean}) {
    const { isLoggedIn } = useContext(BackendClientContext);
    const { collections, currCollection, isTrashCollection } = useContext(CollectionsContext);

    const { trySwitchToCollectionById } = useCollectionNavActions();
    const confirmCollectionDeletion = useCollectionDeletion();
    const {
        openCreateCollectionModal,
        openUpdateCollectionModal,
        openSortCollectionModal,
    } = useCollectionActions();
    const isWidthMobile = useMediaQuery(`(max-width: ${em(720)})`);
    const { menuIconProps } = useIconProps();

    const collectionMenu = <Menu
        position={isWidthMobile ? "top-end" : "bottom-start"}
        offset={isMobile ? 5 : 15}
    >
        <Menu.Target>
            <UnstyledButton className={"CollectionMenuBtn "
                + (isMobile && "CollectionMenuBtn--isMobile")}
            >
                <Group gap="xs">
                    <Text className="CollectionMenuBtn__Label">
                        {currCollection?.name}
                    </Text>
                    <IconSelector className="CollectionMenuBtn__Icon"
                        {...menuIconProps}
                    />
                </Group>
            </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className="CollectionMenuDropdown">
            {collections?.map((collection: ItemCollection, index: number) =>
                <CollectionMenuCollectionItem
                    key={collection.id}
                    index={index}
                    collection={collection}
                    isSelected={currCollection?.id === collection.id}
                    onClickHandler={trySwitchToCollectionById}
                />
            )}

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

type CollectionMenuCollectionItemProps = {
    collection: ItemCollection,
    index: number,
    isSelected: boolean,
    onClickHandler: (collectionId: string) => void;
};

const CollectionMenuCollectionItem = (
    { collection, index, isSelected, onClickHandler }: CollectionMenuCollectionItemProps
) => {
    const { menuIconProps } = useIconProps();
    const isTrashBin = collection.isTrashBin

    const baseClassName = "CollectionMenuDropdown__Item "
    const selectedModifierClassName = isSelected
            ? "CollectionMenuDropdown__CurrentItem"
            : "";
    const leftSection = isTrashBin
        ? <IconTrash {...menuIconProps} />
        : "";
    const rightSection = isSelected
        ? <IconCheck {...menuIconProps} />
        : <CollectionHotkey index={index}/>;
    const color = isTrashBin
        ? "violet"
        : "";

    const itemElement = <MenuItem
        className={baseClassName + selectedModifierClassName}
        color={color}
        leftSection={leftSection}
        rightSection={rightSection}
        aria-current={isSelected}
        onClick={() => onClickHandler(collection.id)}
    >
        {collection.name}
    </MenuItem>

    if (!isTrashBin) return itemElement;

    return <>
        <MenuDivider />
        {itemElement}
    </>
}
