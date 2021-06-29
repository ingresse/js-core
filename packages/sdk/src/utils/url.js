import options from '../options.js';
import { envURLBuilder } from './env.js';

/**
 * Get Resource URL
 *
 * @param {string} resource - platform resource
 * @param {string} env      - pltaform environment
 *
 * @returns {string}
 */
export function getURL(
  resource = 'api',
  env      = ''
) {
  return (
      options.get('url') ||
      envURLBuilder(resource, (env || options.get('env') || ''))
  );
}
