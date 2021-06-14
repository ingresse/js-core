/**
 * Base
 */
import { defaultSettings, request } from './base.js';

/**
 * Sub Modules
 */
import bankAccounts from './bank-accounts.js';
import banks from './banks.js';
import boletos from './boletos.js';
import contractTypes from './contract-types.js';
import contracts from './contracts.js';
import eventExceptions from './event-exceptions.js';
import liquidation from './liquidation.js';
import permissions from './permissions.js';
import producers from './producers.js';
import rebates from './rebates.js';
import transfers from './transfers.js';

/**
 * Reference
 */
const finance = {
    defaultSettings,
    request,

    bankAccounts,
    banks,
    boletos,
    contractTypes,
    contracts,
    eventExceptions,
    liquidation,
    permissions,
    producers,
    rebates,
    transfers
};

/**
 * Exporting
 */
export default finance;
