/**
 * Base
 */
import { get } from '../request/request.js';

/**
 * Entrance List
 *
 * @param {string} eventId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function list(
    eventId,
    query,
    settings
) {
    return get(`/event/${eventId}/guestlist`, query, settings);
}

/**
 * Entrance Report
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
    return list(
        eventId,
        {
            method: 'report',
            ...query,
        },
        settings
    );
}

/**
 * Reference
 */
const entrance = {
    list,
    report,
};

/**
 * Exporting
 */
export default entrance;
