/**
 * Application options
 */
let options = {
    apiKey  : '',
    env     : '',
    company : '',
    appName : '',
    locale  : 'br',
    prefix  : 'ing',
    junction: '_',
};
const methods = [
    'get',
    'set',
    'clear',
];

/**
 * Get Options
 *
 * @param {string} optionKey
 *
 * @return {object} options
 */
options.get = (optionKey = '') => {
    if (methods.includes(optionKey)) {
        return null;
    }

    const specific = (options[optionKey] || null);

    if (optionKey && !specific) {
        return null;
    }

    let onlyValues = {};

    Object.keys(options).map((optionKey) => {
        if (methods.includes(optionKey)) {
            return false;
        }

        onlyValues[optionKey] = options[optionKey];

        return true;
    });

    return (specific || onlyValues);
};

/**
 * Set Options
 *
 * @param {object} newOptions
 *
 * @return {object} options
 */
options.set = (newOptions = {}) => {
    if (typeof newOptions !== 'object') {
        return options;
    }

    /**
     * Prevent redefinitions
     */
    delete newOptions.set;

    Object.keys(newOptions).map((optionKey) => {
        options[optionKey] = newOptions[optionKey];
    });

    return options;
};

/**
 * Clear Options
 *
 * @return {object} options
 */
options.clear = () => {
    Object.keys(options).map((optionKey) => {
        if (methods.includes(optionKey)) {
            return false;
        }

        options[optionKey] = '';

        return true;
    });

    return options.get();
};

/**
 * Exporting
 */
export default options;
