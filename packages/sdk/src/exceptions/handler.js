/**
 * Helper
 */
import translator from './translator.js';

/**
 * Error handler
 *
 * @param {object}   error
 *
 * @param {object} adapted error
 */
function handler(error) {
    const {
        code,
        message,
    } = (error || {});

    return {
        ...(error || {}),
        original: (message || ''),
        message : translator(code, message),
    };
}

/**
 * Exporting
 */
export default handler;
