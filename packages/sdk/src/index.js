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
import company from './apis/company.js';
import event from './apis/event.js';
import password from './apis/password.js';
import user from './apis/user.js';
import users from './apis/users.js';

/**
 * Microservices
 */
import events from './microservices/events.js';
import tickets from './microservices/tickets.js';

/**
 * Lambdas as APIs
 */
import purchases from './lambdas/purchases.js';
import score from './lambdas/score.js';

/**
 * Initializer
 *
 * @param {object} settings
 *
 * @returns {object} SDK new settings
 */
function sdk(settings = {}) {
    return options.set(settings);
};

/**
 * Exporting
 */
export {
    sdk as default,

    /**
     * Tools
     */
    credentials,
    options,

    /**
     * Extras
     */
    cookies,
    request,
    storage,
    parseJWT,

    /**
     * APIs
     */
    auth,
    company,
    event,
    password,
    user,
    users,

    /**
     * Microservices
     */
    events,
    tickets,

    /**
     * Lambdas as APIs
     */
    purchases,
    score,
};
