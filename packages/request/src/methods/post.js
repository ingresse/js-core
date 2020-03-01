/**
 * Base
 */
import request from '../request';

/**
 * Request POST
 *
 * @param {string} url
 * @param {object} query
 * @param {object} body
 * @param {object} settings
 */
function post(
    url      = '',
    query    = {},
    body     = {},
    settings = {}
) {
    let {
        parser = 'json',
        headers,
        ...rest
    } = settings;

    let parsed      = body;
    let contentType = ((headers || {})['Content-Type']);

    /**
     * Header Content Type definition
     *
     * @param {string} type
     */
    function defineHCT(type) {
        if (!contentType) {
            if (!headers) {
                headers = {};
            }

            headers['Content-Type'] = (type || 'application/json');
        }
    }

    /**
     * Body Parser
     */
    switch (parser) {
        case 'FormData':
        case 'formData':
            parsed = new FormData();

            Object.keys(body).map((bodyKey) => {
                parsed.append(bodyKey, body[bodyKey]);
            });

            defineHCT('multipart/form-data');

            break;

        case 'stringify':
            parsed = JSON.stringify(body);

            defineHCT();

            break;

        case 'json':
            defineHCT();

            break;

        default:
            parsed = body;
    }

    return request(url, {
        method: 'POST',
        query : query,
        body  : parsed,
        headers,
        ...rest,
    });
}

/**
 * Exporting
 */
export default post;
