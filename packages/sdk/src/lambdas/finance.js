/**
 * Base
 */
import {
    get,
    generic,
} from '../request/request.js';

/**
 * Get Lambda Default Settings
 *
 * @param {object} settings
 *
 * @returns {object}
 */
function defaultSettings(settings = {}) {
    const {
        financeKey,
    } = options.get();
    const {
        headers: originalHeaders,
    } = settings;

    const headers = (!originalHeaders && !financeKey) ? {} : {
        ...(originalHeaders || {}),
        ...(!financeKey ? {} : {
            'X-Api-Key': financeKey,
        }),
    };

    return {
        microservice: 'finance',
        headers,
        ...settings,
    };
}

/**
 * Generic Lambda Requests
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
 * User Producers
 * Get User's Producers Agency List
 *
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function producers(
    query,
    settings
) {
    return get(
        '/my-producers',
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const finance = {
    defaultSettings,
    request,

    producers,
};

/**
 * Exporting
 */
export default finance;
