/**
 * Core Packages
 */
import { js } from '@ingresse/injector';

/**
 * Inspetor Anti-Fraud
 */
let inspetor = {
    initialized: false,
};


/**
 * Library status verification
 *
 * @return {boolean}
 */
inspetor.running = function() {
    try {
        return window.inspetor.sharedInstance().isConfigured();
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
inspetor.init = function(options, sandboxMode) {
    const {
        id      = 'inspetor-sdk',
        target  = 'body',
        src     = 'https://files.inspcdn.net/inspetor-js/inspetor.min.js',
        onload  = undefined,
        onerror = undefined,
        delay   = 10000,
        ...rest
    } = (options || {});

    return new Promise((resolve, reject) => {
        const key = ((sandboxMode ? options.keySandbox : options.key) || options.key || '');

        if (!key || inspetor.running()) {
            return reject({
                code   : -1,
                message: `inspetor:${(initialized ? 'already-initialized' : 'missing-key-param')}`,
            });
        }

        /**
         * Error handler
         *
         * @param {object} evt
         */
        function handleError(evt) {
            reject({
                code   : -1,
                message: 'inspetor:initialize-error',
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
                window.inspetor.sharedInstance().setup(key, false);

                inspetor = Object.assign(inspetor, {
                    initialized: true,
                    key        : key,
                });

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
        if (!inspetor.initalized) {
            setTimeout(() => {
                if (inspetor.initialized) {
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
export default inspetor;
