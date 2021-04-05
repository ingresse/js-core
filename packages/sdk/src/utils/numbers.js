/**
 * Base
 */
import options from '../options.js';

/**
 * Numbers Utility
 * Format as a readble number
 *
 * @param {Number} num
 * @param {string} [locale]
 *
 * @returns {string}
 */
function numbers(
    num    = 0,
    locale = '',
) {
    const _options = options.get();
    const _locale  = (locale || _options.locale);

    return new Intl.NumberFormat(_locale).format(num);
}

numbers.strip = function (value) {
    return JSON.stringify(value || '').replace(/\D/g, '');
};

/**
 * Exporting
 */
export { numbers };
