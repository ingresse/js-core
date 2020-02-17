/**
 * Error handler
 *
 * @param {object}   error
 *
 * @param {object} adapted error
 */
function handler(error) {
    const translator = require('./translator.js');
    const {
        code,
        message,
    } = (error || {});

    return {
        ...(error || {}),
        original: message,
        message : translator(code, message),
    };
}

/**
 * Exporting
 */
module.exports = handler;
