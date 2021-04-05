import { documents, isObject } from '../../../utils';
import { common } from '../common.js';

/**
 * Transfer Details adapter
 *
 * @param {object} response
 *
 * @returns {object} client-side improved transfer
 */
export function details(response) {
    const transfer = common(response);

    if (!transfer || !isObject(transfer)) {
        return transfer;
    }

    const {
        bankAccountDetails: transferAccount,
        display: transferDisplay,
    } = transfer;
    const {
        account_agency: agency,
        account_number: number,
        bank_code: bank,
        owner_document: document,
        owner_name: owner,
        owner_type: documentType,
        type,
    } = (transferAccount || {});

    const display = {
        ...transferDisplay,
        account: {
            agency,
            number,
            bank,
            document: documents.format(document),
            documentType,
            owner,
            type,
        },
    };

    return {
        ...transfer,
        display,
    };
}
