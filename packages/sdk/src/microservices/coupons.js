/**
 * Base
 */
import {
    get,
    generic,
} from '../request/request.js';

/**
 * Get Microservice Default Settings
 *
 * @param {object} settings
 *
 * @returns {object}
 */
function defaultSettings(settings = {}) {
    return {
        microservice    : 'coupon',
        withoutApiKey   : true,
        withoutUserToken: true,
        ...settings,
    };
}

/**
 * Generic MS Requests
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
 *
 */
function list(
    query,
    settings
) {
    return get(
        '/coupons',
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const coupons = {
    defaultSettings,
    request,

    list,
};

/**
 * Exporting
 */
export default coupons;
