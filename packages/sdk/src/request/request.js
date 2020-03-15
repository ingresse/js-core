/**
 * Core Packages
 */
import requester from '@ingresse/request';

/**
 * Base
 */
import options from '../options.js';
import credentials from '../credentials.js';

/**
 * Utilities
 */
import parseJWT from '../utils/env.js';
import envURLBuilder from '../utils/env.js';

/**
 * Helpers
 */
import errorHandler from '../exceptions/handler.js';

/**
 * Formatters
 */
import * as formatters from '../formatters/index.js';

/**
 * Get Resource URL
 *
 * @param {string} resource - platform resource
 * @param {string} env      - pltaform environment
 *
 * @returns {string}
 */
function getURL(
    resource = 'api',
    env      = ''
) {
    return (
        options.get('url') ||
        envURLBuilder(resource, (env || options.get('env') || ''))
    );
}

/**
 * Set Resource URL
 *
 * @param {string} resource - platform resource
 * @param {string} env      - pltaform environment
 *
 * @returns {string}
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
 * @param {string} microservice
 *
 * @returns {string} request URL
 */
function _requestURL(
    path         = '',
    query        = {},
    microservice = 'api'
) {
    const resourceURL = getURL(microservice);
    const params      = (
        Object.keys(query)
        .map(queryKey => (
            queryKey +
            '=' +
            query[queryKey]
        ))
        .join('&')
    );

    return `${resourceURL}${path}${!params ? '' : '?'}${params}`;
}



/**
 * Request's Authentication parameteres
 *
 * @returns {object} headers and query
 */
function _requestCredentials(
    credentials = {},
    options     = {}
) {
    const {
        authToken,
        jwt,
        token,
    } = (credentials || {});
    const {
        apikey,
        apiKey,
    } = (options || {});
    const authHeader = (!jwt && !authToken ? {} : {
        'Authorization': `Bearer ${'' + (jwt || authToken)}`,
    });
    const authQuery  = {
        ...(!apikey && !apiKey ? {} : {
            apikey: ('' + (apikey || apiKey)),
        }),
        ...(!token ? {} : {
            usertoken: ('' + token),
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
 * @returns {Promise}
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
        } = _requestCredentials(credentials.get(), options.get());

        const {
            headers,
            query,
            microservice,
            withFormatter,
            withoutApiKey,
            withoutUserToken,
            ...rest
        } = (settings || {});

        let reqQuery = {
            ...(authQuery || {}),
            ...(query || {})
        };

        if (withoutApiKey) {
            delete reqQuery.apikey;
        }

        if (withoutUserToken) {
            delete reqQuery.usertoken;
        }

        const reqUrl      = _requestURL(path, reqQuery, microservice);
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
        .then((response) => {
            const {
                responseData,
                responseError,
            } = (response || {});
            const {
                status,
                message: messageData,
            } = (responseData || {});

            if (responseError || (status === false)) {
                const {
                    code,
                    message,
                } = (responseError || {});

                return reject(errorHandler({
                    ...(responseError || {
                        code   : (code || -1),
                        message: (message || messageData || ''),
                    }),
                }));
            }

            if (withFormatter &&
                (typeof withFormatter === 'function') ||
                (typeof formatters[withFormatter] === 'function')) {

                return resolve(
                    typeof withFormatter === 'function' ?
                        withFormatter(responseData || response) :
                            formatters[withFormatter](responseData || response)
                );
            }

            resolve(responseData || response);
        })
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
                .then(({ authToken }) => {
                    if (!authToken) {
                        reject(exception);

                        return;
                    }

                    credentials.set('jwt', authToken);

                    _requestHandler(path, settings)
                    .catch(reject)
                    .then(resolve);
                });

                return;
            }

            reject(exception);
        });
    });
}

/**
 * Request GET
 *
 * @param {string} path
 * @param {object} query
 * @param {object} settings
 *
 * @returns {Promise}
 */
function get(
    path     = '',
    query    = {},
    settings = {}
) {
    return _requestHandler(
        path,
        {
            method: 'GET',
            query : query,
            ...settings,
        }
    );
};

/**
 * Request POST
 *
 * @param {string} path
 * @param {object} query
 * @param {object} body
 * @param {object} settings
 *
 * @returns {Promise}
 */
function post(
    path     = '',
    query    = {},
    body     = {},
    settings = {}
) {
    return _requestHandler(
        path,
        {
            method: 'POST',
            query : query,
            body  : body,
            ...settings,
        }
    );
};

/**
 * Request PUT
 *
 * @param {string} path
 * @param {object} query
 * @param {object} body
 * @param {object} settings
 *
 * @returns {Promise}
 */
function put(
    path     = '',
    query    = {},
    body     = {},
    settings = {}
) {
    return _requestHandler(
        path,
        {
            method: 'PUT',
            query : query,
            body  : body,
            ...settings,
        }
    );
};

/**
 * Request DELETE
 *
 * @param {string} path
 * @param {object} query
 * @param {object} body
 * @param {object} settings
 *
 * @returns {Promise}
 */
function del(
    path     = '',
    query    = {},
    body     = {},
    settings = {}
) {
    return _requestHandler(
        path,
        {
            method: 'DELETE',
            query : query,
            body  : body,
            ...settings,
        }
    );
};

/**
 * Request JSONP
 *
 * @param {string} path
 * @param {object} query
 * @param {object} body
 * @param {object} settings
 *
 * @returns {Promise}
 */
function jsonp(
    path     = '',
    query    = {},
    body     = {},
    settings = {}
) {
    return _requestHandler(
        path,
        {
            method: 'JSONP',
            query : query,
            body  : body,
            ...settings,
        }
    );
};

/**
 * Exporting
 */
export {
    _requestHandler as default,
    get,
    post,
    put,
    del,
    jsonp,
    setURL,
    getURL,
}
