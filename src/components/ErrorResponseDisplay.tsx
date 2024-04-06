import { Stack, Text } from "@mantine/core";
import { ClientResponseError } from "pocketbase";

type ErrorResponse = {
    code?: number
} & ClientResponseError;

export default function ErrorResponseDisplay(
    { errRes }: { errRes: ErrorResponse | null }
) {
    const tryTranscribeDataToProblemList = (
        data: any
    ): string[] => {

        const problemList: string[] = [];

        if (data) {
            Object.entries(data).forEach((keyValArr, _index) => {
                const value = keyValArr[1] as {code: string, message: string};
                const errorMsg = value.message;
                problemList.push(errorMsg);
            });
        };

        return problemList;
    };
    
    const hasMainError = !!errRes;
    const statusCode = errRes?.code || errRes?.status;
    const mainErrorDisplay = (
        <Text c="orange" mt="xs">Code {statusCode}: {errRes?.message}</Text>
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
        <Stack mt="lg">
            {problemList.map((problem, index) =>
                <Text key={index} c="red">{problem}</Text>
            )}
        </Stack>
    );

    return <>
        {hasMainError && mainErrorDisplay}
        {hasProblemList && problemListDisplay}
    </>
}