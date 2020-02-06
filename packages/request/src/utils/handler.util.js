/**
 * Utilities
 */
const URLBuilder = require('./url.util');

/**
 * Requests Handler
 *
 * @param {string} url
 * @param {object} settings
 *
 * @return {Promise}
 */
function request(url = '', settings = {}) {
    return new Promise((resolve, reject) => {
        if (!url) {
            return reject({
                code   : -1,
                message: 'request:missing-url',
            });
        }

        if (url.includes('/undefined')) {
            return reject({
                code   : -1,
                message: 'request:param-undefined-present',
            });
        }

        const {
            body,
            query,
            type,
            ...rest
        } = (settings || {});

        const requestURL      = URLBuilder(url, query);
        const requestSettings = {
            mode   : 'cors',
            cache  : 'default',
            ...rest
        };

        fetch(requestURL, requestSettings)
        .catch(reject)
        .then(response => {
            if ((typeof response !== 'object') || !response) {
                return response;
            }

            return (response[type] ? response[type]() : response.json());
        })
        .then(resolve);
    });
}

/**
 * Exporting
 */
module.exports = request;
