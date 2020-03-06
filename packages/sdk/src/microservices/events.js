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
        microservice: 'event',
        ...settings,
    };
}

/**
 * Event Microservice Getter
 *
 * @param {string} id - Event ID
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function get(
    id,
    query,
    settings
) {
    return getter(
        `/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const events = {
    get,
};

/**
 * Exporting
 */
export default events;
