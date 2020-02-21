import options from '../options.js';

/**
 * Messages Translations
 *
 * @param {string} msgKey
 * @param {string} msgContent - optional
 *
 * @return {string} message
 */
function translator(msgKey = '', msgContent = '') {
    const {
        locale,
        messages,
    } = options;
    let language = {
        ...(messages || {}),
    };

    try {
        const fromSDK = require(`./${locale}.js`);
        language      = {
            ...fromSDK,
            ...language,
        };

    } catch (e) {}

    return (language[msgKey] || msgContent);
}

/**
 * Exporting
 */
export default translator;
