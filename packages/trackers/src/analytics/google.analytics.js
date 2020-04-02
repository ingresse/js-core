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
 * @param {object|string} optionsOrKey
 *
 * @param {object}
 */
gtag.init = function(optionsOrKey) {
    return new Promise((resolve, reject) => {
        let options = {
            key    : '',
            id     : 'gtag-js',
            target : 'head',
            delay  : 5000,
            onload : undefined,
            onerror: undefined,
            src    : '',
            content: '',
        };

        if (optionsOrKey) {
            if (typeof optionsOrKey === 'string') {
                options.key = optionsOrKey;
            }

            if (typeof optionsOrKey === 'object') {
                options = {
                    ...options,
                    ...optionsOrKey,
                };
            }
        }

        const {
            key,
            id,
            target,
            src,
            content,
            delay,
            onload,
            onerror,
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
         * Injection timeout
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

            gtag.key = key;

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

        /**
         * Injection: Initializer
         */
        const _content = `window.dataLayer=(window.dataLayer||[]);function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${key}');${content}`;

        js({
            target,
            id     : `${id}-init`,
            content: _content,
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
 *
 * @returns {boolean}
 */
gtag.trigger = function(arg1, arg2, arg3) {
    if (!gtag.running()) {
        return false;
    }

    window.gtag(arg1, arg2, arg3);

    return true;
}

/**
 * Exporting
 */
export default gtag;
