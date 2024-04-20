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

export const isElementInViewport = (el: HTMLElement): boolean => {
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

export const slugify = (str: string) => {
    return String(str)
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}

// export const findSelectedIndex = () => {
//     const itemListWrapper = document.querySelector(`#displayed-list`);
//     const selectedItem = itemListWrapper?.querySelector<HTMLBaseElement>("[data-is-selected]");
//     const index = selectedItem?.getAttribute("data-index");
//     return Number(index);
// };