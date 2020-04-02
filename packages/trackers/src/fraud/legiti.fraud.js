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
 * @param {object|string} optionsOrKey
 *
 * @returns {Promise}
 */
legiti.init = function(optionsOrKey) {
    return new Promise((resolve, reject) => {
        let options = {
            key    : '',
            id     : 'legiti-js',
            target : 'head',
            delay  : 10000,
            onload : undefined,
            onerror: undefined,
            src    : 'https://files.lgtcdn.net/legiti-js/v1/legiti.min.js',
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
            async  : 1,
            src    : src,
            onload : handleLoad,
            onerror: handleError,
            ...rest
        });
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
 * @returns {boolean}
 */
legiti.trigger = function(method, arg1, arg2, arg3) {
    if (!legiti.running()) {
        return false;
    }

    try {
        window
        .legiti
        .sharedInstance()
        [method](arg1, arg2, arg3);

        return true;

    } catch (error) {
        console.error('JS Trackers Legiti trigger error', error);

        return false;
    }
}

/**
 * Exporting
 */
export default legiti;
