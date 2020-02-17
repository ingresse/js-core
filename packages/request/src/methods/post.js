/**
 * Base
 */
const request = require('../request');

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
    const {
        parser = 'json',
        ...rest
    } = settings;

    let parsed;

    /**
     * Body Parser
     */
    switch (parser) {
        case 'formData':
            parsed = new FormData();

            Object.keys(body).map((bodyKey) => {
                parsed.append(bodyKey, body[bodyKey]);
            });

            break;

        default:
            parsed = JSON.stringify(body);
    }

    return request(url, {
        method: 'POST',
        query : query,
        body  : parsed,
        ...rest,
    });
}

/**
 * Exporting
 */
module.exports = post;
