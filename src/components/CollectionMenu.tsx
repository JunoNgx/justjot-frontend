import { Box, Group, Kbd, Menu, MenuDivider, MenuItem, Text, UnstyledButton } from "@mantine/core";
import { ItemCollection } from "../types";
import { IconEdit, IconPlus, IconSelector, IconSortAscendingShapes, IconTrash } from "@tabler/icons-react";
import { justJotTheme } from "../theme";
import useCollectionMenuActions from "../hooks/useCollectionMenuActions";
import { modals } from "@mantine/modals";
import CollectionCreateUpdateModal from "./modals/CollectionCreateUpdateModal";
import useDeleteCollectionConfirmation from "../hooks/useDeleteCollectionConfirmation";

type CollectionProp = {
    currCollection: ItemCollection | undefined,
    collections: ItemCollection[] | undefined,
    isInHeader?: boolean,
}

export default function CollectionMenu({ currCollection, collections, isInHeader }: CollectionProp) {

    const { switchToCollectionById } = useCollectionMenuActions();
    const confirmDeletion = useDeleteCollectionConfirmation();

    return <Menu
        position="bottom-start"
        offset={isInHeader ? 20 : 10}
    >
        <Menu.Target>
            <UnstyledButton className={"collection-menu-btn "
                + (isInHeader
                    ? "collection-menu-btn--is-in-header"
                    : "collection-menu-btn--is-sticky"
                )
            }>
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