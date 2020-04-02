/**
 * Triggers
 */
import {
    fbq,
    gtag,
    legiti,
} from '../triggers';

/**
 * Purchase Refund
 *
 * @param {object} purchase
 * @param {string} purchase.tid      - transaction id
 * @param {number} purchase.tax      - transaction tax
 * @param {number} purchase.value    - transaction value
 * @param {string} purchase.coupon   - discount coupon
 * @param {string} purchase.currency - currency
 *
 * @param {array}  purchase.items            - sold items
 * @param {string} purchase.items[].id       - sold item ID
 * @param {string} purchase.items[].quantity - sold item quantity
 *
 * @returns {boolean|object}
 */
function created(purchase) {
    try {
        const {
            tid: transaction_id,
            items,
            value,
            currency = 'BRL',
        } = (purchase || {});

        const toGtag = {
            value,
            currency,
            items,
        };

        const _successGtag   = gtag('event', 'begin_checkout', toGtag);
        const _successLegiti = legiti('trackOrderCreation', transaction_id);

        return (_successGtag || _successLegiti);

    } catch (error) {
        return error;
    }
}

/**
 * Purchase Success / Track Conversion
 *
 * @param {object} basket
 * @param {string} basket.tid      - transaction id
 * @param {number} basket.tax      - transaction tax
 * @param {number} basket.value    - transaction value
 * @param {string} basket.coupon   - discount coupon
 * @param {string} basket.currency - currency
 *
 * @param {array}  basket.items            - sold items
 * @param {string} basket.items[].id       - sold item ID
 * @param {string} basket.items[].quantity - sold item quantity
 *
 * @returns {boolean|object}
 */
function success(basket) {
    try {
        const {
            tid,
            tax,
            items,
            coupon,
            value,
            currency = 'BRL',
        } = (basket || {});

        const toFbq = {
            value,
            currency,
            contents    : items,
            content_type: 'product',
        };
        const toGtag = {
            value,
            tax,
            items,
            coupon,
            currency,
            transaction_id: tid,
        };

        const _fbq    = fbq('track', 'Purchase', toFbq);
        const _gtag   = gtag('event', 'purchase', toGtag);
        const _legiti = legiti('trackOrderCreation', tid);

        return (_fbq || _gtag || _legiti);

    } catch (error) {
        return error;
    }
}

/**
 * Purchase Refund
 *
 * @param {object} purchase
 * @param {string} purchase.tid      - transaction id
 * @param {number} purchase.tax      - transaction tax
 * @param {number} purchase.value    - transaction value
 * @param {string} purchase.coupon   - discount coupon
 * @param {string} purchase.currency - currency
 *
 * @param {array}  purchase.items            - sold items
 * @param {string} purchase.items[].id       - sold item ID
 * @param {string} purchase.items[].quantity - sold item quantity
 *
 * @returns {boolean|object}
 */
function refund(purchase) {
    try {
        const {
            tid: transaction_id,
            tax,
            items,
            value,
            currency = 'BRL',
        } = (purchase || {});

        return gtag('event', 'refund', {
            value,
            tax,
            items,
            currency,
            transaction_id,
        });

    } catch (error) {
        return error;
    }
}

/**
 * Exporting
 */
export const purchase = {
    refund,
    success,
};
