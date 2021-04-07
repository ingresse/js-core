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

    const data          = responseData.map((transfer) => details(transfer));
    const objMetadata   = (responseMetadata || {});
    const objPagination = (responsePagination || {});
    const totalAmount   = currency((objMetadata.totalAmount || 0));
    const totalTransfer = numbers((objMetadata.totalTransfer || objPagination.items || 0));
    const pagination    = {
        pageSize,
        total: (objPagination.items || 1),
        ...objPagination,
    };
    const summaryTitle  = responseMetadata ? 'summaryWireTransfers' : 'summaryWireTransfersSimple';
    const metadata      = {
        ...objMetadata,
        display: {
            totalAmount,
            totalTransfer,
            total: (
                display(summaryTitle)
                .replace('#amount', totalAmount)
                .replace('#qtty', totalTransfer)
            ),
            totalHtml: (
                display(summaryTitle)
                .replace('#amount', `<strong>${totalAmount}</strong>`)
                .replace('#qtty', `<strong>${totalTransfer}</strong>`)
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
