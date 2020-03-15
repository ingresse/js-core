/**
 * Base
 */
import options from '../options.js';

/**
 * Application storage prefix key
 *
 * @param {string} key
 *
 * @returns {string} full key
 */
function keyBuilder(key = '') {
    const _key = (key || '').toString();

    const {
        env,
        prefix,
        appName,
        company,
        junction,
    } = (options.get() || {});

    return (
        prefix +
        ((!appName && !company) ? '' : (junction + (appName || company))) +
        (!env ? '' : (junction + env)) +
        junction +
        _key
    );
}

/**
 * Exporting
 */
export default keyBuilder;
