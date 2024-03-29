/**
 * Core Packages
 */
import { get as fetchGetter } from '@ingresse/request';

/**
 * Base
 */
import credentials from '../credentials.js';
import { storage } from '../utils';
import { get, post } from '../request/request.js';

/**
 * Auth API Login
 *
 * @param {string} email
 * @param {string} password
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function login(
    email    = '',
    password = '',
    query,
    settings,
) {
    return new Promise((resolve, reject) => {
        const {
            companyLogin,
            ...queryRest
        } = (query || {});

        if (!companyLogin) {
            credentials.clear();
        }

        post(
            (!companyLogin ? '/login' : '/company-login'),
            {
                email,
                password,
            },
            queryRest,
            settings
        )
        .then((response) => {
            const {
                data,
                message,
            } = (response || {});

            if (typeof data !== 'object' || !data) {
                return reject({
                    code   : -1,
                    message: (message || 'Auth: Invalid login response'),
                });
            }

            if (companyLogin) {
                return resolve(data);
            }

            const {
                authToken,
                ...rest
            } = (data || {});

            credentials.set({
                jwt: authToken,
                ...rest,
            });
            resolve({
                ...(data || {}),
                jwt: (authToken || ''),
            });
        })
        .catch(reject);
    });
}

/**
 * Auth Logout
 *
 * @returns {Promise}
 */
function logout(clearStorage = false) {
    return new Promise((resolve) => {
        try {
            if (clearStorage) {
                storage.clear();
            }

            credentials.clear();
            resolve(credentials.get());

        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Auth Renew Authentication Token, based on optional or current token
 *
 * @param {string} token - current API user's token
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function renewJWT(
    token,
    query,
    settings
) {
    return new Promise((resolve, reject) => {
        const usertoken = (token || credentials.get('token'));

        if (!usertoken) {
            return reject({
                code   : -1,
                message: 'Auth: Missing user token to renew',
            });
        }

        get(
            '/login/renew-token',
            {
                usertoken,
                ...query,
            },
            settings
        )
        .then((response) => {
            const { authToken } = (response || {});

            if (!authToken) {
                return reject({
                    code   : -1,
                    message: 'Auth: Token renew failed',
                });
            }

            const userId = credentials.get('userId');

            credentials.set({
                ...(!userId ? {} : { userId }),
                jwt  : authToken,
                token: usertoken,
            });

            resolve(credentials.get());
        })
        .catch(reject);
    });
}

/**
 * Auth API Company Login
 *
 * @param {string} email
 * @param {string} password
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function companyLogin(
    email    = '',
    password = '',
    query,
    settings
) {
    return new Promise((resolve, reject) => {
        post(
            '/company-login',
            {
                email,
                password,
            },
            query,
            settings
        )
        .then((response) => {
            const {
                data,
                message,
            } = (response || {});

            if (typeof data !== 'object' || !data) {
                return reject({
                    code   : -1,
                    message: (message || 'Auth: Invalid company login response'),
                });
            }

            resolve(data);
        })
        .catch(reject);
    });
}

/**
 * Auth API Facebook Login
 *
 * @param {string} fbEmail      - User's email received from Facebook SDK
 * @param {string} fbAcessToken - User's access token received from Facebook SDK
 * @param {string} fbUserId     - User's ID from received Facebook SDK
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function facebookLogin(
    fbEmail       = '',
    fbAccessToken = '',
    fbUserId      = '',
    query,
    settings
) {
    return new Promise((resolve, reject) => {
        post(
            '/login/facebook',
            {
                email   : fbEmail,
                fbToken : fbAccessToken,
                fbUserId: fbUserId,
            },
            query,
            settings
        )
        .catch(reject)
        .then((response) => {
            const {
                data,
                message,
            } = (response || {});

            if (typeof data !== 'object' || !data) {
                return reject({
                    code   : -1,
                    message: (message || 'Auth: Invalid facebook login response'),
                });
            }

            resolve(data);
        });
    });
}

/**
 * User Register
 *
 * @param {object} body
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function register(
    body = {},
    query,
    settings
) {
    return post('/user', body, query, settings);
}

/**
 * Validate if user's needs 2fa
 *
 * @returns {Promise}
 */
function needsTwoFactor(userId = '') {
    return fetchGetter(
        `https://c4m0r56ikk.execute-api.us-east-1.amazonaws.com/prod?id=${userId}`
    );
}

/**
 * Reference
 */
const auth = {
    login,
    logout,
    renewJWT,
    companyLogin,
    facebookLogin,
    register,
    needsTwoFactor,
};

/**
 * Exporting
 */
export default auth;
