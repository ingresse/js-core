/**
 * Base
 */
import options from '../../options';
import { generic } from '../../request/request.js';

/**
 * Define the initial path with the producer identifier
 *
 * @param {string} producerId
 * @returns {string}
 */
export function producerPath(producerId = '') {
    const _producerId = producerId || options.get('producer') || '';

    return !_producerId ? '' : `/producers/${_producerId}`;
}

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
