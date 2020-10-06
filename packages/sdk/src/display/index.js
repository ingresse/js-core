/**
 * Base
 */
import options from '../options.js';

/**
 * Display Format
 *
 * @param {string} property
 *
 * @returns {string} message
 */
function display(property = '') {
    const {
        locale,
        messages,
        display,
    } = options.get();
    let language = {
        ...(messages || {}),
        ...(display || {}),
    };

    try {
        const fromSDK = require(`./${locale}.js`);
        language      = {
            ...fromSDK,
            ...language,
        };

    } catch (e) {}

    return (language[property]);
}

/**
 * Exporting
 */
export default display;
