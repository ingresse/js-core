/**
 * Messages Translations
 *
 * @param {string} msgKey
 * @param {string} msgContent - optional
 *
 * @return {string} message
 */
function translator(msgKey = '', msgContent = '') {
    const optionsRef = require('../options.js');
    const options    = optionsRef();
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
module.exports = translator;
