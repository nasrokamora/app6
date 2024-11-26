export function getSlug(tem) {
    return tem.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "_").replace(/\./g, "");
}