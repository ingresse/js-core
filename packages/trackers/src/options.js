/**
 * Third Party Services
 */
import services from './services';

/**
 * Trackers Options
 */
let options = {
    fbq   : undefined,
    gtag  : undefined,
    legiti: undefined,
};
const methods = [
    'get',
    'set',
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
        return undefined;
    }

    const specific = (options[optionKey] || undefined);

    if (optionKey && !specific) {
        return undefined;
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
    delete newOptions.get;
    delete newOptions.set;

    /**
     * Initialize services
     */
    Object.keys(newOptions).map((optionKey) => {
        options[optionKey] = newOptions[optionKey];

        return true;
    });

    return options;
};

/**
 * Exporting
 */
export default options;
