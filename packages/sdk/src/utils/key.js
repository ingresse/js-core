/**
 * Get storage full key
 *
 * @param {string} key
 *
 * @return {string} full key
 */
function _getKey(key = '') {
    const _key       = (key || '').toString();
    const optionsRef = require('../options.js');
    const options    = optionsRef();

    const {
        env,
        prefix,
        company,
        junction,
    } = (options || {});

    return (
        prefix +
        (!env ? '' : (junction + env)) +
        (!company ? '' : (junction + company)) +
        junction +
        _key
    );
}

/**
 * Exporting
 */
module.exports = () => _getKey;
