/**
 * Adapters
 */
import { pagination } from './pagination';

/**
 * Events List Formatter
 *
 * @param {object} response
 * @param {number} offset
 *
 * @returns {object}
 */
function list(
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
        hits,
        total = 0,
    } = (data || {});

    /**
     *
     */
    function fill(results, target = []) {
        if (!results || ((typeof results !== 'object') && !results.length)) {
            return results;
        }

        results.map((esItem) => {
            const { _source: item } = (esItem || {});
            const filteredItem      = (item || esItem);

            if (!filteredItem) {
                return false;
            }

            target.push(filteredItem);

            return true;
        });

        return target;
    }

    /**
     * Formatter
     */
    let list       = null;
    let aggregated = null;

    if (typeof hits === 'object') {
        if (hits.length) {
            list = [];

            fill(hits, list);
        }

        try {
            aggregated = {};

            for (const aggr in hits) {
                let results       = [];
                const aggregation = hits[aggr];
                aggregated[aggr]  = fill(aggregation, results);
            }
        } catch (e) {}
    }

    return {
        original  : response,
        list      : list,
        aggregated: aggregated,
        pagination: pagination(offset, pageSize, total),
    };
}

/**
 * Exporting
 */
export const events = {
    list,
};
