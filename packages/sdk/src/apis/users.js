/**
 * Base
 */
import {
    get as getter,
} from '../request/request.js';

/**
 * User API Getter
 *
 * @param {string} id    - User ID
 * @param {object} query
 *
 * @returns {Promise}
 */
function get(
    id,
    query,
    settings
) {
    return getter(`/users/${id}`, query, settings);
}

/**
 * Reference
 */
const users = {
    get,
};

/**
 * Exporting
 */
export default users;
