import { ReactNode } from "react";
import "./IconButton.scss";

type IconButtonOptions = {
    className?: string,
    title?: string,
    children?: ReactNode,
    onClick?: () => void,
};

export default function IconButton(
    { className = "", title = "", children, onClick }: IconButtonOptions
) {
    return <button className={`${className} icon-button`}
        onClick={onClick}
        title={title}
    >
        <span className="icon-button__icon">
            {children}
        </span>
    </button>
}