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
    locale = 'pt-BR',
) {
    return new Intl.NumberFormat(locale).format(num);
}

/**
 * Exporting
 */
export default numbers;
