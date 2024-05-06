import { ReactNode } from "react";
import "./Button.scss";

type ButtonOptions = {
    className?: string,
    title?: string,
    children?: ReactNode,
    onClick?: () => void,
    leftSection?: ReactNode,
    rightSection?: ReactNode,
    gap?: string,
};

export default function Button(
    {
        className = "",
        title,
        children,
        onClick,
        leftSection,
        rightSection,
        gap = "0.5rem"
    }: ButtonOptions
) {
    return <button className={`${className} Button`}
        onClick={onClick}
        title={title}
    >
        <span className="Button__Wrapper"
            style={{
                gap,
            }}
        >
            {leftSection}
            {children}
            {rightSection}
        </span>
    </button>
}