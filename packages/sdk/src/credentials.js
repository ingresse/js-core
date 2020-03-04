/**
 * Utilities
 */
import cookies from './utils/cookies.js';

/**
 * Authentication Credentials
 */
let credentials = {
    jwt   : '',
    token : '',
    userId: '',
};
const methods = [
    'get',
    'set',
    'clear',
];

/**
 * Get Credentials
 *
 * @param {string} credentialKey
 *
 * @return {object} credentials
 */
credentials.get = (credentialKey = '') => {
    if (methods.includes(credentialKey)) {
        return null;
    }

    const specific = (credentials[credentialKey] || cookies.get(credentialKey) || '');

    if (credentialKey && !specific) {
        return null;
    }

    let onlyValues = {};

    Object.keys(credentials).map((credKey) => {
        if (methods.includes(credKey)) {
            return false;
        }

        onlyValues[credKey] = (credentials[credKey] || cookies.get(credKey) || '');

        return true;
    });

    return (specific || onlyValues);
};

/**
 * Set Credentials
 *
 * @param {object|string} newCredentials
 * @param {any} credentialContent -
 *
 * @return {object} credentials
 */
credentials.set = (newCredentials, credentialContent = '') => {
    const expirationDays = 7;

    function keyJWT(credentialKey = '') {
        return (credentialKey === 'authToken' ? 'jwt' : credentialKey);
    }

    if ((typeof newCredentials === 'string') && credentialContent) {
        const credentialKey = keyJWT(newCredentials);

        if (methods.includes(credentialKey)) {
            return null;
        }

        credentials[credentialKey] = credentialContent;

        cookies.set(credentialKey, credentialContent, expirationDays);

        return credentials[newCredentials];
    }

    if (typeof newCredentials !== 'object') {
        return;
    }

    Object.keys(newCredentials).map((key) => {
        const credentialKey = keyJWT(key);

        if (methods.includes(credentialKey)) {
            return false;
        }

        const credentialValue      = newCredentials[credentialKey];
        credentials[credentialKey] = credentialValue;

        cookies.set(credentialKey, credentialValue, expirationDays);

        return true;
    });

    return credentials.get();
};

/**
 * Clear Credentials
 *
 * @return {object} credentials
 */
credentials.clear = () => {
    Object.keys(credentials).map((credentialKey) => {
        if (methods.includes(credentialKey)) {
            return false;
        }

        credentials[credentialKey] = '';

        cookies.remove(credentialKey);

        return true;
    });

    return credentials.get();
};

/**
 * Exporting
 */
export default credentials;