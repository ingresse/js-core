/**
 * Application default options
 */
let options = {
    apiKey  : '',
    env     : '',
    company : '',
    appName : '',
    currency: 'BRL',
    locale  : 'pt-BR',
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
 * @returns {object} options
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
 * @returns {object} options
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
 * @returns {object} options
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
