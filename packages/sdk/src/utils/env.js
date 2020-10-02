/**
 * Environment Utility
 */
const onlyProd = [
    'beta-score',
    'my-transactions',
];

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

    const finalEnv = ((env && !onlyProd.includes(resource)) ? (env + '-') : '');

    return `https://${finalEnv}${resource}.ingresse.com`;
};

/**
 * Exporting
 */
export { envURLBuilder };
