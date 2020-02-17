/**
 * Base
 */
const request = require('../request/request.js');

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
        const credentialsRef = require('../credentials/credentials.js');
        const credentials    = credentialsRef();

        credentials.clear();

        request
        .post('/login', query, {
            email,
            password,
        })
        .catch(reject)
        .then(({ data }) => {
            if (typeof data !== 'object' || !data) {
                return reject({
                    code: -1,
                    message: 'Auth: Invalid login response',
                });
            }

            const {
                authToken,
                ...rest
            } = (data || {});

            const adapted = {
                jwt: authToken,
                ...rest,
            };

            credentials.set(adapted);
            resolve(adapted);
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
        const credentialsRef = require('../credentials/credentials');
        const credentials    = credentialsRef();

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
function renew(token = '', query = {}) {
    return new Promise((resolve, reject) => {
        const credentialsRef = require('../credentials/credentials');
        const credentials    = credentialsRef();
        const userToken      = (token || credentials.get('token'));

        if (!userToken) {
            return reject({
                code: -1,
                message: 'Auth: Missing user token to renew',
            });
        }

        request
        .get('/login/renew-token', {
            ...query,
            token: userToken,
        })
        .catch(reject)
        .then(({ authToken }) => {
            if (!authToken) {
                return reject({
                    code: -1,
                    message: 'Auth: Token renew failed',
                });
            }

            credentials.set({
                jwt  : authToken,
                token: userToken
            });

            resolve(credentials.get());
        });
    });
}

/**
 * Exporting
 */
module.exports = {
    login,
    logout,
    renew,
};
