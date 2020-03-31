/**
 * Triggers
 */
import {
    fbq,
    gtag,
} from '../triggers';

/**
 * Click
 *
 * @param {any} param1
 * @param {any} param2
 *
 * @returns {boolean|object}
 */
function click(param1, param2) {
    try {
        return gtag(
            'event',
            'click',
            param1,
            param2
        );

    } catch (error) {
        return error;
    }
}

/**
 * Content View
 *
 * @param {object} details
 *
 * @returns {boolean|object}
 */
function contentView(details) {
    try {
        return fbq(
            'track',
            'ViewContent',
            details
        );

    } catch (error) {
        return error;
    }
}

/**
 * Lead
 *
 * @returns {boolean|object}
 */
function lead() {
    try {
        return fbq(
            'track',
            'Lead'
        );

    } catch (error) {
        return error;
    }
}

/**
 * Page View
 *
 * @returns {boolean|object}
 */
function pageView() {
    try {
        return (
            fbq('track', 'PageView') ||
            gtag('event', 'page_view')
        );

    } catch (error) {
        return error;
    }
}

/**
 * Exporting
 */
export {
    click,
    contentView,
    lead,
    pageView,
};
