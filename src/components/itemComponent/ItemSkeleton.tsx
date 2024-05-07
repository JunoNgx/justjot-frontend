import "./ItemSkeleton.scss";

export default function ItemSkeleton() {
    return <div className="ItemSkeleton">
        <div className="ItemSkeleton__LeftSide">
            <div className="ItemSkeleton__IconWrapper" />
            <div className="ItemSkeleton__PrimaryText" />
        </div>
        <div className="ItemSkeleton__RightSide">
            <div className="ItemSkeleton__Datetime" />
        </div>
    </div>
}