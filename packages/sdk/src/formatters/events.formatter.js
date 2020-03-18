/**
 * Formatters
 */
import { pagination } from './pagination.formatter';

/**
 * Events List Formatter
 *
 * @param {object} response
 * @param {number} offset
 *
 * @returns {object}
 */
function events(
    response,
    offset   = 0,
    pageSize = 10,
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

    return {
        data      : list,
        pagination: pagination(offset, pageSize, total),
    };
}

/**
 * Exporting
 */
export {
    events,
};
