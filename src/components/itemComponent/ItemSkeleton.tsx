import { Group, Skeleton } from "@mantine/core";

export default function ItemSkeleton() {
    return <Group className="item-skeleton"
        justify="space-between"
        mb="1rem"
    >
        <Group className="item-skeleton__left-side">
            <Skeleton className="item-skeleton__icon-wrapper"
                width={32} height={32} 
            />
            <Skeleton className="item-skeleton__primary-text"
                height={32}
            />
        </Group>
        <Group className="item-skeleton__right-side">
            <Skeleton className="item-skeleton__datetime"
                height={32} width="5rem"
            />
        </Group>
    </Group>
};