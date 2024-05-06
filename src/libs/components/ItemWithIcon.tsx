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
    return <span className={`${className} item-with-icon`}
        onClick={onClick}
        style={{
            gap,
        }}
    >
        {leftSection}
        {children}
        {rightSection}
    </span>
}