/**
 * Base
 */
import options from '../options.js';

/**
 * Application storage prefix key
 *
 * @param {string} key
 *
 * @return {string} full key
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
        (!env ? '' : (junction + env)) +
        ((!appName && !company) ? '' : (junction + (appName || company))) +
        junction +
        _key
    );
}

/**
 * Exporting
 */
export default keyBuilder;
