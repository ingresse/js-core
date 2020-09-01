/**
 * Base
 */
import { defaultSettings, request } from './base.js';

/**
 * Sub Modules
 */
import bankAccounts from './bank-accounts.js';
import banks from './banks.js';
import producers from './producers.js';
import transfers from './transfers.js';

/**
 * Reference
 */
const finance = {
    defaultSettings,
    request,

    bankAccounts,
    banks,
    producers,
    transfers,
};

/**
 * Exporting
 */
export default finance;
