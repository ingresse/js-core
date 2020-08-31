/**
 * Base
 */
import { defaultSettings, request } from './base.js';

/**
 * Sub Modules
 */
import producers from './producers.js';
import transfers from './transfers.js';

/**
 * Reference
 */
const finance = {
    defaultSettings,
    request,

    producers,
    transfers,
};

/**
 * Exporting
 */
export default finance;
