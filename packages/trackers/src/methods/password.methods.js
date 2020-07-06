/**
 * Triggers
 */
import {
    legiti,
} from '../triggers';

/**
 * Password Recovery
 *
 * @param {string} email - user email
 *
 * @returns {boolean|object}
 */
function recovery(email) {
    if (!email) {
        return false;
    }

    try {
        return legiti('trackPasswordRecovery', email);

    } catch (error) {
        return error;
    }
}

/**
 * Password Reset
 *
 * @param {string} userId - user ID
 *
 * @returns {boolean|object}
 */
function reset(userId) {
    if (!userId) {
        return false;
    }

    try {
        return legiti('trackPasswordReset', userId);

    } catch (error) {
        return error;
    }
}

/**
 * Exporting
 */
export const password = {
    recovery,
    reset,
};
