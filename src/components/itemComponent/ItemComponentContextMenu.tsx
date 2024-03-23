import { ContextMenuContext } from "@/contexts/ContextMenuContext";
import { justJotTheme } from "@/theme";
import { Kbd, Menu } from "@mantine/core";
import { IconCheckbox, IconCopy, IconDownload, IconEdit, IconFolders, IconMenu, IconSquare, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect, useRef } from "react";

export default function ItemComponentContextMenu(
    // {item}: {item: Item}
) {

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const dropdownRef = useRef<HTMLBaseElement>(null);

    const handleClick = (ev: MouseEvent) => {
        if (dropdownRef.current
            && !dropdownRef.current.contains(ev.target as Node)
        ) {
            setIsContextMenuOpened(false);
        }
    }

    const { isContextMenuOpened, setIsContextMenuOpened } = useContext(ContextMenuContext);

    // const primaryActionIcon = item.shouldCopyOnClick
    //     ? <IconCheckbox
    //         size={justJotTheme.other.iconSizeMenu}
    //         stroke={justJotTheme.other.iconStrokeWidth}
    //     />
    //     : <IconSquare
    //         size={justJotTheme.other.iconSizeMenu}
    //         stroke={justJotTheme.other.iconStrokeWidth}
    //     />

    const primaryActionIcon = <IconCheckbox
        size={justJotTheme.other.iconSizeMenu}
        stroke={justJotTheme.other.iconStrokeWidth}
    />

    return <Menu
        opened={isContextMenuOpened}
        onChange={setIsContextMenuOpened}
    >
        {/* <Menu.Target>
            <ActionIcon
                variant="subtle"
                aria-label="extended action menu"
            >
                <IconMenu
                    size={justJotTheme.other.iconSizeItem}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />
            </ActionIcon>
        </Menu.Target> */}

        <Menu.Dropdown ref={dropdownRef}>
            <Menu.Item
                leftSection={<IconCopy
                    size={justJotTheme.other.iconSizeMenu}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />}
                rightSection={<Kbd>C</Kbd>}
            >
                Copy
            </Menu.Item>

            <Menu.Item
                leftSection={<IconEdit
                    size={justJotTheme.other.iconSizeMenu}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />}
                rightSection={<Kbd>C</Kbd>}
            >
                Edit
            </Menu.Item>

            <Menu.Item
                leftSection={<IconFolders
                    size={justJotTheme.other.iconSizeMenu}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />}
                rightSection={<Kbd>C</Kbd>}
            >
                Move
            </Menu.Item>

            <Menu.Item
                color="red"
                leftSection={<IconTrash
                    size={justJotTheme.other.iconSizeMenu}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />}
                rightSection={<Kbd>C</Kbd>}
            >
                Edit
            </Menu.Item>

            <Menu.Item
                leftSection={<IconDownload
                    size={justJotTheme.other.iconSizeMenu}
                    stroke={justJotTheme.other.iconStrokeWidth}
                />}
                rightSection={<Kbd>C</Kbd>}
            >
                Refetch link meta-data
            </Menu.Item>
            
            <Menu.Divider/>

            <Menu.Item
                color="blue"
                leftSection={primaryActionIcon}
            >
                Copy as Primary Action
            </Menu.Item>

        </Menu.Dropdown>
    </Menu>
}
