export const isDatetimeMoreThanOneYearOld = (datetime: Date): boolean => {
    const now = new Date();

    const yearDiff = now.getFullYear() - datetime.getFullYear();
    const dateDiff = now.setFullYear(2000) - datetime.setFullYear(2000);

    return yearDiff > 1
        || yearDiff === 1 && dateDiff > 0;
}