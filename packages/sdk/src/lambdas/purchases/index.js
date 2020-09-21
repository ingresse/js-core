/**
 * Base
 */
import { get as getter, post } from '../../request/request.js';
import { defaultSettings, request } from './base.js';

/**
 * Purchases API Getter
 * Get User's Transactions/Purchases based on `authToken`
 *
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function get(
    query,
    settings
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

    get,
    refund,
};

/**
 * Exporting
 */
export default purchases;
