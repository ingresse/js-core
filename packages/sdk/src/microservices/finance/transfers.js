/**
 * Base
 */
import { get, post, put } from '../../request/request.js';
import { defaultSettings } from './base.js';

/**
 * Approve Transfer
 *
 * @param {object} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function approve(
    id,
    query,
    settings = {}
) {
    return post(
        `/transfers/${id}/approve`,
        {},
        query,
        defaultSettings(settings)
    );
}

/**
 * Create Transfer
 *
 * @param {object} transfer
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function create(
    transfer,
    query,
    settings = {}
) {
    return post(
        '/transfers',
        transfer,
        query,
        defaultSettings(settings)
    );
}

/**
 * Decline Transfer
 *
 * @param {string} id
 * @param {string} reason
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function decline(
    id,
    reason,
    query,
    settings = {}
) {
    return put(
        `/transfers/${id}/decline`,
        reason,
        query,
        defaultSettings(settings)
    );
}

/**
 * Get Transfer Details
 *
 * @param {string} id
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
    return get(
        `/transfers/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Get Transfers List
 *
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function list(
    query,
    settings
) {
    return get(
        '/transfers',
        query,
        defaultSettings(settings)
    );
}

/**
 * Get Transfer Recipe
 *
 * @param {string} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function recipe(
    id,
    query,
    settings
) {
    return get(
        `/transfers/${id}/recipe`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const transfers = {
    defaultSettings,
    
    approve,
    create,
    decline,
    details,
    list,
    recipe
};

/**
 * Exporting
 */
export default transfers;
