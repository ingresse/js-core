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
    const totalAmount   = currency((objMetadata.totalAmount || 0));
    const totalPayments = numbers((objMetadata.totalPayments || 0));
    const objPagination = (responsePagination || {});
    const pagination    = {
        pageSize,
        total: (objPagination.items || 1),
        ...objPagination,
    };
    const metadata      = {
        ...objMetadata,
        display: {
            totalAmount,
            totalPayments,
            total: (
                display('summaryPaymentsBoletos')
                .replace('#amount', totalAmount)
                .replace('#qtty', totalPayments)
            ),
            totalHtml: (
                display('summaryPaymentsBoletos')
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
