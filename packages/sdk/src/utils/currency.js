/**
 * Base
 */
import options from '../options.js';

/**
 * Format Currency
 *
 * @param {Number} - [value]   - Value
 * @param {Number} - [divisor] - Divisor
 * @param {string} - [type]    - Currency Type
 * @param {string} - [local]   - Currency Locale
 *
 * @return {string}
 */
function currency(
    value   = 0,
    divisor = 100,
    type    = '',
    locale  = ''
) {
    const _options = options.get();
    const _value   = (typeof value === 'number' ? value : 0);
    const _divisor = (typeof divisor === 'number' ? divisor : 100);
    const _final   = (_value / _divisor);
    const _locale  = (locale || _options.locale);
    const _type    = (type || _options.currency);

    return new Intl.NumberFormat(_locale, {
        style   : 'currency',
        currency: _type,
    }).format(_final);
}

/**
 * Exporting
 */
export { currency };
