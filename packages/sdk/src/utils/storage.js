/**
 * Base
 */
import { keyBuilder } from './key.js';
import { date } from './date.js';

/**
 * Remove Item
 *
 * @param {string} key
 *
 * @param {boolean} operation status
 */
function remove(key = '') {
    localStorage.removeItem(
        keyBuilder(key)
    );

    return true;
}

/**
 * Get storage item
 *
 * @param {string} key
 *
 * @returns {any}
 */
function get(key = '') {
    if (!key) {
        return null;
    }

    const _key                    = keyBuilder(key);
    const inCache                 = JSON.parse(localStorage.getItem(_key));
    const { content, validUntil } = (inCache || {});
    const notPresent              = typeof content === 'undefined';
    const notValid                = !!(validUntil && date().isAfter(date(validUntil)));

    if (notPresent || notValid) {
      localStorage.removeItem(_key);

      return undefined;
    }

    return content;
}

/**
 * Set storage item
 *
 * @param {string} key
 * @param {any} content
 *
 * @returns {boolean} operation status
 */
function set(key = '', content = null, validTime, validUnit = 'days') {
    const _key       = keyBuilder(key);
    const validUntil = ((typeof validTime !== 'number') ? '' : date().add(validTime, validUnit).format());
    const toStorage  = {
      content,
      validUntil,
    };

    if (!_key || !content) {
        return false;
    }

    localStorage.setItem(
        _key,
        JSON.stringify(toStorage)
    );

    return true;
}

/**
 * Clear all items
 *
 * @returns {boolean} operation status
 */
function clear() {
    localStorage.clear();

    return true;
}

/**
 * Reference
 */
export const storage = {
    get,
    set,
    remove,
    clear,
};
