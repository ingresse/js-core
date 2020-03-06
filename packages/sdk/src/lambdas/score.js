/**
 * Base
 */
import options from '../options';
import {
    get as getter,
} from '../request/request.js';

/**
 * Get Microservice Default Settings
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
 * Fraud Score API Getter
 *
 * @param {string} id - User's ID
 * @param {object} query
 * @param {object} settings
 *
 * @returns {Promise}
 */
function get(
    id,
    query,
    settings
) {
    return getter(
        `/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const score = {
    get,
};

/**
 * Exporting
 */
export default score;
