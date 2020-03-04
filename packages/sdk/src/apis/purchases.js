/**
 * Base
 */
import options from '../options';
import {
    post,
    get as getter,
} from '../request/request.js';

/**
 * Get Microservice Default Settings
 *
 * @param {object} settings
 *
 * @return {object}
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
 * Purchases API Getter
 * Get User's Transactions/Purchases based on `authToken`
 *
 * @param {object} query
 * @param {object} settings
 *
 * @return {Promise}
 */
function get(
    query    = {},
    settings = {}
) {
    return getter(
        '/',
        query,
        defaultSettings(settings)
    );
}

/**
 * Purchase Refund
 *
 * @param {string} tid - Transaction ID be refunded
 * @param {object} query
 * @param {object} settings
 *
 * @return {Promise}
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
    get,
    refund,
};

/**
 * Exporting
 */
export default purchases;
