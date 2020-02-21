/**
 * Credentials
 */
import credentials from './credentials/credentials.js';

/**
 * Utilities
 */
import request from './request/request.js';
import cookies from './utils/cookies.js';
import storage from './utils/storage.js';

/**
 * Options
 */
import options from './options.js';

/**
 * APIs
 */
import auth from './apis/auth.js';
import user from './apis/user.js';

/**
 * Initializer
 *
 * @param {object} settings
 */
function sdk(settings = {}) {
    return options.set(settings);
};

/**
 * Exporting
 */
export {
    sdk as default,
    options,
    cookies,
    request,
    storage,
    credentials,
    auth,
    user,
};
