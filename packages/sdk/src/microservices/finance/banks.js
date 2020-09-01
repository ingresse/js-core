/**
 * Base
 */
import { get } from '../../request/request.js';
import { defaultSettings } from './base.js';

/**
 * Get Full Banks List
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
        '/banks',
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const banks = {
    defaultSettings,

    list
};

/**
 * Exporting
 */
export default banks;