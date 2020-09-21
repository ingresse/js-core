/**
 * Base
 */
import { get } from '../../request/request.js';
import { defaultSettings } from './base.js';

/**
 * Get Liquidation Options List
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
        '/liquidation',
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const liquidation = {
    defaultSettings,

    list
};

/**
 * Exporting
 */
export default liquidation;
