import {
    date,
    display as displayUtil,
    documents,
    isObject,
} from '../../../utils';
import { common } from '../common.js';

/**
 * Boleto Details adapter
 *
 * @param {object} response
 *
 * @returns {object} client-side improved boleto
 */
export function details(response) {
    const boleto = common(response, true);

    if (!boleto || !isObject(boleto)) {
        return boleto;
    }

    const {
        display     : boletoDisplay,
        document    : boletoDocument,
        expires_at  : boletoExpiresAt,
        scheduled_to: boletoScheduledTo,
    } = boleto;

    /**
     * Dates
     */
    const expiresAt   = date.utc(boletoExpiresAt);
    const scheduledTo = date.utc(boletoScheduledTo);

    /**
     * Helpers
     */
    const wasScheduledExpired = scheduledTo.isAfter(expiresAt);
    const expiredDaysCount    = (!wasScheduledExpired ? '' : scheduledTo.diff(expiresAt, 'days'));
    const expiredDays         = (!expiredDaysCount ? '' : `${expiredDaysCount} dia${expiredDaysCount > 1 ? 's' : ''}`);

    /**
     * Displayed data
     */
    const display = {
        ...boletoDisplay,
        document            : documents.format(boletoDocument),
        expiredDays,
        expiredDaysCount,
        expires_at          : expiresAt.format(displayUtil('date')),
        expires_at_ext      : expiresAt.format(displayUtil('dateTimeExtended')),
        expires_at_weekday  : expiresAt.format(displayUtil('dateWeekday')),
    };

    return {
        ...boleto,
        display,
        documentType: documents.type(boletoDocument),
        wasScheduledExpired,
    };
}
