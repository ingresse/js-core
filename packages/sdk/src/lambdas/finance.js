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
        microservice: 'finance',
        ...settings,
    };
}

/**
 * User Producers
 * Get User's Producers Agency List
 *
 * @param {object} query
 * @param {object} settings
 *
 * @returns {Promise}
 */
function producers(
    query,
    settings
) {
    return getter(
        '/my-producers',
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const finance = {
    producers,
};

/**
 * Exporting
 */
export default finance;
