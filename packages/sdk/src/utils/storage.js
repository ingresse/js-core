/**
/**
 * Get Storage Key
 *
 * @param {string} key
 *
 * @return {string}
 */
function getKey(key = '') {
    const _getKeyRef = require('./key.js');
    const _getKey    = _getKeyRef();

    return _getKey(key || '');
}

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
    const _key   = getKey(key);
    const exists = get(_key);

    if (!exists) {
        return false;
    }

    localStorage.removeItem(_key);

    return true;
}

/**
 * Exporting
 */
module.exports = {
    get,
    set,
    remove,
};
