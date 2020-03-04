/**
 * Base
 */
import { get, post } from '../request/request.js';
import credentials from '../credentials.js';

/**
 * Auth API Login
 *
 * @param {string} email
 * @param {string} password
 * @param {object} query
 * @param {object} settings
 *
 * @return {Promise}
 */
function login(
    email    = '',
    password = '',
    query    = {},
    settings = {}
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
 * @return {Promise}
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
 * @param {string} token
 * @param {object} query
 * @param {object} settings
 *
 * @return {Promise}
 */
function renewJWT(
    token    = '',
    query    = {},
    settings = {}
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
 * Reference
 */
const auth = {
    login,
    logout,
    renewJWT,
};

/**
 * Exporting
 */
export default auth;
