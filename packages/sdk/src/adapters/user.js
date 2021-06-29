/**
 * Utilities
 */
import credentials from '../credentials.js';
import options from '../options.js';
import { getURL, orderObject } from '../utils';
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
        schema_id,
        ...data
    } = (response || {});
    const {
        id      : originalId,
        name    : originalName,
        lastname: originalLastname,
        pictures: originalPictures,
        type    : originalType,
        planner : originalPlanner,
    } = (data || {});

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
     * Public Photo URL
     */
    const { apiKey } = options.get();
    const { token }  = credentials.get();
    const photoURL   = `${getURL()}/user/${originalId}/picture?apikey=${apiKey}&usertoken=${token}`;

    /**
     * Ordering
     */
    const userFormatted = {
        ...data,
        ...definePictures(originalPictures),
        name,
        firstname,
        lastname,
        initials,
        photoURL,
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
