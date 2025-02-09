import { DateTime } from "luxon";

export default function ItemComponentCreatedDate({
    createdDatetime, className
}: {
    createdDatetime: string, className?: string
}) {

    const itemDatetime = DateTime.fromSQL(createdDatetime);
    const fullDateTime = itemDatetime.toLocaleString(DateTime.DATETIME_FULL);
    const isOlderThanToday = itemDatetime <= DateTime.local().startOf("day");
    const isOlderThanOneYear = itemDatetime <= DateTime.now().minus({year: 1});
    
    const computeDisplayedDateTime = () => {
        switch(true) {
        case isOlderThanOneYear:
            return itemDatetime.toFormat("LLL dd yyyy");
        case isOlderThanToday:
            return itemDatetime.toFormat("LLL dd");
        default:
            return itemDatetime.toFormat("HH:mm");
        }
    }

    return <p className={className}
        title={fullDateTime}
        data-testid="item-component-created-date"
    >
        {computeDisplayedDateTime()}
    </p>   
}