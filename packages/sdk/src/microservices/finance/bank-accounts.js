/**
 * Base
 */
import { del, get, post } from '../../request/request.js';
import { defaultSettings, producerPath } from './base.js';

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
 * @param {object} producerId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function list(
    producerId,
    query,
    settings
) {
    return get(
        `${producerPath(producerId)}/bank-accounts`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Remove Bank Account
 *
 * @param {string} accountId
 * @param {string} [producerId]
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function remove(
    accountId,
    producerId,
    query,
    settings
) {
    return del(
        `${producerPath(producerId)}/bank-accounts/${accountId}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Update Bank Account
 *
 * @param {string} accountId
 * @param {object} account
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function update(
    accountId,
    account,
    query,
    settings = {}
) {
    return put(
        `/bank-accounts/${accountId}`,
        account,
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
    remove,
    update,
};

/**
 * Exporting
 */
export default bankAccounts;
