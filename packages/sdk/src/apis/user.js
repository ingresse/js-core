/**
 * Base
 */
const request = require('../request/request.js');

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

/**
 * Exporting
 */
module.exports = {
    get,
};
