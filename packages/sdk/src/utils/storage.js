/**
 * Base
 */
import getKey from './key.js';

/**
 * Get storage item
 *
 * @param {string} key
 *
 * @param {boolean} operation status
 */
function get(key = '') {
    const _key = getKey(key);

    if (!_key) {
        return null;
    }

    return JSON.parse(
        localStorage.getItem(_key)
    );
}

/**
 * Set storage item
 *
 * @param {string} key
 * @param {any} content
 *
 * @param {boolean} operation status
 */
function set(key = '', content = null) {
    const _key = getKey(key);

    if (!_key || !content) {
        return false;
    }

    localStorage.setItem(
        _key,
        JSON.stringify(content)
    );

    return true;
}

/**
 * Remove Item
 *
 * @param {string} key
 *
 * @param {boolean} operation status
 */
function remove(key = '') {
    localStorage.removeItem(
        getKey(key)
    );

    return true;
}

/**
 * Clear all items
 *
 * @param {boolean} operation status
 */
function clear(key = '') {
    localStorage.clear();

    return true;
}

/**
 * Reference
 */
const storage = {
    get,
    set,
    remove,
    clear,
};

/**
 * Exporting
 */
export default storage;
