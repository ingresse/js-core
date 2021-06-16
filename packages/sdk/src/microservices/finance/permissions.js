/**
 * Base
 */
import { get, post } from '../../request/request.js';
import { defaultSettings } from './base.js';

/**
 * Get finance team.
 *
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function list(query, settings) {
    return get('/finance-team', query, defaultSettings(settings));
}

/**
 * Add team member.
 *
 * @param {object} [profile]
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function add(id, profile, query, settings) {
    return post(
        '/finance-team/' + id,
        profile,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const permissions = {
    defaultSettings,

    add,
    list
};

/**
 * Exporting
 */
export default permissions;
