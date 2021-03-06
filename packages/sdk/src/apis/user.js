/**
 * Base
 */
import { get as getter } from '../request/request.js';

/**
 * Helpers
 */
import sales from './sales';

/**
 * User API Getter
 *
 * @param {string} id - User's ID
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function get(id, query, settings) {
    return new Promise((resolve, reject) => {
        const {
            withSalesGroup,
            ...originalSettings
        } = (settings || {});

        getter(`/users/${id}`, query, {
            withAdapter: 'user',
            ...(originalSettings || {}),
        })
        .then((response) => {
            const { roles } = (response || {});
            const { userAdmin } = (roles || {});

            if (!withSalesGroup || userAdmin) {
                return resolve(response);
            }

            sales
            .groups()
            .then((sgResponse) => {
                const { data }  = (sgResponse || {});
                let salesGroups = data;
                let isSGManager;

                (data || []).some((sg) => {
                    const { team } = (sg || {});

                    return (team || []).some((seller) => {
                        const {
                            id     : sellerId,
                            manager: sellerManager,
                        } = (seller || {});
                        const isManager = (
                            (sellerId === id) && sellerManager
                        );

                        if (isManager) {
                            isSGManager = isManager;
                        }

                        return isManager;
                    });
                });

                resolve({
                    ...(response || {}),
                    roles: {
                        ...(roles || {}),
                        userSalesGroupMember : !!(salesGroups && salesGroups.length),
                        userSalesGroupManager: !!isSGManager,
                    },
                    salesGroups,
                });
            })
            .catch(() => {
                resolve(response);
            });
        })
        .catch(reject);
    });
}

/**
 * Get User public profile by ID
 *
 * @param {string} id - User's ID
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function getPublic(id, query, settings) {
    return getter(`/users/${id}`, query, {
        withAdapter: 'user',
        ...(settings || {})
    });
}

/**
 * Search of Users to Transfer
 *
 * @param {string} term
 * @param {number} size - results limit
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function search(term, size = 10, query, settings) {
    return getter('/search/transfer/user', {
        ...(query || {}),
        size,
        term,
    },
    settings );
}

/**
 * User's Pending Tickets
 *
 * @param {string} id - User's ID
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function transfers(id, query, settings) {
    return getter(`/user/${id}/transfers`, {
        status: 'pending',
        ...(query || {}),
    }, settings);
}

/**
 * User's Wallet reference
 */
const wallet = {
    transfers,
    /**
     * User's Tickets Wallet events
     *
     * @param {string} userId - User's ID
     * @param {object} [query]
     * @param {object} [settings]
     *
     * @returns {Promise}
     */
    events: function (userId, query, settings) {
        return getter(`/user/${userId}/wallet`, query, settings);
    },
};

/**
 * Reference
 */
const user = {
    get,
    getPublic,
    search,
    transfers,
    wallet,
};

/**
 * Exporting
 */
export default user;
