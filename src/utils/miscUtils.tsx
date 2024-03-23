export const isDatetimeMoreThanOneYearOld = (datetime: Date): boolean => {
    const now = new Date();

    const yearDiff = now.getFullYear() - datetime.getFullYear();
    const dateDiff = now.setFullYear(2000) - datetime.setFullYear(2000);

    return yearDiff > 1
        || yearDiff === 1 && dateDiff > 0;
}

export const isValidUrl = (url: string) => {
    try { 
        return Boolean(new URL(url)); 
    }
    catch(e){ 
        return false; 
    }
}

export const isValidIndex = (n: number) => {
    return typeof n === "number"
        && n >= 0
        && n !== undefined
        && n !== null;
}

export const isElementInViewport = (el: HTMLBaseElement): boolean => {
    const rect = el.getBoundingClientRect();

    return rect.top >= 0
        && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

export const isElementAboveViewport = (el: HTMLBaseElement): boolean => {
    const rect = el.getBoundingClientRect();
    return rect.top < 0;
}

export const isElementBelowViewport = (el: HTMLBaseElement): boolean => {
    const rect = el.getBoundingClientRect();
    return rect.bottom > (window.innerHeight || document.documentElement.clientHeight);
}