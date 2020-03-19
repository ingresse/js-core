/**
 * Base
 */
import options from '../options';
import {
    get,
    post,
    generic,
} from '../request/request.js';

/**
 * Get Lambda Default Settings
 *
 * @param {object} settings
 *
 * @returns {object}
 */
function defaultSettings(settings = {}) {
    const {
        purchasesKey,
    } = options.get();
    const {
        headers: originalHeaders,
    } = settings;

    const headers = (!originalHeaders && !purchasesKey) ? {} : {
        ...(originalHeaders || {}),
        ...(!purchasesKey ? {} : {
            'X-Api-Key': purchasesKey,
        }),
    };

    return {
        microservice: 'my-transactions',
        headers,
        ...settings,
    };
}

/**
 * Generic Lambda Requests
 *
 * @param {string} path
 * @param {object} settings
 *
 * @returns {Promise}
 */
function request(
    path,
    settings
) {
    return generic(path, defaultSettings(settings));
}

/**
 * Purchases API Getter
 * Get User's Transactions/Purchases based on `authToken`
 *
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function _get(
    query,
    settings
) {
    return get(
        '/',
        query,
        defaultSettings(settings)
    );
}

/**
 * Purchase Refund
 *
 * @param {string} tid - Transaction ID be refunded
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function refund(
    tid,
    body     = {},
    query    = {},
    settings = {}
) {
    return post(
        `/${tid}/refund`,
        body,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const purchases = {
    defaultSettings,
    request,

    get: _get,
    refund,
};

/**
 * Exporting
 */
export default purchases;
