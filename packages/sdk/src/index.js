/**
 * Initializer
 *
 * @param {object} settings
 */
function sdk(settings = {}) {
    const optionsRef = require('./options.js');
    const options    = optionsRef();

    options.set(settings);
};

/**
 * Options
 */
sdk.options = () => require('./options.js');

/**
 * Utilities
 */
sdk.cookies = () => require('./utils/cookies.js');
sdk.request = () => require('./request/request.js');
sdk.storage = () => require('./utils/storage.js');

/**
 * Credentials
 */
sdk.credentials = () => require('./credentials/credentials.js');

/**
 * APIs
 */
sdk.auth = () => require('./apis/auth.js');
sdk.user = () => require('./apis/user.js');

/**
 * Exporting
 */
module.exports = sdk;
