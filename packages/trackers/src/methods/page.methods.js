/**
 * Triggers
 */
import {
    fbq,
    legiti,
} from '../triggers';

/**
 * Page View
 *
 * @param {string} [path]
 *
 * @returns {Promise}
 */
function view(path = window.location.pathname) {
    return new Promise((resolve, reject) => {
        try {
            let promises = [];

            promises.push(fbq('track', 'PageView'));
            promises.push(legiti('trackPageView', path));

            Promise
            .all(promises)
            .then(resolve)
            .catch(reject);

        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Exporting
 */
export const page = {
    view,
};
