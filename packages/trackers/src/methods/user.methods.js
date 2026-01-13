/**
 * Common
 */
import { auth } from './auth.methods';

/**
 * User Updated
 *
 * @param {string} userId
 *
 * @returns {boolean|object}
 */
function updated(userId) {
    return false;
}

/**
 * Exporting
 */
export const user = {
    created: auth.register,
    updated,
};
