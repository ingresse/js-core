/**
 * Base
 */
import options from './options';
import methods from './methods';

/**
 * Initializer
 *
 * @param {object}  settings
 * @param {boolean} sandboxMode
 *
 * @returns {object}
 */
function trackers(settings = null, sandboxMode = false) {
    if (!settings) {
        return null;
    }

    /**
     * Initialize services
     */
    options.set({
        ...settings,
        sandboxMode,
    });

    return trackers;
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
