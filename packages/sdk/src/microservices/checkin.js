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
        microservice    : 'checkin',
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
 * Checkin Microservice report
 *
 * @param {string} eventId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function report(
    eventId,
    query,
    settings
) {
    return get(
        `/report/${eventId}/entrance`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const checkin = {
    defaultSettings,
    request,

    report,
};

/**
 * Exporting
 */
export default checkin;
