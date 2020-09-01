/**
 * Base
 */
import { defaultSettings, request } from './base.js';

/**
 * Sub Modules
 */
import bankAccounts from './bank-accounts.js';
import producers from './producers.js';
import transfers from './transfers.js';

/**
 * Reference
 */
const finance = {
    defaultSettings,
    request,

    bankAccounts,
    producers,
    transfers,
};

/**
 * Exporting
 */
export default finance;
