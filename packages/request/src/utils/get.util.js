/**
 * Base
 */
const handler = require('./handler.util');

/**
 * Request GET
 *
 * @param {string} url
 * @param {object} query
 * @param {object} settings
 */
function get(url = '', query = {}, settings = {}) {
    return handler(url, {
        method: 'GET',
        query : query,
        ...settings,
    });
}

/**
 * Exporting
 */
module.exports = get;
