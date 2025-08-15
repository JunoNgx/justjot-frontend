import { ClientResponseError } from "pocketbase";
import "./ErrorResponseDisplay.scss";

type ErrorResponse = {
    code?: number;
} & ClientResponseError;

export default function ErrorResponseDisplay({
    errRes,
}: {
    errRes: ErrorResponse | null;
}) {
    const tryTranscribeDataToProblemList = (
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        data: any
    ): string[] => {
        const problemList: string[] = [];

        if (data) {
            Object.entries(data).forEach((keyValArr, _index) => {
                const value = keyValArr[1] as { code: string; message: string };
                const errorMsg = value.message;
                problemList.push(errorMsg);
            });
        }

        return problemList;
    };

    const hasMainError = !!errRes;
    const statusCode = errRes?.code || errRes?.status;
    const mainErrorDisplay = (
        <p className="MainError">
            Code {statusCode}: {errRes?.message}
        </p>
    );

    /**
     * Crawling the potential data properties to find the error info.
     * This is terrible, but Pocketbase unfortunately does not respond errors
     * in a consistent way.
     */
    let problemList = tryTranscribeDataToProblemList(errRes?.data);
    if (!problemList[0]) {
        problemList = tryTranscribeDataToProblemList(errRes?.response.data);
    }
    if (!problemList[0]) {
        problemList = tryTranscribeDataToProblemList(errRes?.data.data);
    }

    const hasProblemList = !!problemList.length;
    const problemListDisplay = (
        <ul className="ErrorList">
            {problemList.map((problem, index) => (
                <li className="ErrorList__Item" key={index}>
                    {problem}
                </li>
            ))}
        </ul>
    );

    return (
        <>
            {hasMainError && mainErrorDisplay}
            {hasProblemList && problemListDisplay}
        </>
    );
}
