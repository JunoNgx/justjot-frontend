import { ReactNode } from "react";
import "./IconButton.scss";

type IconButtonOptions = {
    className?: string;
    title?: string;
    children?: ReactNode;
    onClick?: () => void;
};

export default function IconButton({
    className = "",
    title = "",
    children,
    onClick,
}: IconButtonOptions) {
    return (
        <button
            className={`${className} IconButton`}
            onClick={onClick}
            title={title}
        >
            <span className="IconButton__Icon">{children}</span>
        </button>
    );
}
