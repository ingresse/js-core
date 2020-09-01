/**
 * Base
 */
import { get } from "../../request/request.js";
import { defaultSettings } from "./base.js";

/**
 * Get A Producer's Bank Accounts List
 *
 * @param {object} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function list(
    id,
    query,
    settings
) {
    return get(
        `/producers/${id}/bank-accounts`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const bankAccounts = {
    defaultSettings,

    list
};

/**
 * Exporting
 */
export default bankAccounts;