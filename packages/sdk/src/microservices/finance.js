/**
 * Base
 */
import {
    get,
    generic,
} from '../request/request.js';

/**
 * Get Default Settings
 *
 * @param {object} settings
 *
 * @returns {object}
 */
function defaultSettings(settings = {}) {
    return {
        microservice: 'finance',
        withoutApiKey: true,
        withoutUserToken: true,
        ...settings,
    };
}

/**
 * Generic Requests
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
 * Producers
 * Get Producers Agencies List
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
        '/producers',
        query,
        defaultSettings(settings)
    );
}

/**
 * Producer
 * Get Producers Agency Details
 *
 * @param {string} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function producer(
    id,
    query,
    settings
) {
    return get(
        `/producers/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Producers Classification
 * Get Producers Agencies Classification
 *
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function producersClassification(
    query,
    settings
) {
    return get(
        '/producers-classification',
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

    producer,
    producers,
    producersClassification,
};

/**
 * Exporting
 */
export default finance;
