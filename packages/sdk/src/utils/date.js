/**
 * Core Packages
 */
import dayjs from 'dayjs';
import dayjsUTC from 'dayjs/plugin/utc';
import dayjsCustomParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/pt-br';

/**
 * Plugins
 */
dayjs.extend(dayjsUTC);
dayjs.extend(dayjsCustomParseFormat);

/**
 * Reference
 */
const date = dayjs;

/**
 * Exporting
 */
export { date };
