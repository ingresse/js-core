/**
 * Base
 */
import { get } from "../../request/request.js";
import { defaultSettings } from "./base.js";

/**
 * Create Bank Account to Producer
 *
 * @param {object} bankAccount
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function create(
    bankAccount,
    query,
    settings = {}
) {
    return post(
        '/bank-accounts',
        bankAccount,
        query,
        defaultSettings(settings)
    );
}

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
 * Remove Bank Account
 *
 * @param {string} id
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function remove(
    id,
    query,
    settings
) {
    return del(
        `/bank-accounts/${id}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const bankAccounts = {
    defaultSettings,

    create,
    list,
    remove
};

/**
 * Exporting
 */
export default bankAccounts;