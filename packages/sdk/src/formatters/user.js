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
        type    : originalType,
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
     * Type
     */
    const type = parseInt(originalType, 10);

    /**
     * Roles
     */
    const roles = {
        user_admin: (type === 1),
        user_pro  : (type === 2),
        user_free : (type === 3),

        user_sales_group_member : false,
        user_sales_group_manager: false,
    };

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
        type,
        roles,
    };

    return orderObject(userFormatted);
}

/**
 * Exporting
 */
export { user };
