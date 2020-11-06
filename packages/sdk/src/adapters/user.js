/**
 * Utilities
 */
import { orderObject } from '../utils';
import { definePictures } from './pictures';

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
        planner : originalPlanner,
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
     * Type
     */
    const type = parseInt(originalType, 10);

    /**
     * Roles
     */
    const roles = {
        userAdmin: (type === 1),
        userPro  : (type === 2),
        userFree : (type === 3),
        userSalesGroupMember : false,
        userSalesGroupManager: false,
    };

    /**
     * Planner
     */
    const planner = {
        ...(originalPlanner || {}),
        ...definePictures((originalPlanner || {}).pictures),
    };

    /**
     * Ordering
     */
    const userFormatted = {
        ...response,
        ...definePictures(originalPictures),
        name,
        firstname,
        lastname,
        initials,
        planner,
        type,
        roles,
    };

    return orderObject(userFormatted);
}

/**
 * Exporting
 */
export { user };
