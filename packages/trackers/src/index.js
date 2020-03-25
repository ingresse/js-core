/**
 * Base
 */
import methods from './methods';
import options from './options';
import services from './services';

/**
 * Initializer
 *
 * @param {object} settings
 *
 * @returns {Promise}
 */
function trackers(settings) {
    return new Promise((resolve, reject) => {
        if (!settings || (typeof settings !== 'object')) {
            return reject({
                code   : -1,
                message: 'trackers:invalid-settings',
            });
        }

        /**
         * Init
         */
        let initialize = [];

        /**
         * Save Options
         */
        options.set(settings);

        /**
         * Initialize Services
         */
        for (const settingKey in settings) {
            if (services[settingKey] &&
                services[settingKey].init) {
                initialize.push(services[settingKey].init(settings[settingKey]));
            }
        }

        Promise
        .all(initialize)
        .then(resolve)
        .catch(reject);
    });
}

/**
 * Options
 */
trackers.options = options;

/**
 * Methods
 */
Object.keys(methods).map((methodKey) => {
    trackers[methodKey] = methods[methodKey];
});

/**
 * Exporting
 */
export default trackers;
