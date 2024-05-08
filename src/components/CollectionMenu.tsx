import { useContext } from "react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
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
import LabelWithIcon from "@/libs/components/LabelWithIcon";

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
    const isWidthMobile = useMediaQuery("(max-width: 720px)");
    const { menuIconProps } = useIconProps();

    const collectionMenu = <DropdownMenu.Root>
        <DropdownMenu.Trigger
            className={"CollectionMenuBtn " + (isMobile ? "CollectionMenuBtn--isMobile" : "")}
        >
            <span className="CollectionMenuBtn__Label">
                {currCollection?.name}
            </span>
            <IconSelector className="CollectionMenuBtn__Icon" {...menuIconProps} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
            <DropdownMenu.Content className="CollectionMenuDropdown"
                side={isWidthMobile ? "top" : "bottom"}
                align={isWidthMobile ? "end" : "start"}
                sideOffset={10}
            >
                {collections?.map((collection: ItemCollection, index: number) =>
                    <CollectionMenuCollectionItem
                        key={collection.id}
                        index={index}
                        collection={collection}
                        isSelected={currCollection?.id === collection.id}
                        onClickHandler={trySwitchToCollectionById}
                    />
                )}

                <DropdownMenu.Separator className="CollectionMenuDropdown__Separator" />

                <DropdownMenu.Item className="CollectionMenuDropdown__Item"
                    onClick={openCreateCollectionModal}
                >
                    <LabelWithIcon className="CollectionMenuDropdown__Label"
                        leftSection={<IconStackPush {...menuIconProps} />}
                    >
                        Create collection
                    </LabelWithIcon>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="CollectionMenuDropdown__Item"
                    onClick={openUpdateCollectionModal}
                >
                    <LabelWithIcon className="CollectionMenuDropdown__Label"
                        leftSection={<IconEdit {...menuIconProps} />}
                    >
                        Edit collection
                    </LabelWithIcon>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="CollectionMenuDropdown__Item"
                    onClick={openSortCollectionModal}
                >
                    <LabelWithIcon className="CollectionMenuDropdown__Label"
                        leftSection={<IconSortAscendingShapes {...menuIconProps} />}
                    >
                        Sort collections
                    </LabelWithIcon>
                </DropdownMenu.Item>

                {!isTrashCollection && <>
                    <DropdownMenu.Separator className="CollectionMenuDropdown__Separator" />
                    <DropdownMenu.Item className="CollectionMenuDropdown__Item CollectionMenuDropdown__Item--IsRed"
                        onClick={confirmCollectionDeletion}
                    >
                        <LabelWithIcon className="CollectionMenuDropdown__Label"
                            leftSection={<IconTrashX {...menuIconProps} />}
                        >
                            Delete collection
                        </LabelWithIcon>
                    </DropdownMenu.Item>
                </>}

            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>

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
        ? "CollectionMenuDropdown__Item--IsSelected "
        : "";
    const isTrashBinModifierClassName = isTrashBin
        ? "CollectionMenuDropdown__Item--IsViolet "
        : "";
    const finalClassName = baseClassName
        + selectedModifierClassName
        + isTrashBinModifierClassName;

    const leftSection = isTrashBin
        ? <IconTrash {...menuIconProps} />
        : "";
    const rightSection = isSelected
        ? <IconCheck {...menuIconProps} />
        : <CollectionHotkey index={index}/>;

    const itemElement = <DropdownMenu.Item className={finalClassName}
        onClick={() => onClickHandler(collection.id)}
        aria-current={isSelected}
    >
        <LabelWithIcon className="CollectionMenuDropdown__Label"
            leftSection={leftSection}
            rightSection={rightSection}
        >
            {collection.name}
        </LabelWithIcon>
    </DropdownMenu.Item>

    if (!isTrashBin) return itemElement;

    return <>
        <DropdownMenu.Separator className="CollectionMenuDropdown__Separator" />
        {itemElement}
    </>
}
