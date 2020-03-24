/**
 * Core Packages
 */
import { js } from '@ingresse/injector';

/**
 * Local values
 */
const prefix = 'trackers:legiti:';

/**
 * Legiti Anti-Fraud
 */
let legiti = {
    key: '',
};

/**
 * Library status verification
 *
 * @returns {boolean}
 */
legiti.running = function() {
    try {
        return window.legiti.sharedInstance().isConfigured();
    } catch (e) {
        return false;
    }
}

/**
 * Initializer
 *
 * @param {object}  options
 * @param {boolean} [sandboxMode]
 *
 * @returns {Promise}
 */
legiti.init = function(options, sandboxMode) {
    return new Promise((resolve, reject) => {
        const {
            id      = 'legiti-sdk',
            target  = 'head',
            src     = 'https://files.lgtcdn.net/legiti-js/v1/legiti.min.js',
            onload  = undefined,
            onerror = undefined,
            delay   = 10000,
            ...rest
        } = (options || {});
        const key = ((sandboxMode ? options.keySandbox : options.key) || options.key || '');

        if (!key) {
            return reject({
                code   : -1,
                message: `${prefix}missing-key-param`,
            });
        }

        /**
         * Error handler
         *
         * @param {object} [evt]
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
         * Load handler
         *
         * @param {object} evt
         */
        function handleLoad(evt) {
            try {
                legiti.key = key;

                window
                .legiti
                .sharedInstance()
                .setup(key, false);

                resolve(evt);

                if (typeof onload === 'function') {
                    onload(evt);
                }

            } catch(e) {
                handleError(e);
            }
        }

        /**
         * Injection
         */
        js({
            id,
            target,
            src    : src,
            onload : handleLoad,
            onerror: handleError,
            ...(rest || {}),
        });

        /**
         * Injection timeout
         */
        if (!legiti.key) {
            setTimeout(() => {
                if (legiti.key) {
                    return;
                }

                handleError();
            }, delay);
        }
    });
}

/**
 * Lib Trigger
 *
 * @param {string} method
 * @param {any}    [arg1]
 * @param {any}    [arg2]
 * @param {any}    [arg3]
 *
 * @returns {Promise}
 */
legiti.trigger = function(
    method,
    arg1,
    arg2,
    arg3
) {
    return new Promise((resolve, reject) => {
        if (!legiti.running()) {
            return resolve({
                code   : -1,
                message: `${prefix}not-running`,
            });
        }

        try {
            resolve(
                window
                .legiti
                .sharedInstance()
                [method](arg1, arg2, arg3)
            );

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
export default legiti;
