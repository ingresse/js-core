/**
 * Base
 */
const request = require('../request');

/**
 * Request DELETE
 *
 * @param {string} url
 * @param {object} query
 * @param {object} settings
 */
function del(
    url      = '',
    query    = {},
    settings = {}
) {
    return request(url, {
        method: 'DELETE',
        query : query,
        ...settings,
    });
}

/**
 * Exporting
 */
module.exports = del;
