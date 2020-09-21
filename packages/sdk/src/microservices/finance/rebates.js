/**
 * Base
 */
import { get } from '../../request/request.js';
import { defaultSettings } from './base.js';

/**
 * Get Rebates Options List
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
        '/rebates',
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const rebates = {
    defaultSettings,

    list
};

/**
 * Exporting
 */
export default rebates;
