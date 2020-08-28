/**
 * Utilities
 */
import URLBuilder from './helpers/url';
import responseHandler from './handlers/response';

/**
 * Requests Handler
 *
 * @param {string} url
 * @param {object} settings
 *
 * @return {Promise}
 */
function request(
    url      = '',
    settings = {}
) {
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
            transform,
            ...rest
        } = settings;

        const requestURL      = URLBuilder(url, query);
        const requestSettings = {
            mode : 'cors',
            cache: 'default',
            ...(!body ? {} : {
                body: JSON.stringify(body),
            }),
            ...rest
        };

        fetch(requestURL, requestSettings)
        .then((response) => {
            return responseHandler(
                (type || transform),
                reject,
                response
            );
        })
        .then(resolve)
        .catch(reject);
    });
}

/**
 * Exporting
 */
export default request;
