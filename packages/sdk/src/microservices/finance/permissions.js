/**
 * Base
 */
import { get } from '../../request/request.js';
import { defaultSettings } from './base.js';

/**
 * Get finance team.
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
        '/finance-team',
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const permissions = {
    defaultSettings,

    list
};

/**
 * Exporting
 */
export default permissions;
