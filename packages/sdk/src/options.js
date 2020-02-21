/**
 * Application options
 */
let options = {
    apiKey  : '',
    env     : '',
    company : 1,
    locale  : 'br',
    prefix  : 'ing',
    junction: '_',
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
 * Exporting
 */
export default options;
