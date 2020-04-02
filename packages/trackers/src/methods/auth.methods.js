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
 * @param {string} email - user email
 *
 * @returns {boolean}
 */
function loginError(email) {
    if (!email) {
        return false;
    }

    return legiti('trackLogin', email);
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

    const _successGtag   = gtag('event', 'login', toGtag);
    const _successLegiti = legiti('trackLogin', email, userId);

    return (_successGtag || _successLegiti);
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

    return legiti('trackLogout', email, userId);
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
    const _successLegiti = legiti('trackUserCreation', userId);

    return (
        _successFbq ||
        _successGtag ||
        _successLegiti
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
