/**
 * Event Identifier
 *
 * @param {string|number} id - event id
 *
 * @returns {string} type
 */
function eventIdentifier(id) {
    const integerId      = parseInt(id, 10);
    const originalLength = (id + '').length;
    const integerLength  = (integerId + '').length;
    const isNumeric      = !!(integerId && (integerLength === originalLength));

    return (isNumeric ? 'byId' : 'byLink');
}

/**
 * Exporting
 */
export { eventIdentifier };
