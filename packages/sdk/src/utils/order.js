/**
 * Object orderer
 *
 * @param {object} unordered
 *
 * @returns {object} ordered
 */
function orderObject(unordered) {
    if (!unordered ||
        (typeof unordered !== 'object')) {
        return unordered;
    }

    let ordered = {};

    Object.keys(unordered).sort().forEach((key) => {
        ordered[key] = unordered[key];
    });

    return ordered;
}

/**
 * Exporting
 */
export default orderObject;
