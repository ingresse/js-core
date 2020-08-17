/**
 * Base
 */
import { post } from '../request/request.js';

/**
 * Forgot Password
 *
 * @param {string} email
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function recover(
    email,
    query,
    settings
) {
    return post(
        '/recover-password',
        {
            email,
        },
        query,
        settings,
    );
}

/**
 * Reference
 */
const password = {
    recover,
};

/**
 * Exporting
 */
export default password;
