/**
 * Analytics
 */
import _fbq from '../analytics/facebook.pixel';
import _gtag from '../analytics/google.analytics';

/**
 * References
 */
const fbq    = _fbq.trigger;
const gtag   = _gtag.trigger;

/**
 * Exporting
 */
export {
    fbq,
    gtag,
};
