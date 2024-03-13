import { Box, Group, Kbd, Menu, MenuDivider, MenuItem, Text, UnstyledButton } from "@mantine/core";
import { ItemCollection } from "../types";
import { IconEdit, IconPlus, IconSelector, IconSortAscendingShapes, IconTrash } from "@tabler/icons-react";

type CollectionProp = {
    currCollection: ItemCollection | undefined,
    collections: ItemCollection[] | undefined
}

export default function CollectionMenu({ currCollection, collections }: CollectionProp) {

    return <Menu
        position="bottom-start"
    >
        <Menu.Target>
            <UnstyledButton className="collection-menu-btn">
                <Group>
                    <Text>{currCollection?.name}</Text>
                    <IconSelector size={14}/>
                </Group>
            </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
            {collections?.map((collection: ItemCollection, index: number) =>
                <MenuItem rightSection={computeNumericHotkey(index)}>{collection.name}</MenuItem>
            )}
            <MenuDivider/>
            <MenuItem leftSection={<IconPlus size={16}/>}>Create new collection</MenuItem>
            <MenuItem leftSection={<IconSortAscendingShapes size={16}/>}>Sort all collections</MenuItem>
            <MenuItem leftSection={<IconEdit size={16}/>}>Edit this collection</MenuItem>
            <MenuItem color="red" leftSection={<IconTrash size={16}/>}>Delete this collection</MenuItem>
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