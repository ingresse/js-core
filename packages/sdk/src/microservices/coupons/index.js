/**
 * Base
 */
import { get as getter, post, put, del } from '../../request/request.js';
import { defaultSettings, request } from './base.js';

/**
 * Adapters
 */
import { coupons as adapters } from '../../adapters';

/**
 * Coupons List
 *
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function list(
    query,
    settings = {}
) {
    return getter(
        '/coupons',
        query,
        defaultSettings({
            withAdapter: 'coupons.list',
            ...settings
        })
    );
}

/**
 * Get Coupon by Id
 *
 * @param {string} couponId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function get(
    couponId,
    query,
    settings = {}
) {
    return getter(
        `/coupons/${couponId}`,
        query,
        defaultSettings({
            withAdapter: 'coupons.item',
            ...settings
        })
    );
}

/**
 * Create Coupon
 *
 * @param {object} coupon
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function create(
    coupon,
    query,
    settings = {}
) {
    return post(
        '/coupons',
        adapters.save(coupon),
        query,
        defaultSettings({
            withAdapter: 'coupons.item',
            ...settings
        })
    );
}

/**
 * Update Coupon
 *
 * @param {string} couponId
 * @param {object} coupon
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function update(
    couponId,
    coupon,
    query,
    settings = {}
) {
    return put(
        `/coupons/${couponId}`,
        adapters.save(coupon),
        query,
        defaultSettings({
            withAdapter: 'coupons.item',
            ...settings
        })
    );
}

/**
 * Remove Coupon by Id
 *
 * @param {string} couponId
 * @param {object} [query]
 * @param {object} [settings]
 *
 * @returns {Promise}
 */
function remove(
    couponId,
    query,
    settings
) {
    return del(
        `/coupons/${couponId}`,
        query,
        defaultSettings(settings)
    );
}

/**
 * Reference
 */
const coupons = {
    defaultSettings,
    request,

    list,
    get,
    create,
    update,
    remove,
};

/**
 * Exporting
 */
export default coupons;
