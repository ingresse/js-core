/**
 * Base
 */
import {
    get,
} from '../request/request.js';

/**
 * Sales Groups API Getter
 *
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function groups(
    query,
    settings
) {
    return get('/salesgroup', query, settings);
}

/**
 * Reference
 */
const sales = {
    groups,
};

/**
 * Exporting
 */
export default sales;
