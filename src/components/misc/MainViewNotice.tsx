import "./MainViewNotice.scss";

export default function MainViewNotice({
    content
}: {
    content: string
}) {
    return <div className="MainViewNotice">
        <p className="MainViewNotice__Content">
            {content}
        </p>
    </div>
}
