/**
 * Base
 */
import credentials from '../credentials.js';
import {
    get,
    post,
} from '../request/request.js';

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
            queryRest,
            {
                email,
                password,
            },
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
        });
    });
}

/**
 * Auth Logout
 *
 * @returns {Promise}
 */
function logout() {
    return new Promise((resolve) => {
        try {
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
        const userToken = (token || credentials.get('token'));

        if (!userToken) {
            return reject({
                code   : -1,
                message: 'Auth: Missing user token to renew',
            });
        }

        get(
            '/login/renew-token',
            {
                ...query,
                token: userToken,
            },
            settings
        )
        .catch(reject)
        .then(({ authToken }) => {
            if (!authToken) {
                return reject({
                    code   : -1,
                    message: 'Auth: Token renew failed',
                });
            }

            credentials.set({
                jwt  : authToken,
                token: userToken,
            });

            resolve(credentials.get());
        });
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
            query,
            {
                email,
                password,
            },
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
                    message: (message || 'Auth: Invalid company login response'),
                });
            }

            resolve(data);
        });
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
            query,
            {
                email   : fbEmail,
                fbToken : fbAccessToken,
                fbUserId: fbUserId,
            },
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
                    message: (message || 'Auth: Invalid company login response'),
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
    return post('/user', query, body, settings);
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
};

/**
 * Exporting
 */
export default auth;
