/**
 * Elastic Search Pagination Formatter
 *
 * @param {number} offset
 * @param {number} size   - page size
 * @param {number} total  - total results
 *
 * @returns {object}
 */
function pagination(
    offset = 0,
    size   = 10,
    total  = 0
) {
    const pages   = (Math.round(total / size) || 1);
    const current = ((Math.ceil(offset / size) || 0) + 1);
    const next    = ((current + 1) <= pages ? (current + 1) : pages);

    return {
        current : current,
        next    : next,
        pageSize: size,
        size    : size,
        pages   : pages,
        total   : total,
    };
}

/**
 * Exporting
 */
export { pagination };
