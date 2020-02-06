/**
 * Base
 */
const handler = require('./handler.util');

/**
 * Request DELETE
 *
 * @param {string} url
 * @param {object} query
 * @param {object} settings
 */
function del(url = '', query = {}, settings = {}) {
    return handler(url, {
        method: 'DELETE',
        query : query,
        ...settings,
    });
}

/**
 * Exporting
 */
module.exports = del;
