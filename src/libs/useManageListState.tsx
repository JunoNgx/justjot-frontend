/**
 * 
 * @param setState {useState set function}
 * @returns A set of utility methods to manage the tuple whose `set` function
 * was passed in.
 */

export default function useManageListState<T>(
    setState: React.Dispatch<React.SetStateAction<T[]>>
) {
    const prepend = (item: T) => {
        setState(curr => [item, ...curr]);
    };

    const append = (item: T) => {
        setState(curr => [...curr, item]);
    };

    const pop = () => {
        setState(curr => {
            const tempArr = [...curr];
            return tempArr.splice(0, tempArr.length - 1);
        });
    };

    const remove = (...indices: number[]) => {
        setState(curr => curr.filter((_, index) => !indices.includes(index)));
    };

    const insert = (index: number, ...items: T[]) => {
        setState(curr => {
            return [...curr].splice(0, index)
                .concat([...items])
                .concat([...curr].splice(index + 1));
        });
    };

    const replace = (index: number, item: T) => {
        setState(curr => {
            const tempArr = [...curr];
            tempArr[index] = item;
            return tempArr;
        });
    }

    const replaceProps = (index: number, prop: object) => {
        setState(curr => {
            const tempArr = [...curr];
            const item = tempArr[index];
            tempArr[index] = {...item, ...prop};
            return tempArr;
        });
    }

    return {
        prepend,
        append,
        pop,
        remove,
        insert,
        replace,
        replaceProps,
    };
};