import { Text } from "@mantine/core";
import { DateTime } from "luxon";

export default function ItemComponentCreatedDate(
    { createdDatetime, className }:
    { createdDatetime: string, className?: string}
) {

    const itemDatetime = DateTime.fromSQL(createdDatetime);
    const fullDateTime = itemDatetime.toLocaleString(DateTime.DATETIME_FULL);
    const isOlderThanOneDay = itemDatetime <= DateTime.now().minus({days: 1});
    const isOlderThanOneYear = itemDatetime <= DateTime.now().minus({year: 1});
    
    const computeDisplayedDateTime = () => {
        switch(true) {
        case isOlderThanOneYear:
            return itemDatetime.toFormat("LLL dd yyyy");
        case isOlderThanOneDay:
            return itemDatetime.toFormat("LLL dd");
        default:
            // return itemDatetime.toRelative({padding: 60000}); // Will not show less than a minute
            return itemDatetime.toFormat("HH:mm");
        }
    }

    return <Text className={className}
        title={fullDateTime}
        data-testid="item-component-created-date"
    >
        {computeDisplayedDateTime()}
    </Text>   
}