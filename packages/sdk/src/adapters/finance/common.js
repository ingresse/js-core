import {
    currency,
    date,
    display as displayUtil,
    getFinanceStatus,
    isObject,
    sortByProperty,
} from '../../utils';
import { details as eventDetailsAdapter } from '../events/details.js';

export const statusActionable = [
    'created',
    'scheduled',
    'partially-approved',
];

/**
* Transaction Details common adapter
*
* @param {object} response
* @param {boolean} isBoleto
*
* @returns {object} client-side improved transaction
*/
export function common(response, isBoleto = false) {
    if (!response || !isObject(response)) {
        return response;
    }

    const transaction = (response.id ? response : response.data);
    const {
        amount      : transactionAmount,
        created_at  : transactionCreatedAt,
        event       : eventId,
        eventDetails: transactionEvent,
        fee         : transactionFee,
        history     : transactionHistory,
        scheduled_to: transactionScheduledTo,
        status      : transactionStatus,
    } = transaction;
    const {
        title: eventTitle,
        poster: eventPosters,
    } = (transactionEvent || {});
    const eventDetails = eventDetailsAdapter(transactionEvent);
    const { medium: eventPoster } = (eventPosters || {});
    const { sessionsSummary: eventSessions } = (eventDetails || {});

    /**
     * Generics
     */
    const amount = (transactionAmount || 0);
    const fee    = (transactionFee || 0);
    const total  = (amount + fee);

    /**
     * Dates
     */
    const createdAt   = date(transactionCreatedAt);
    const scheduledTo = date.utc(transactionScheduledTo);

    /**
     * Status Booleans
     */
    const isActionable        = statusActionable.includes(transactionStatus);
    const isApproved          = transactionStatus === 'approved';
    const isApprovable        = statusActionable.includes(transactionStatus);
    const isCancellable       = statusActionable.includes(transactionStatus);
    const isComplete          = transactionStatus === 'complete';
    const isDeclined          = transactionStatus === 'declined';
    const isError             = transactionStatus === 'error';
    const isPartiallyApproved = transactionStatus === 'partially-approved';
    const isScheduled         = transactionStatus === 'scheduled';

    /**
     * Displayed data
     */
    const display = {
        amount              : currency(amount),
        created_at          : createdAt.format(displayUtil('dateTimeFull')),
        created_at_weekday  : createdAt.format(displayUtil('dateWeekday')),
        eventId,
        eventPoster,
        eventSessions,
        eventTitle,
        fee                 : currency(fee),
        scheduled_to        : scheduledTo.format(displayUtil('date')),
        scheduled_to_ext    : scheduledTo.format(displayUtil('dateTimeExtended')),
        scheduled_to_weekday: scheduledTo.format(displayUtil('dateWeekday')),
        status              : getFinanceStatus(transactionStatus, isBoleto),
        total               : currency(total),
    };

    /**
     * History
     */
    const history = sortByProperty(transactionHistory || [], 'created_at').map((historyItem, index) => {
        const order = (index + 1);
        const { action, created_at } = historyItem;

        return {
            ...historyItem,
            order,
            display: {
                action: getFinanceStatus(action, isBoleto),
                created_at: date(created_at).format(displayUtil('dateTimeFull')),
                order,
            },
        };
    }).reverse();

    return {
        ...transaction,
        amount,
        display,
        eventDetails,
        fee,
        history,
        isActionable,
        isApproved,
        isApprovable,
        isCancellable,
        isComplete,
        isDeclined,
        isError,
        isPartiallyApproved,
        isScheduled,
        total,
    };
}
