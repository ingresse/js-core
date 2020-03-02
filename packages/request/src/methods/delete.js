/**
 * Base
 */
import request from '../request';

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
export default del;
