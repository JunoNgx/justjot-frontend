export const isElementInViewport = (el: HTMLElement): boolean => {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0
        && rect.bottom
            <= (window.innerHeight || document.documentElement.clientHeight)
    );
};

export const isElementAboveViewport = (el: HTMLBaseElement): boolean => {
    const rect = el.getBoundingClientRect();
    return rect.top < 0;
};

export const isElementBelowViewport = (el: HTMLBaseElement): boolean => {
    const rect = el.getBoundingClientRect();
    return (
        rect.bottom
        > (window.innerHeight || document.documentElement.clientHeight)
    );
};

export const slugify = (str: string) => {
    return str
        .toString()
        .toLowerCase()
        .replace(/^\s+|\s+$/g, "") // trim leading/trailing white space
        .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-") // remove consecutive hyphens
        .replace(/^-+/, "") // trim start of text
        .replace(/-+$/, "") // Trim from end of text
        .replace(/([a-zA-Z])(\d)/g, "$1-$2") // Separate numbers from alpha characters
        .replace(/(\d)([a-zA-Z])/g, "$1-$2");
};
