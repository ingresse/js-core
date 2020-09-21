/**
 * Base
 */
import options from '../../options';
import { generic } from '../../request/request.js';

/**
 * Get Lambda Default Settings
 *
 * @param {object} settings
 *
 * @returns {object}
 */
export function defaultSettings(settings = {}) {
    const { scoreKey } = options.get();
    const { headers: originalHeaders } = settings;
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
export function request(path, settings) {
    return generic(path, defaultSettings(settings));
}
