/**
 * Base
 */
const handler = require('./handler.util');
/**
 * Request JSONP
 *
 * @param {string} url
 * @param {object} query
 * @param {object} body
 * @param {object} settings
 */
function jsonp(url = '', query = {}, body = {}, settings = {}) {
    return handler(url, {
        method: 'JSONP',
        query : query,
        body  : body,
        ...settings,
    });
}

/**
 * Exporting
 */
module.exports = jsonp;
