import "./MainViewNotice.scss";

export default function MainViewNotice(
    { content }: { content: string }
) {
    return <div className="MainViewNotice__Item">
        <p className="MainViewNotice__Content">
            {content}
        </p>
    </div>
}
