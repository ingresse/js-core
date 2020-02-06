/**
 * Base
 */
const handler = require('./handler.util');

/**
 * Request POST
 *
 * @param {string} url
 * @param {object} query
 * @param {object} body
 * @param {object} settings
 */
function post(url = '', query = {}, body = {}, settings = {}) {
    return handler(url, {
        method: 'POST',
        query : query,
        body  : body,
        ...settings,
    });
}

/**
 * Exporting
 */
module.exports = post;
