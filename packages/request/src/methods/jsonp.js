/**
 * Base
 */
import post from './post';

/**
 * Request JSONP
 *
 * @param {string} url
 * @param {object} query
 * @param {object} body
 * @param {object} settings
 */
function jsonp(
    url      = '',
    query    = {},
    body     = {},
    settings = {}
) {
    return post(url, query, body, {
        method: 'JSONP',
        ...settings,
    });
}

/**
 * Exporting
 */
export default jsonp;
