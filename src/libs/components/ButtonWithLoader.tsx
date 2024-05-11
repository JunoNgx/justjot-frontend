import "./ButtonWithLoader.scss";
import Loader from "./Loader";

type ButtonWithLoaderOptions = {
    className?: string,
    variant?: "primary" |"secondary" | "danger" | undefined,
    type?: "submit" | "reset" | "button" | undefined,
    isLoading?: boolean,
    isDisabled?: boolean,
    onClick?: () => void,
    children?: React.ReactNode,
}

export default function ButtonWithLoader(
    {
        className,
        variant = "primary",
        type,
        isLoading = false,
        isDisabled = false,
        onClick,
        children
    }: ButtonWithLoaderOptions
) {
    const shouldLoaderUsePriCol = variant === "secondary";

    return <button className={`${className} ButtonWithLoader`}
        type={type}
        data-variant={variant}
        data-loading={isLoading}
        disabled={isDisabled || isLoading}
        onClick={onClick}
    >
        <span className="ButtonWithLoader__LoaderContainer">
            <Loader shouldUsePriCol={shouldLoaderUsePriCol} />
        </span>
        <span className="ButtonWithLoader__LabelContainer">
            {children}
        </span>
    </button>
}
