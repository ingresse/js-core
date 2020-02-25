/**
 * Core Packages
 */
import requester from '@ingresse/request';

import options from '../options.js';
import credentials from '../credentials/credentials.js';

import envURLBuilder from '../utils/env.js';

/**
 * Helpers
 */
import errorHandler from '../exceptions/handler.js';
/**
 * Get Resource URL
 *
 * @param {string} resource - platform resource
 * @param {string} env      - pltaform environment
 *
 * @return {string}
 */
function getURL(
    resource = 'api',
    env      = ''
) {
    return (
        options.url ||
        envURLBuilder(resource, (env || options.env || ''))
    );
}

/**
 * Set Resource URL
 *
 * @param {string} resource - platform resource
 * @param {string} env      - pltaform environment
 *
 * @return {string}
 */
function setURL(
    resource = 'api',
    env      = ''
) {
    const newResourceURL = envURLBuilder(resource, (env || options.env || ''));

    options.set({
        url: newResourceURL,
    });

    return newResourceURL;
}

/**
 * Return request URL
 *
 * @param {string} path
 * @param {object} query
 *
 * @return {string} request URL
 */
function _requestURL(
    path  = '',
    query = {}
) {
    const resourceURL = getURL();
    const params      = (
        Object.keys(query)
        .map(queryKey => (
            encodeURIComponent(queryKey) +
            '=' +
            encodeURIComponent(query[queryKey])
        ))
        .join('&')
    );

    return `${resourceURL}${path}${!params ? '' : '?'}${params}`;
}



/**
 * Request's Authentication parameteres
 *
 * @return {object} headers and query
 */
function _requestCredentials(
    credentials = {},
    options     = {}
) {
    const {
        jwt,
        authToken,
    } = (credentials || {});
    const authHeader = (!jwt && !authToken ? {} : {
        'Authorization': `Bearer ${jwt || authToken}`,
    });
    const authQuery  = {
        ...(!options.apiKey ? {} : {
            apikey: options.apiKey,
        }),
        ...(!credentials.token ? {} : {
            usertoken: credentials.token,
        }),
    };

    return {
        authHeader,
        authQuery,
    };
}

/**
 * Requests Handler
 *
 * @param {string} path
 * @param {object} headers
 * @param {object} query
 * @param {object} settings
 *
 * @return {Promise}
 */
function _requestHandler(
    path     = '',
    settings = {}
) {
    return new Promise((resolve, reject) => {
        if (!path) {
            return reject({
                code   : -1,
                message: 'request:missing-path',
            });
        }

        if (path.includes('/undefined')) {
            return reject({
                code   : -1,
                message: 'request:param-undefined',
            });
        }

        const {
            authHeader,
            authQuery,
        } = _requestCredentials(credentials, options);

        const {
            headers,
            query,
            ...rest
        } = (settings || {});

        const reqQuery    = {
            ...(authQuery || {}),
            ...(query || {})
        };

        const reqUrl      = _requestURL(path, reqQuery);
        const reqHeaders  = {
            'Accept'       : '*/*',
            'Cache-Control': 'no-cache',
            'Content-Type' : 'application/json',
            ...(authHeader || {}),
            ...(headers || {})
        };
        const reqSettings = {
            headers: reqHeaders,
            mode   : 'cors',
            cache  : 'default',
            ...rest
        };

        requester(reqUrl, reqSettings)
        .catch((error) => {
            const exception = errorHandler(error);
            const { code }  = (exception || {});

            if (code === 6065) {
                _requestHandler('/login/renew-token', {
                    headers: {
                        method: 'GET',
                    }
                })
                .catch(reject)
                .then(() => {
                    _requestHandler(path, settings)
                    .catch(reject)
                    .then(resolve);
                });

                return;
            }

            reject(exception);
        })
        .then((response) => {
            const {
                responseData,
                responseError,
            } = (response || {});
            const {
                status,
            } = (responseData || {});

            if (responseError || (status === false)) {
                const {
                    code,
                    message,
                } = (responseError || {});

                return reject(errorHandler({
                    ...(responseError || {
                        code   : (code || -1),
                        message: message,
                    }),
                }));
            }

            resolve(responseData);
        });
    });
}

/**
 * Requests Reference
 */
const request = {
    /**
     * Request GET
     *
     * @param {string} path
     * @param {object} query
     * @param {object} settings
     */
    get: (path = '', query = {}, settings = {}) => {
        return _requestHandler(
            path,
            {
                method: 'GET',
                query : query,
                ...settings,
            }
        );
    },

    /**
     * Request POST
     *
     * @param {string} path
     * @param {object} query
     * @param {object} body
     * @param {object} settings
     */
    post: (path = '', query = {}, body = {}, settings = {}) => {
        return _requestHandler(
            path,
            {
                method: 'POST',
                query : query,
                body  : body,
                ...settings,
            }
        );
    },

    /**
     * Request PUT
     *
     * @param {string} path
     * @param {object} query
     * @param {object} body
     * @param {object} settings
     */
    put: (path = '', query = {}, body = {}, settings = {}) => {
        return _requestHandler(
            path,
            {
                method: 'POST',
                query : query,
                body  : body,
                ...settings,
            }
        );
    },

    /**
     * Request JSONP
     *
     * @param {string} path
     * @param {object} query
     * @param {object} body
     * @param {object} settings
     */
    jsop: (path = '', query = {}, body = {}, settings = {}) => {
        return _requestHandler(
            path,
            {
                method: 'JSONP',
                query : query,
                body  : body,
                ...settings,
            }
        );
    },

    /**
     * Request DELETE
     *
     * @param {string} path
     * @param {object} query
     * @param {object} settings
     */
    delete: (path = '', query = {}, settings = {}) => {
        return _requestHandler(
            path,
            {
                method: 'DELETE',
                query : query,
                ...settings,
            }
        );
    },
};

/**
 * Exporting
 */
export {
    _requestHandler as default,
    request,
    setURL,
    getURL,
}
