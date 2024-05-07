import { Group, Skeleton } from "@mantine/core";
import "./ItemSkeleton.scss";

export default function ItemSkeleton() {
    return <Group className="ItemSkeleton"
        justify="space-between"
    >
        <Group className="ItemSkeleton__LeftSide">
            <Skeleton className="ItemSkeleton__IconWrapper"
                width={32} height={32} 
            />
            <Skeleton className="ItemSkeleton__PrimaryText"
                height={32}
            />
        </Group>
        <Group className="ItemSkeleton__RightSide">
            <Skeleton className="ItemSkeleton__Datetime"
                height={32} width="5rem"
            />
        </Group>
    </Group>
}