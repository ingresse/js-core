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
        return false;

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
        return false;

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
