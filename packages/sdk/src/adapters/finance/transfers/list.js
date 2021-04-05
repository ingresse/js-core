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
    const totalAmount   = currency((objMetadata.totalAmount || 0));
    const totalTransfer = numbers((objMetadata.totalTransfer || 0));
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
            totalTransfer,
            total: (
                display('summaryWireTransfers')
                .replace('#amount', totalAmount)
                .replace('#qtty', totalTransfer)
            ),
            totalHtml: (
                display('summaryWireTransfers')
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
