/**
 * Base
 */
import { get as getter } from '../../request/request.js';
import { defaultSettings, request } from './base.js';

/**
 * Fraud Score API Getter
 *
 * @param {string} userId - User's ID
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function get(
    userId,
    query,
    settings
) {
    return getter(
        `/${userId}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const score = {
    defaultSettings,
    request,

    get,
};

/**
 * Exporting
 */
export default score;
