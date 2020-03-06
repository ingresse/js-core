/**
 * Base
 */
import {
    get as getter,
} from '../request/request.js';

/**
 * User API Getter
 *
 * @param {string} id - User's ID
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function get(
    id,
    query,
    settings
) {
    return getter(`/user/${id}`, query, settings);
}

/**
 * Reference
 */
const user = {
    get,
};

/**
 * Exporting
 */
export default user;
