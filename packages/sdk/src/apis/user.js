/**
 * Base
 */
import { get as getter } from '../request/request.js';

/**
 * User API Getter
 *
 * @param {string} id    - User Identifier
 * @param {object} query
 *
 * @return {Promise}
 */
function get(id = '', query = {}) {
    return new Promise((resolve, reject) => {
        getter(`/users/${id}`, query)
        .catch(reject)
        .then(resolve);
    });
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
