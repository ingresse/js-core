/**
 * Triggers
 */
import {
    legiti,
} from '../triggers';

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
    try {
        return legiti('trackUserUpdate', userId);

    } catch (error) {
        return error;
    }
}

/**
 * Exporting
 */
export const user = {
    created: auth.register,
    updated,
};
