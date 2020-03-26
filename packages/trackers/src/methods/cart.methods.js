/**
 * Triggers
 */
import {
    fbq,
    gtag,
    legiti,
} from '../triggers';

/**
 * Add to Cart
 *
 * @param {object} basket
 * @param {string} basket.tid      - transaction id
 * @param {number} basket.value    - transaction value
 * @param {string} basket.currency - currency
 *
 * @param {array}  basket.items            - sold items
 * @param {string} basket.items[].id       - sold item ID
 * @param {string} basket.items[].quantity - sold item quantity
 *
 * @returns {boolean|object}
 */
function add(basket) {
    try {
        const {
            value    = 0,
            items    = [],
            currency = 'BRL',
        } = (basket || {});

        const toFbq = {
            value,
            contents    : items,
            content_ids : items.map(item => item.id),
            content_type: 'product',
        };
        const toGtag = {
            value,
            currency,
            items,
        };

        return (
            fbq('track', 'AddToCart', toFbq) ||
            gtag('event', 'add_to_cart', toGtag)
        );

    } catch (error) {
        return error;
    }
}

/**
 * Remove from Cart
 *
 * @param {object} basket
 * @param {string} basket.tid      - transaction id
 * @param {number} basket.value    - transaction value
 * @param {string} basket.currency - currency
 *
 * @param {array}  basket.items            - sold items
 * @param {string} basket.items[].id       - sold item ID
 * @param {string} basket.items[].quantity - sold item quantity
 *
 * @returns {boolean|object}
 */
function remove(basket) {
    try {
        const {
            value    = 0,
            items    = [],
            currency = 'BRL',
        } = (basket || {});

        const toGtag = {
            value,
            currency,
            items,
        };

        return gtag('event', 'add_to_cart', toGtag);

    } catch (error) {
        return error;
    }
}

/**
 * Exporting
 */
export const cart = {
    add,
    remove,
};
