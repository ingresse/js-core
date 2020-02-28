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
 *
 * @return {Promise}
 */
function login(email = '', password = '', query = {}) {
    return new Promise((resolve, reject) => {
        const {
            companyLogin,
            ...queryRest
        } = (query || {});

        if (!companyLogin) {
            credentials.clear();
        }

        post((!companyLogin ? '/login' : '/company-login'), queryRest, {
            email,
            password,
        })
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
 * Auth API Logout
 *
 * @return {Promise}
 */
function logout() {
    return new Promise((resolve) => {
        credentials.clear();

        resolve(credentials.get());
    });
}

/**
 * Auth API Renew Authentication Token, based on regular token
 *
 * @param {string} token
 * @param {object} query
 *
 * @return {Promise}
 */
function renewJWT(token = '', query = {}) {
    return new Promise((resolve, reject) => {
        const userToken = (token || credentials.get('token'));

        if (!userToken) {
            return reject({
                code   : -1,
                message: 'Auth: Missing user token to renew',
            });
        }

        get('/login/renew-token', {
            ...query,
            token: userToken,
        })
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
