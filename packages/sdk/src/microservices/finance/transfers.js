/**
 * Base
 */
 import { finance as financeAdapters } from '../../adapters';
import { get, post, put } from '../../request/request.js';
import { defaultSettings, producerPath } from './base.js';

/**
 * Approve Transfer
 *
 * @param {object} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function approve(id, query, settings = {}) {
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
function create(transfer, query, settings = {}) {
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
function decline(id, reason, query, settings = {}) {
    return put(
        `/transfers/${id}/decline`,
        { reason, status: 'declined' },
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
function details(id, query, settings = {}) {
    return get(
        `/transfers/${id}`,
        query,
        defaultSettings({
            withAdapter: financeAdapters.transfers.details,
            ...settings
        })
    );
}

/**
 * Export Transfers
 *
 * @param {string} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function _export(query, settings = {}) {
    return get(
        `${producerPath()}/export/transfers`,
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
function list(query, settings = {}) {
    const pageSize = (query.pageSize || 50);
    query.pageSize = pageSize;

    return get(
        `${producerPath()}/transfers`,
        query,
        defaultSettings({
            withAdapter: (response) => financeAdapters.transfers.list(response, pageSize),
            ...settings
        })
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
function recipe(id, query, settings = {}) {
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
    export: _export,
    getById: details,
    list,
    recipe
};

/**
 * Exporting
 */
export default transfers;
