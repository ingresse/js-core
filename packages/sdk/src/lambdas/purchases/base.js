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
    const { purchasesKey } = options.get();
    const { headers: originalHeaders } = settings;
    const headers = (!originalHeaders && !purchasesKey) ? {} : {
        ...(originalHeaders || {}),
        ...(!purchasesKey ? {} : {
            'X-Api-Key': purchasesKey,
        }),
    };

    return {
        microservice: 'my-transactions',
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
