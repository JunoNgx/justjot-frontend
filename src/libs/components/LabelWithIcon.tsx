import { ReactNode } from "react";
import "./LabelWithIcon.scss";

type LabelWithIconOptions = {
    className?: string,
    children?: ReactNode,
    onClick?: () => void,
    leftSection?: ReactNode,
    rightSection?: ReactNode,
    gap?: string,
};

export default function LabelWithIcon({
    className = "",
    children,
    onClick,
    leftSection,
    rightSection,
    gap = "0.5rem",
}: LabelWithIconOptions
) {
    return <span className={`${className} LabelWithIcon`}
        onClick={onClick}
        style={{
            gap,
        }}
    >
        <span className="LabelWithIcon__LeftSide">
            {leftSection}
            <span className="LabelWithIcon__Label">{children}</span>
        </span>
        <span className="LabelWithIcon__RightSide">{rightSection}</span>
    </span>
}
