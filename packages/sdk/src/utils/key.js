import options from '../options.js'

/**
 * Get storage full key
 *
 * @param {string} key
 *
 * @return {string} full key
 */
function _getKey(key = '') {
    const _key       = (key || '').toString();

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
export default _getKey;
