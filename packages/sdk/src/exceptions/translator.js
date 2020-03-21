/**
 * Base
 */
import options from '../options.js';

/**
 * Messages Translations
 *
 * @param {string} msgKey
 * @param {string} msgContent - optional
 *
 * @returns {string} message
 */
function translator(msgKey = '', msgContent = '') {
    const {
        locale,
        messages,
        exceptions,
    } = options.get();
    let language = {
        ...(messages || {}),
        ...(exceptions || {}),
    };

    try {
        const fromSDK = require(`./${locale}.js`);
        language      = {
            ...fromSDK,
            ...language,
        };

    } catch (e) {}

    return (language[msgKey] || language[msgContent] || msgContent);
}

/**
 * Exporting
 */
export default translator;
