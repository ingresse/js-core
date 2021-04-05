/**
 * Core Packages
 */
import dayjs from 'dayjs';
import dayjsUTC from 'dayjs/plugin/utc';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import dayjsCustomParseFormat from 'dayjs/plugin/customParseFormat';
import options from '../options.js';

/**
 * Plugins
 */
dayjs.extend(dayjsUTC);
dayjs.extend(dayjsRelativeTime);
dayjs.extend(dayjsCustomParseFormat);

/**
 * Init
 */
const { locale }  = options.get();
const localeLower = (locale || 'pt-BR').toLowerCase();
const localeFile  = require(`dayjs/locale/${localeLower}.js`);

dayjs.locale(localeFile);

/**
 * Exporting
 */
export { dayjs as date };
