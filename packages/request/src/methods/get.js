/**
 * Base
 */
import request from '../request';

/**
 * Request GET
 *
 * @param {string} url
 * @param {object} query
 * @param {object} settings
 */
function get(
    url      = '',
    query    = {},
    settings = {}
) {
    return request(url, {
        method: 'GET',
        query : query,
        ...settings,
    });
}

/**
 * Exporting
 */
export default get;
