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
 * @returns {boolean|object}
 */
function loginError(email) {
    if (!email) {
        return false;
    }

    try {
        return legiti('trackLogin', email);

    } catch (error) {
        return error;
    }
}

/**
 * Authentication Login Success
 *
 * @param {string} email
 * @param {string} userId
 *
 * @returns {boolean|object}
 */
function loginSuccess(email, userId) {
    if (!email || !userId) {
        return false;
    }

    try {
        const toGtag = {
            method: 'Ingresse',
        };

        return (
            gtag('event', 'login', toGtag) ||
            legiti('trackLogin', email, userId)
        );

    } catch (error) {
        return error;
    }
}

/**
 * Authentication Logout
 *
 * @param {string} email  - user email
 * @param {string} userId - user id
 *
 * @returns {boolean|object}
 */
function logout(email, userId) {
    if (!email || !userId) {
        return false;
    }

    try {
        return legiti('trackLogout', email, userId);

    } catch (error) {
        return error;
    }
}

/**
 * Authentication Register
 *
 * @param {string} email
 * @param {string} userId
 *
 * @returns {boolean|object}
 */
function register(email, userId) {
    if (!email || !userId) {
        return false;
    }

    try {
        const toGtag = {
            email,
            userId,
        };

        return (
            fbq('track', 'CompleteRegistration') ||
            gtag('event', 'sign_up', toGtag) ||
            legiti('trackUserCreation', userId)
        );

    } catch (error) {
        return error;
    }
}

/**
 * Exporting
 */
export const auth = {
    loginError,
    loginSuccess,
    logout,
    register,
};
