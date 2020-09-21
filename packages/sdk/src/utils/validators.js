/**
 * Object Validator:
 * Remove empty object properties
 * 
 * @param {object} original
 * 
 * @returns {object}
 */
function objectValidator(original = {}) {
    let validated = {};

    Object.keys(original).forEach((objectPropKey) => {
        const objectPropValue = original[objectPropKey];

        if (![ undefined, NaN, '' ].includes(objectPropValue)) {
            validated[objectPropKey] = objectPropValue;
        }
    });

    return validated;
}

export {
    objectValidator,
};
