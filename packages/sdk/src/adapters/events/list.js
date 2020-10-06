/**
 * Adapters
 */
import { pagination } from '../pagination';
import { details } from './details';

/**
 * Events List Formatter
 *
 * @param {object} response
 * @param {number} offset
 * @param {number} pageSize
 * @param {object} user
 *
 * @returns {object}
 */
export function list(
    response,
    offset   = 0,
    pageSize = 10,
    user,
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
     * Fill Events List array
     *
     * @param {Array} results
     * @param {Array} target
     *
     * @returns {Array}
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

            target.push(details(filteredItem, user));

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

        } else {
            let tempAggretated = {};

            try {
                for (const aggr in hits) {
                    let results       = [];
                    const aggregation = hits[aggr];

                    if (aggregation && aggregation.length) {
                        tempAggretated[aggr] = fill(aggregation, results);
                    }
                }
            } catch (e) {}

            const {
                today,
                week,
                month,
                year,
                others,
            } = tempAggretated;

            aggregated = {
                today,
                week,
                month,
                year,
                others,
            };
        }
    }

    const hasList = !!list;
    const hasAggregated = !!aggregated;

    return {
        empty     : !!(!hasList && !hasAggregated),
        original  : response,
        list      : list,
        aggregated: aggregated,
        pagination: pagination(offset, pageSize, total),
    };
}