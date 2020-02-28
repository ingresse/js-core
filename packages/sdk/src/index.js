/**
 * Credentials
 */
import credentials from './credentials.js';

/**
 * Utilities
 */
import request from './request/request.js';
import cookies from './utils/cookies.js';
import storage from './utils/storage.js';
import parseJWT from './utils/jwt.js';

/**
 * Options
 */
import options from './options.js';

/**
 * APIs
 */
import auth from './apis/auth.js';
import event from './apis/event.js';
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
    parseJWT,
    credentials,
    auth,
    event,
    user,
};
