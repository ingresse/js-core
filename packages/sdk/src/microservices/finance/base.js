/**
 * Base
 */
import { generic } from '../../request/request.js';

/**
 * Get Microservice Default Settings
 *
 * @param {object} settings
 *
 * @returns {object}
 */
export function defaultSettings(settings = {}) {
    return {
        microservice: 'finance',
        withoutApiKey: true,
        withoutUserToken: true,
        ...settings,
    };
}

/**
 * Generic MS Requests
 *
 * @param {string} path
 * @param {object} settings
 *
 * @returns {Promise}
 */
export function request(path, settings) {
    return generic(path, defaultSettings(settings));
}
