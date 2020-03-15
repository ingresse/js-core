/**
 * Utilities
 */
import orderObject from '../utils/order.js';

/**
 * User Formatter
 *
 * @param {object} response
 *
 * @returns {object}
 */
function user(response) {
    if (!response || (typeof response !== 'object')) {
        return response;
    }

    /**
     * User values
     */
    const {
        name    : originalName,
        lastname: originalLastname,
        pictures: originalPictures,
    } = (response || {});

    /**
     * Name
     */
    const name      = ((originalName || '') + ' ' + (originalLastname || '')).trim();
    const nameSplit = name.split(' ');
    const firstname = (nameSplit[0] || '').trim();
    const lastname  = (nameSplit[(nameSplit.length - 1)] || '').trim();
    const initials  = (firstname.charAt(0) + lastname.charAt(0)).trim().toUpperCase();

    /**
     * Photo
     */
    const pictures = (
        (!originalPictures || originalPictures.hasOwnProperty('length')) ?
            {} : originalPictures
    );
    const {
        medium: pictureMedium,
    } = pictures;
    const photo = (pictureMedium || '');

    /**
     * Ordering
     */
    const userFormatted = {
        ...response,
        name,
        firstname,
        lastname,
        initials,

        photo,
        pictures,
    };

    return orderObject(userFormatted);
}

/**
 * Exporting
 */
export { user };
