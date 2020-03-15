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
        status,
        statusText,
    } = (error || {});

    return {
        ...(error || {}),
        original: (message || statusText || ''),
        message : translator((code || status), (message || statusText)),
        status,
    };
}

/**
 * Exporting
 */
export default handler;
