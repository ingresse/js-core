/**
 * Base
 */
import { request } from '../request/request.js';

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
        request
        .get(`/users/${id}`, query)
        .catch(reject)
        .then(resolve);
    });
}

const user = {
    get,
}

/**
 * Exporting
 */
export default user;
