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
import { envURLBuilder, objectValidator } from '../utils';

/**
 * Helpers
 */
import errorHandler from '../exceptions/handler.js';

/**
 * Adapters
 */
import * as adapters from '../adapters';

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
 * @param {string}  path
 * @param {object}  settings
 * @param {boolean} retry
 *
 * @returns {Promise}
 */
function _requestHandler(
    path     = '',
    settings = {},
    retry    = false
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
            withAdapter,
            withoutApiKey,
            withoutUserToken,
            ...rest
        } = (settings || {});

        let reqQuery = objectValidator({
            ...(authQuery || {}),
            ...(query || {})
        });

        if (withoutApiKey) {
            delete reqQuery.apikey;
        }

        if (withoutUserToken) {
            delete reqQuery.usertoken;
        }

        const reqUrl      = _requestURL(path, reqQuery, microservice);
        const reqHeaders  = {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            ...(authHeader || {}),
            ...(headers || {})
        };
        const reqSettings = {
            headers: reqHeaders,
            mode   : 'cors',
            cache  : 'default',
            ...rest
        };

        /**
         * Renew user token and retry the same original request
         */
        function _renewAndRetry(exception) {
            _requestHandler('/login/renew-token', {
                headers: {
                    method: 'GET',
                }
            }, true)
            .then((response) => {
                const { authToken } = (response || {});

                if (!authToken) {
                    reject(exception);

                    return;
                }

                credentials.set('jwt', authToken);

                _requestHandler(path, settings, true)
                .then(resolve)
                .catch(reject);
            })
            .catch(reject);
        }

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

                errorHandler({
                    ...(response || {}),
                    ...(responseError || {
                        code   : (code || -1),
                        message: (message || messageData || ''),
                    }),
                })
                .then(reject)
                .catch(reject);

                return;
            }

            const isAdapterFunc         = (typeof withAdapter === 'function');
            const isAdapterName         = (typeof withAdapter === 'string');
            const adapterNameSplitted   = (!isAdapterName ? [] : withAdapter.split('.'));
            const adapterModuleName     = adapterNameSplitted[0];
            const adapterModuleFuncName = adapterNameSplitted[1];
            const adapterRef            = (isAdapterFunc ? withAdapter : (
                adapters[withAdapter] || (
                    (adapters[adapterModuleName] && adapters[adapterModuleName][adapterModuleFuncName]) ? 
                        adapters[adapterModuleName][adapterModuleFuncName] : null
                )
            ));

            if (typeof adapterRef === 'function') {
                return resolve(adapterRef(responseData || response));
            }

            resolve(responseData || response);
        })
        .catch((error) => {
            errorHandler(error)
            .then((exception) => {
                const { status, code } = (exception || {});
                const shouldRenew      = !!(!retry && authQuery.usertoken && (
                    (code === 6065) || (status === 401)
                ));

                if (shouldRenew) {
                    return _renewAndRetry(exception);
                }

                reject(exception);
            })
            .catch(reject);
        });
    });
}

/**
 * Request GET
 *
 * @param {string} path
 * @param {object} [query]
 * @param {object} [settings]
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
}

/**
 * Request POST
 *
 * @param {string} path
 * @param {object} body
 * @param {object} query
 * @param {object} settings
 *
 * @returns {Promise}
 */
function post(
    path     = '',
    body     = {},
    query    = {},
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
}

/**
 * Request PUT
 *
 * @param {string} path
 * @param {object} body
 * @param {object} query
 * @param {object} settings
 *
 * @returns {Promise}
 */
function put(
    path     = '',
    body     = {},
    query    = {},
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
}

/**
 * Request DELETE
 *
 * @param {string} path
 * @param {object} query
 * @param {object} settings
 * @param {object} body
 *
 * @returns {Promise}
 */
function del(
    path     = '',
    query    = {},
    settings = {},
    body     = {}
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
}

/**
 * Request JSONP
 *
 * @param {string} path
 * @param {object} body
 * @param {object} query
 * @param {object} settings
 *
 * @returns {Promise}
 */
function jsonp(
    path     = '',
    body     = {},
    query    = {},
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
}

/**
 * Generic Requests
 *
 * @param {string} path
 * @param {object} settings
 *
 * @returns {Promise}
 */
function generic(
    path     = '',
    settings = {}
) {
    return _requestHandler(
        path,
        settings
    );
}

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
    generic,
}
