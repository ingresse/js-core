/**
 * Base
 */
import { del, get, post } from '../../request/request.js';
import { defaultSettings } from './base.js';

/**
 * Create Contract Type
 *
 * @param {object} contractType
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function create(
    contractType,
    query,
    settings = {}
) {
    return post(
        '/contract-types',
        contractType,
        query,
        defaultSettings(settings)
    );
}

/**
 * Get All Contract Types
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
        `/contract-types`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Remove Contract Type
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
        `/contract-types/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const contractTypes = {
    defaultSettings,

    create,
    list,
    remove
};

/**
 * Exporting
 */
export default contractTypes;