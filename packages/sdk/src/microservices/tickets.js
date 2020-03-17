/**
 * Base
 */
import {
    get as getter,
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
        microservice: 'ticket',
        ...settings,
    };
}

/**
 * Tickets Microservice Getter
 *
 * @param {string} event - Event ID
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function list(
    eventId,
    query = {},
    settings
) {
    return new Promise((resolve, reject) => {
        if (!eventId) {
            return reject({
                code   : -1,
                message: 'Tickets | GET: Missing Event ID',
            });
        }

        getter(
            '/items',
            {
                ...query,
                eventId,
                pageSize: (query.pageSize || 10),
            },
            defaultSettings(settings)
        )
        .then(resolve)
        .catch(resolve);
    });
}

/**
 * Tickets Microservice Getter Details
 *
 * @param {string} id - Ticket ID
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function details(
    id,
    query,
    settings
) {
    return getter(
        `/items/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const tickets = {
    list,
    details,
};

/**
 * Exporting
 */
export default tickets;
