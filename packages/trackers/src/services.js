/**
 * Analytics Services
 */
import fbq from './analytics/facebook.pixel';
import gtag from './analytics/google.analytics';

/**
 * Antifraud Services
 */
import legiti from './fraud/legiti.fraud';

/**
 * Reference
 */
const services = {
    fbq,
    gtag,
    legiti,
};

/**
 * Exporting
 */
export default services;
