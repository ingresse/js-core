/**
 * Core Packages
 */
import injector, { js } from '@ingresse/injector';

/**
 * Local values
 */
const prefix = 'trackers:fbq:';

/**
 * Facebook Pixel
 */
let fbq = {
    key: '',
};

/**
 * Library status verification
 *
 * @returns {boolean}
 */
fbq.running = function() {
    try {
        return (typeof window.fbq === 'function');
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
fbq.init = function(options) {
    return new Promise((resolve, reject) => {
        const {
            key     = '',
            id      = 'fbq-sdk',
            target  = 'head',
            delay   = 5000,
            version = '2.0',
            ...rest
        } = (options || {});

        if (!key) {
            return reject({
                code   : -1,
                message: `${prefix}missing-key-param`,
            });
        }

        if (key && (key === fbq.key)) {
            return resolve();
        }

        const content = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='${version}';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '${key}');
fbq('track', 'PageView');
        `.trim();

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

            /**
             * Injection Fallback
             */
            try {
                let img    = document.createElement('img');
                img.width  = 1;
                img.height = 1;
                img.style  = 'display:none';
                img.src    = `https://www.facebook.com/tr?id=${key}&ev=PageView&noscript=1`;

                injector({
                    id     : `${id}-noscript`,
                    tag    : 'noscript',
                    target : 'head',
                    content: 'fbq',
                })
                .then((noscript) => {
                    noscript.append(img);
                })
                .catch((error) => {
                    console.warn(prefix.concat('noscript'), error);
                });
            } catch (error) {
                console.warn(prefix.concat('noscript'), error);
            }
        }, delay);

        /**
         * Load handler
         */
        function handleLoad() {
            clearTimeout(timeout);

            fbq = Object.assign(fbq, {
                key: key,
            });

            resolve(fbq);
        }

        /**
         * Injection
         */
        js({
            id,
            target,
            content,
        })
        .then(() => {
            handleLoad();
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
fbq.trigger = function(
    arg1,
    arg2,
    arg3,
    arg4
) {
    return new Promise((resolve, reject) => {
        if (!fbq.running()) {
            return resolve({
                code   : -1,
                message: `${prefix}not-running`,
            });
        }

        try {
            window.fbq(arg1, arg2, arg3, arg4);

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
export default fbq;
