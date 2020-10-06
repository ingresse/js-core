/**
 * Core Packages
 */
import dayjs from 'dayjs';
import dayjsUTC from 'dayjs/plugin/utc';
import dayjsCustomParseFormat from 'dayjs/plugin/customParseFormat';
import options from '../options.js';

/**
 * Plugins
 */
dayjs.extend(dayjsUTC);
dayjs.extend(dayjsCustomParseFormat);

/**
 * Init
 */
try {
    const { locale: sdkLocale }  = options.get();
    const locale = (sdkLocale || '').toLowerCase();

    if (locale && (locale !== 'en')) {
        require(`dayjs/locale/${locale}.js`);
        dayjs.locale(locale);
    }

} catch(error) {
    console.error('Ingresse SDK Date Utility init error', error);
}

/**
 * Exporting
 */
export { dayjs as date };
