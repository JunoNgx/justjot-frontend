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
    const mainErrorDisplay = (
        <Text c="orange" mt="xs">{errRes?.code}: {errRes?.message}</Text>
    );

    const problemList = tryTranscribeDataToProblemList(errRes?.data);
    const hasProblemList = !!problemList.length;
    const problemListDisplay = (
        <Stack mt="xs">
            {problemList.map(problem =>
                <Text c="red">{problem}</Text>
            )}
        </Stack>
    );

    return <>
        {hasMainError && mainErrorDisplay}
        {hasProblemList && problemListDisplay}
    </>
}