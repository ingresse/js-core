/**
 * Base
 */
import {
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
        microservice    : 'shop',
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
 * Reference
 */
const shop = {
    defaultSettings,
    request,
};

/**
 * Exporting
 */
export default shop;
