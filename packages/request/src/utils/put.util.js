/**
 * Base
 */
const handler = require('./handler.util');

/**
 * Request PUT
 *
 * @param {string} url
 * @param {object} query
 * @param {object} body
 * @param {object} settings
 */
function put(url = '', query = {}, body = {}, settings = {}) {
    return handler(url, {
        method: 'PUT',
        query : query,
        body  : body,
        ...settings,
    });
}

/**
 * Exporting
 */
module.exports = put;
