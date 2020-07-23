/**
 * Format Currency
 *
 * @param {integer} - [value]   - Value
 * @param {integer} - [divisor] - Divisor
 * @param {string}  - [type]    - Currency Type
 * @param {string}  - [local]   - Currency Locale
 *
 * @return {string}
 */
function currency(
    value   = 0,
    divisor = 100,
    type    = 'BRL',
    locale  = 'pt-BR'
) {
    return new Intl.NumberFormat(locale, {
        style   : 'currency',
        currency: type,
    })
    .format((
        (typeof value === 'number' ? value : 0)
        /
        (typeof divisor === 'number' ? divisor : 100)
    ));
}

/**
 * Exporting
 */
export default currency;
