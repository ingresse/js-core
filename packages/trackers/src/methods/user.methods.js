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
    return legiti('trackUserUpdate', userId);
}

/**
 * Exporting
 */
export const user = {
    created: auth.register,
    updated,
};
