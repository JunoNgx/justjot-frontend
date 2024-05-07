import { ReactNode } from "react";
import "./ItemWithIcon.scss";

type ItemWithIconOptions = {
    className?: string,
    children?: ReactNode,
    onClick?: () => void,
    leftSection?: ReactNode,
    rightSection?: ReactNode,
    gap?: string,
};

export default function ItemWithIcon(
    { className = "", children, onClick, leftSection, rightSection, gap = "0.5rem"}:
    ItemWithIconOptions
) {
    return <span className={`${className} ItemWithIcon`}
        onClick={onClick}
        style={{
            gap,
        }}
    >
        <span className="ItemWithIcon__LeftSide">
            {leftSection}
            <span className="ItemWithIcon__Label">{children}</span>
        </span>
        <span className="ItemWithIcon__RightSide">{rightSection}</span>
    </span>
}
