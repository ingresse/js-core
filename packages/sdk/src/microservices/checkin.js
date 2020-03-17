/**
 * Base
 */
import {
    get,
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
    report,
};

/**
 * Exporting
 */
export default checkin;
