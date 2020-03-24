/**
 * Analytics
 */
import _fbq from '../analytics/facebook.pixel';
import _gtag from '../analytics/google.analytics';

/**
 * Anti Fraud
 */
import _legiti from '../fraud/legiti.fraud';

/**
 * References
 */
const fbq    = _fbq.trigger;
const gtag   = _gtag.trigger;
const legiti = _legiti.trigger;

/**
 * Exporting
 */
export {
    fbq,
    gtag,
    legiti,
};
