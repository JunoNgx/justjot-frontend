import "./ButtonWithLoader.scss";

type ButtonWithLoaderOptions = {
    className?: string,
    variant?: "primary" |"secondary" | "danger" | undefined,
    type?: "submit" | "reset" | "button" | undefined,
    isLoading?: boolean,
    children?: React.ReactNode,
}

export default function ButtonWithLoader(
    { className, variant, type, isLoading = false, children }: ButtonWithLoaderOptions
) {
    return <button className={`${className} ButtonWithLoader`}
        type={type}
        data-variant={variant}
        data-loading={isLoading}
        disabled={isLoading}
    >
        <span className="ButtonWithLoader__LoaderContainer">
            <span className="ButtonWithLoader__Loader" />
        </span>
        <span className="ButtonWithLoader__LabelContainer">
            {children}
        </span>
    </button>
}