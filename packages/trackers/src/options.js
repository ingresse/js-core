/**
 * Third Party Services
 */
import services from './services';

/**
 * Trackers Options
 */
let options = {
    gtag: null,
    fbp : null,

    inspetor: null,
    sift    : null,
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
    delete newOptions.get;
    delete newOptions.set;

    /**
     * Initialize services
     */
    Object.keys(newOptions).map((optionKey) => {
        options[optionKey] = newOptions[optionKey];

        if (services[optionKey] &&
            services[optionKey].init) {
            services[optionKey].init(newOptions[optionKey]);
        }

        return true;
    });

    return options;
};

/**
* Performs a deep merge of objects and returns new object. Does not modify
* objects (immutable) and merges arrays via concatenation.
*
* @param {...object} objects - Objects to merge
*
* @return {object} New object with merged key/values
*/
options.merge = (...objects) => {
    const isObject = (obj) => (obj && typeof obj === 'object');

    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach(key => {
            const pVal = prev[key];
            const oVal = obj[key];

            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);

            } else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);

            } else {
                prev[key] = oVal;
            }
        });

        return prev;
    }, {});
}

/**
 * Exporting
 */
export default options;
