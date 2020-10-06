/**
 * Strip HTML
 *
 * @param {String} text
 *
 * @returns {String}
 */
export function textStripHTML(text = '') {
    return (text
        .replace(/&nbsp;/g, ' ')
        .replace(/<\/p>/g, ' ')
        .replace(/<\/?[^>]+(>|$)/g, '')
    );
}
