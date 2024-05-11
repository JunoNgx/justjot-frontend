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
