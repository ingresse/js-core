/**
 * Base
 */
import {
    get as getter,
} from '../request/request.js';

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
function get(
    id,
    query,
    settings
) {
    return new Promise((resolve, reject) => {
        const {
            withSalesGroup,
            ...originalSettings
        } = (settings || {});

        getter(`/user/${id}`, query, {
            withFormatter: 'user',
            ...(originalSettings || {}),
        })
        .then((response) => {
            const { roles }      = (response || {});
            const { user_admin } = (roles || {});

            if (!withSalesGroup || user_admin) {
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
                        user_sales_group_member : !!(salesGroups && salesGroups.length),
                        user_sales_group_manager: !!isSGManager,
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
 * Reference
 */
const user = {
    get,
};

/**
 * Exporting
 */
export default user;
