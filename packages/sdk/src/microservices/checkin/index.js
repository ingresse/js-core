/**
 * Base
 */
import { get } from '../../request/request.js';
import { defaultSettings, request } from './base.js';

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
