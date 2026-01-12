/**
 * Triggers
 */
import {
    fbq,
    gtag,
} from '../triggers';

/**
 * Authentication Login Error
 *
 * @param {string} email - user email
 *
 * @returns {boolean}
 */
function loginError(email) {
    if (!email) {
        return false;
    }

    return false;
}

/**
 * Authentication Login Success
 *
 * @param {string} email
 * @param {string} userId
 *
 * @returns {boolean}
 */
function login(email, userId) {
    if (!email || !userId) {
        return false;
    }

    const toGtag = {
        method: 'Ingresse',
    };

    return gtag('event', 'login', toGtag);
}

/**
 * Authentication Logout
 *
 * @param {string} email  - user email
 * @param {string} userId - user id
 *
 * @returns {boolean}
 */
function logout(email, userId) {
    if (!email || !userId) {
        return false;
    }

    return false;
}

/**
 * Authentication Register
 *
 * @param {string} email
 * @param {string} userId
 *
 * @returns {boolean}
 */
function register(email, userId) {
    if (!email || !userId) {
        return false;
    }

    const toGtag = {
        email,
        userId,
    };

    const _successFbq    = fbq('track', 'CompleteRegistration');
    const _successGtag   = gtag('event', 'sign_up', toGtag);

    return (
        _successFbq ||
        _successGtag
    );
}

/**
 * Exporting
 */
export const auth = {
    login,
    loginSuccess: login,
    loginError,
    logout,
    register,
};
