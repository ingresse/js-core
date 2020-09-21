/**
 * Base
 */
import { del, get, post, put } from '../../request/request.js';
import { defaultSettings } from './base.js';

/**
 * Create Contract
 *
 * @param {object} contract
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function create(
    contract,
    query,
    settings = {}
) {
    return post(
        '/contracts',
        contract,
        query,
        defaultSettings(settings)
    );
}

/**
 * Create Contract File
 *
 * @param {string} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function createFile(
    id,
    query,
    settings = {}
) {
    return post(
        `/contracts/${id}/file`,
        {},
        query,
        defaultSettings(settings)
    );
}

/**
 * Get Contract Details
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
        `/contracts/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Get Contract File Details
 *
 * @param {string} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function detailsFile(
    id,
    query,
    settings
) {
    return get(
        `/contracts/${id}/file`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Get All Contracts From Producer
 *
 * @param {string} producerId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function list(
    producerId,
    query,
    settings
) {
    return get(
        `/producers/${producerId}/contracts`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Remove Contract
 *
 * @param {string} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function remove(
    id,
    query,
    settings
) {
    return del(
        `/contracts/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Update Contract
 *
 * @param {string} id
 * @param {object} contract
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function update(
    id,
    contract,
    query,
    settings = {}
) {
    return put(
        `/contracts/${id}`,
        contract,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const contracts = {
    defaultSettings,

    create,
    createFile,
    details,
    detailsFile,
    list,
    remove,
    update
};

/**
 * Exporting
 */
export default contracts;
