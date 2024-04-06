export default function useTranscribeResponseErrorToErrorListState() {

    const transcribeError = (
        { err, setErrorList }:
        { err: any, setErrorList: React.Dispatch<React.SetStateAction<string[]>> }
    ) => {
        if (err.response.data) {
            Object.entries(err.response.data).forEach((keyValArr, _index) => {
                const value = keyValArr[1] as {code: string, message: string};
                const errorMsg = value.message;
                setErrorList(errList => [...errList, errorMsg])
            });
        };
    }

    return transcribeError;
};
