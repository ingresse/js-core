/**
 * Utilities
 */
import { cookies, storage } from './utils';

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
    'renewCallback',
    'setRenewCallback',
];

/**
 * Get Credentials
 *
 * @param {string} credentialKey
 *
 * @returns {object} credentials
 */
credentials.get = (credentialKey = '') => {
    if (methods.includes(credentialKey)) {
        return null;
    }

    const specific = (
        credentials[credentialKey] ||
        cookies.get(credentialKey) ||
        storage.get(credentialKey) ||
        ''
    );

    if (credentialKey && !specific) {
        return null;
    }

    let onlyValues = {};

    Object.keys(credentials).map((credKey) => {
        if (methods.includes(credKey)) {
            return false;
        }

        onlyValues[credKey] = (
            credentials[credKey] ||
            cookies.get(credKey) ||
            storage.get(credKey) ||
            ''
        );

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
 * @returns {object} credentials
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
        storage.set(credentialKey, credentialContent);

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
        storage.set(credentialKey, credentialValue);

        return true;
    });

    return credentials.get();
};

/**
 * Clear Credentials
 *
 * @returns {object} credentials
 */
credentials.clear = () => {
    Object.keys(credentials).map((credentialKey) => {
        if (methods.includes(credentialKey) ||
            (credentialKey || '').includes('trusted')) {
            return false;
        }

        credentials[credentialKey] = '';

        cookies.remove(credentialKey);
        storage.remove(credentialKey);

        return true;
    });

    return credentials.get();
};

credentials.renewCallback = () => {};
credentials.setRenewCallback = (callback) => {
    if (typeof callback !== 'function') {
        return;
    }

    credentials.renewCallback = callback;
};

/**
 * Exporting
 */
export default credentials;
