/**
 * Base
 */
import options from '../options';
import { generic } from '../request/request.js';

/**
 * Get Lambda Default Settings
 *
 * @param {object} settings
 *
 * @returns {object}
 */
function defaultSettings(settings = {}) {
    const {
        scoreKey,
    } = options.get();
    const {
        headers: originalHeaders,
    } = settings;

    const headers = (!originalHeaders && !scoreKey) ? {} : {
        ...(originalHeaders || {}),
        ...(!scoreKey ? {} : {
            'Authorization': `Basic ${scoreKey}`,
        }),
    };

    return {
        microservice: 'beta-score',
        headers,
        ...settings,
    };
}

/**
 * Generic Lambda Requests
 *
 * @param {string} path
 * @param {object} settings
 *
 * @returns {Promise}
 */
function request(
    path,
    settings
) {
    return generic(path, defaultSettings(settings));
}

/**
 * Fraud Score API Getter
 *
 * @param {string} userId - User's ID
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function _get(
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

    get: _get,
};

/**
 * Exporting
 */
export default score;
