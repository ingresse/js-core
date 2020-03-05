/**
 * Base
 */
import {
    post,
} from '../request/request.js';

/**
 * Forgot Password
 *
 * @param {string} email
 *
 * @return {Promise}
 */
function forgot(
    email = '',
    query,
    settings
) {
    return post(
        '/recover-password',
        query,
        {
            email,
        },
        settings,
    );
}

/**
 * Reference
 */
const password = {
    forgot,
};

/**
 * Exporting
 */
export default password;
