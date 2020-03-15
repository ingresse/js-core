/**
 * Utilities
 */
import orderObject from '../utils/order.js';

/**
 * Elastic Search Formatter
 *
 * @param {object} response
 * @param {number} offset
 *
 * @returns {object}
 */
function elastic(
    response,
    offset = 0
) {
    if (!response ||
        (typeof response !== 'object')) {
        return response;
    }

    /**
     * Elastic Search values
     */
    const {
        data,
    } = (response || {});
    const {
        hits  = [],
        total = 0,
    } = (data || {});

    /**
     * List
     */
    let list = [];
    hits.map((esItem) => {
        const { _source: item } = (esItem || {});
        const filteredItem      = (item || esItem);

        if (!filteredItem) {
            return false;
        }

        list.push(filteredItem);

        return true;
    });

    /**
     * Pagination TO DO
     */
    const pagination = {
        current    : offset,
        currentPage: offset,
        total      : total,
    };

    return {
        list,
        pagination,
    };
}

/**
 * Exporting
 */
export { elastic };
