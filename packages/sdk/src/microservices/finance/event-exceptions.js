/**
 * Base
 */
import { get, post, put } from '../../request/request.js';
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
 * Get Event Exception Details
 *
 * @param {object} producerId
 * @param {object} eventId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function details(producerId, eventId, query, settings = {}) {
    return get(
        `/event-exceptions/${producerId}/event/${eventId}`,
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
 * Update Event Exception
 *
 * @param {object} producerId
 * @param {object} eventId
 * @param {object} body
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function update(producerId, eventId, body, query, settings = {}) {
    return put(
        `/event-exceptions/${producerId}/event/${eventId}`,
        body,
        query,
        defaultSettings(settings)
    );
}

/**
 * Get transfer value for event.
 *
 * @param {object} producerId
 * @param {object} eventId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function summary(producerId, eventId, query, settings = {}) {
    return get(
        `/event-exceptions/${producerId}/event/${eventId}/transfers`,
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
    details,
    list,
    update,
    summary
};

/**
 * Exporting
 */
export default eventExceptions;
