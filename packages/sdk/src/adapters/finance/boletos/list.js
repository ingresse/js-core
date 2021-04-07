import { currency, display, numbers } from '../../../utils';
import { details } from './details';

export function list(response, pageSize) {
    const {
        data      : responseData,
        metadata  : responseMetadata,
        pagination: responsePagination,
    } = (response || {});

    if (!responseData || !responseData.length) {
        return response;
    }

    const data          = responseData.map((boleto) => details(boleto));
    const objMetadata   = (responseMetadata || {});
    const objPagination = (responsePagination || {});
    const totalAmount   = currency((objMetadata.totalAmount || 0));
    const totalPayments = numbers((objMetadata.totalPayments || objPagination.items || 0));
    const pagination    = {
        pageSize,
        total: (objPagination.items || 1),
        ...objPagination,
    };
    const summaryTitle  = responseMetadata ? 'summaryPaymentsBoletos' : 'summaryPaymentsBoletosSimple';
    const metadata      = {
        ...objMetadata,
        display: {
            totalAmount,
            totalPayments,
            total: (
                display(summaryTitle)
                .replace('#amount', totalAmount)
                .replace('#qtty', totalPayments)
            ),
            totalHtml: (
                display(summaryTitle)
                .replace('#amount', `<strong>${totalAmount}</strong>`)
                .replace('#qtty', `<strong>${totalPayments}</strong>`)
            ),
        },
    };

    return {
        ...response,
        data,
        metadata,
        pagination,
    };
}
