/**
 * Credentials
 */
import credentials from './credentials.js';

/**
 * Options
 */
import options from './options.js';

/**
 * Utilities
 */
import display from './display/index.js';
import request from './request/request.js';
import { cookies, storage } from './utils';
import * as utils from './utils';

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
import checkin from './microservices/checkin';
import coupons from './microservices/coupons';
import events from './microservices/events';
import finance from './microservices/finance';
import shop from './microservices/shop';
import tickets from './microservices/tickets';

/**
 * Lambdas as APIs
 */
import purchases from './lambdas/purchases';
import score from './lambdas/score';

/**
 * Adapters
 */
import * as adapters from './adapters';

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
    display,
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
    finance,
    shop,
    tickets,

    /**
     * Lambdas as APIs
     */
    purchases,
    score,
};
