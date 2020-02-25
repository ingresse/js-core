/**
 * Analytics Services
 */
import gtag from './analytics/google.analytics';

/**
 * Antifraud Services
 */
import inspetor from './fraud/inspetor.fraud';

/**
 * Reference
 */
const services = {
    gtag,
    inspetor,
};

/**
 * Exporting
 */
export default services;
