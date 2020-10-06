/**
 * Base
 */
import { get, post } from '../../request/request.js';
import { defaultSettings } from './base.js';

/**
 * Create Event Exception to Producer
 *
 * @param {object} producerId
 * @param {object} eventId
 * @param {object} body
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function create(producerId, eventId, body, query, settings = {}) {
    return post(
        `/event-exceptions/${producerId}/event/${eventId}`,
        body,
        query,
        defaultSettings(settings)
    );
}

/**
 * List all event negotiation exceptions.
 *
 * @param {number} producerId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function list(producerId, query, settings = {}) {
    return get(
        `/event-exceptions/${producerId}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const eventExceptions = {
    defaultSettings,

    create,
    list
};

/**
 * Exporting
 */
export default eventExceptions;
