/**
 * Environment Utility
 */

/**
 * Get Environment URL
 *
 * @param {string} resource - Environment Resource: 'api', 'ticket', 'event', 'checkin';
 * @param {string} env      - Environment Type    : 'stg', 'hmla', 'hmlb', 'sandbox', 'integration';
 *
 * @returns {string} environment URL
 */
const envURLBuilder = (resource = 'api', env = '') => {
    if ((typeof env === 'string') && env.includes('http')) {
        return env;
    }

    return `https://${env ? (env + '-') : ''}${resource}.ingresse.com`;
};

/**
 * Exporting
 */
export default envURLBuilder;
