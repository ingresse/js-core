/**
 * Base
 */
import post from './post';

/**
 * Request PUT
 *
 * @param {string} url
 * @param {object} query
 * @param {object} body
 * @param {object} settings
 */
function put(
    url      = '',
    query    = {},
    body     = {},
    settings = {}
) {
    return post(url, {
        method: 'PUT',
        query : query,
        body  : body,
        ...settings,
    });
}

/**
 * Exporting
 */
export default put;
