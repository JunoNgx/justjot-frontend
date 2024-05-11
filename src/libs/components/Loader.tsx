import "./Loader.scss"

export default function Loader(
    { shouldUsePriCol = true }: { shouldUsePriCol?: boolean }
) {
    return <div className="Loader"
        data-usePriCol={shouldUsePriCol}
    />
}
