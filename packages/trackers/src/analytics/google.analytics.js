/**
 * Core Packages
 */
import { js } from '@ingresse/injector';

/**
 * Google Analytics
 */
let gtag = {
    initialized: false,
    ref        : () => {},
};

/**
 * Initializer
 *
 * @param {object} options
 *
 * @param {object}
 */
gtag.init = function(options) {
    const {
        key     = '',
        id      = 'gtag-sdk',
        target  = 'body',
        src     = '',
        content = '',
        onload  = undefined,
        onerror = undefined,
        delay   = 10000,
        ...rest
    } = (options || {});

    return new Promise((resolve, reject) => {
        if (!key || gtag.initialized) {
            return reject({
                code   : -1,
                message: `gtag:${(initialized ? 'already-initialized' : 'missing-key-param')}`,
            });
        }

        const _src = `https://www.googletagmanager.com/gtag/js?id=${key}`;

        /**
         * Load handler
         *
         * @param {object} evt
         */
        function handleLoad(evt) {
            gtag = Object.assign(gtag, {
                initialized: true,
                key        : key,
            });

            if (typeof onload === 'function') {
                onload(evt);
            }

            resolve(gtag);
        }

        /**
         * Error handler
         *
         * @param {object} evt
         */
        function handleError(evt) {
            reject({
                code   : -1,
                message: 'gtag:initialize-error',
                details: (evt || `injection delay of ${delay}ms exceeded`),
            });

            if (typeof onerror === 'function') {
                onerror(evt);
            }
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
            id     : `${id}-init`,
            content: `
                window.dataLayer = (window.dataLayer || []);

                function gtag(){
                    dataLayer.push(arguments);
                }

                gtag('js', new Date());
                gtag('config', '${key}');

                ${content}
            `
        })
        .catch(handleError);

        /**
         * Injection timeout
         */
        if (!gtag.initialized) {
            setTimeout(() => {
                if (gtag.initialized) {
                    return;
                }

                handleError();
            }, delay);
        }
    });
}

/**
 * Exporting
 */
export default gtag;
