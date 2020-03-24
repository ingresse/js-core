/**
 * Core Packages
 */
import { js } from '@ingresse/injector';

/**
 * Local values
 */
const prefix = 'trackers:gtag:';

/**
 * Google Analytics
 */
let gtag = {
    key: '',
};

/**
 * Library status verification
 *
 * @returns {boolean}
 */
gtag.running = function() {
    try {
        return (typeof window.gtag === 'function');
    } catch (e) {
        return false;
    }
}

/**
 * Initializer
 *
 * @param {object} options
 *
 * @param {object}
 */
gtag.init = function(options) {
    return new Promise((resolve, reject) => {
        const {
            key     = '',
            id      = 'gtag-sdk',
            target  = 'head',
            src     = '',
            content = '',
            onload  = undefined,
            onerror = undefined,
            delay   = 5000,
            ...rest
        } = (options || {});

        if (!key) {
            return reject({
                code   : -1,
                message: `${prefix}missing-key-param`,
            });
        }

        if (key && (key === gtag.key)) {
            return resolve();
        }

        const _src = (src || `https://www.googletagmanager.com/gtag/js?id=${key}`);

        /**
         * Error handler
         *
         * @param {object} evt
         */
        function handleError(evt) {
            reject({
                code   : -1,
                message: `${prefix}initialize-error`,
                details: (evt || `injection delay of ${delay}ms exceeded`),
            });

            if (typeof onerror === 'function') {
                onerror(evt);
            }
        }

        /**
         * Timeout
         */
        const timeout = setTimeout(() => {
            handleError();
        }, delay);

        /**
         * Load handler
         *
         * @param {object} evt
         */
        function handleLoad(evt) {
            clearTimeout(timeout);

            gtag = Object.assign(gtag, {
                key: key,
            });

            if (typeof onload === 'function') {
                onload(evt);
            }

            resolve(gtag);
        }

        /**
         * Injection
         */
        js({
            id,
            target,
            async  : true,
            src    : _src,
            onload : handleLoad,
            onerror: handleError,
            ...(rest || {}),
        })
        .catch(handleError);

        js({
            target,
            id     : `${id}-init`,
            content: `
window.dataLayer = (window.dataLayer || []);

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', '${key}');

${content}
            `.trim(),
        })
        .catch(handleError);
    });
}

/**
 * Lib Trigger
 *
 * @param {any} [arg1]
 * @param {any} [arg2]
 * @param {any} [arg3]
 * @param {any} [arg4]
 *
 * @returns {Promise}
 */
gtag.trigger = function(
    arg1,
    arg2,
    arg3,
    arg4
) {
    return new Promise((resolve, reject) => {
        if (!gtag.running()) {
            return resolve({
                code   : -1,
                message: `${prefix}not-running`,
            });
        }

        try {
            window.gtag(arg1, arg2, arg3, arg4);

        } catch (error) {
            reject({
                code   : -1,
                message: `${prefix}trigger-error`,
                details: error,
            });
        }
    });
}

/**
 * Exporting
 */
export default gtag;
