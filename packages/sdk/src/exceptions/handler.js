/**
 * Helper
 */
import translator from './translator.js';

/**
 * Error handler
 *
 * @param {object} error
 *
 * @returns {Promise}
 */
function handler(error) {
    return new Promise((resolve) => {
        const {
            code      : originalCode,
            message   : originalMessage,
            status    : originalStatus,
            statusText: originalStatusText,
        } = (error || {});
        let simple = {
            ...(error || {}),
            status  : originalStatus,
            original: (originalMessage || originalStatusText || ''),
            message : translator((originalCode || originalStatus), (originalMessage || originalStatusText)),
        };

        if ((typeof error !== 'object') ||
            (typeof error.json !== 'function')) {
            return resolve(simple);
        }

        error
        .json()
        .then((details) => {
            const {
                code,
                message,
                statusText,
            } = (details || {});

            resolve({
                ...simple,
                ...(details || {}),
                status  : originalStatus,
                original: (message || originalMessage || originalStatusText || ''),
                message : translator(
                    (code || originalCode || originalStatus),
                    (message || statusText || originalMessage || originalStatusText)
                ),
            });
        })
        .catch((err) => {
            resolve({
                ...(err || {}),
                ...simple,
            });
        });
    });
}

/**
 * Exporting
 */
export default handler;
