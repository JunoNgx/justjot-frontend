import { Text } from "@mantine/core";
import { DateTime } from "luxon";
import { useMemo } from "react";

export default function ItemComponentCreatedDate(
    { createdDatetime, className }:
    { createdDatetime: string, className: string}
) {

    const itemDatetime = useMemo(() => DateTime
        .fromJSDate(new Date(createdDatetime)),
    [createdDatetime]);
    const fullDateTime = useMemo(() => itemDatetime
        .toLocaleString(DateTime.DATETIME_FULL),
    [createdDatetime])
    const relativeDateTime = useMemo(() => itemDatetime
        .toRelative({padding: 60000}),
    [createdDatetime])

    return <Text className={className}
        title={fullDateTime}
    >
        {relativeDateTime}
    </Text>   
}