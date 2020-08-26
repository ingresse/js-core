/**
 * Credentials
 */
import credentials from './credentials.js';

/**
 * Utilities
 */
import request from './request/request.js';
import { cookies, storage } from './utils';
import * as utils from './utils';

/**
 * Options
 */
import options from './options.js';

/**
 * APIs
 */
import auth from './apis/auth.js';
import company from './apis/company.js';
import entrance from './apis/entrance.js';
import event from './apis/event.js';
import password from './apis/password.js';
import sales from './apis/sales.js';
import user from './apis/user.js';
import users from './apis/users.js';

/**
 * Microservices
 */
import checkin from './microservices/checkin.js';
import coupons from './microservices/coupons.js';
import events from './microservices/events.js';
import finance from './microservices/finance.js';
import shop from './microservices/shop.js';
import tickets from './microservices/tickets.js';

/**
 * Lambdas as APIs
 */
import purchases from './lambdas/purchases.js';
import score from './lambdas/score.js';

/**
 * Adapters
 */
import * as adapters from './adapters/index.js';

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
     * Utilities
     */
    cookies,
    request,
    storage,
    utils,

    /**
     * Adapters
     */
    adapters,
    adapters as formatters,

    /**
     * APIs
     */
    auth,
    company,
    entrance,
    event,
    password,
    sales,
    user,
    users,

    /**
     * Microservices
     */
    checkin,
    coupons,
    events,
    shop,
    tickets,

    /**
     * Lambdas as APIs
     */
    finance,
    purchases,
    score,
};
