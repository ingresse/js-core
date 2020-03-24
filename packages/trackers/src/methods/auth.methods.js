/**
 * Triggers
 */
import {
    fbq,
    gtag,
    legiti,
} from '../triggers';

/**
 * Authentication Login Error
 *
 * @param {object} params
 */
function loginError(params = {}) {
    return new Promise((resolve, reject) => {
        try {
            const { email } = params;

            legiti('trackLogin', email)
            .then(resolve)
            .catch(reject);

        } catch(error) {
            reject(error);
        }
    });
}

/**
 * Authentication Login Success
 *
 * @param {object} params
 */
function loginSuccess(params = {}) {
    return new Promise((resolve, reject) => {
        try {
            let promises = [];
            const { email, userId } = params;

            promises.push(gtag('event', 'login', params));
            promises.push(legiti('trackLogin', email, userId));

            Promise
            .all(promises)
            .then(resolve)
            .catch(reject);

        } catch(error) {
            reject(error);
        }
    });
}

/**
 * Authentication Register
 *
 * @param {object} params
 */
function register(params = {}) {
    return new Promise((resolve, reject) => {
        try {
            let promises = [];
            const { userId } = params;

            promises.push(gtag('event', 'sign_up', params));
            promises.push(legiti('trackUserCreation', userId));

            Promise
            .all(promises)
            .then(resolve)
            .catch(reject);

        } catch(error) {
            reject(error);
        }
    });
}

/**
 * Exporting
 */
export const auth = {
    loginError,
    loginSuccess,
    register,
};
