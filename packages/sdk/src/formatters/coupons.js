/**
 * Utilities
 */
import {
    currency,
    date,
    numbers,
} from '../utils';

/**
 * Coupon's Status reference
 */
const status = {
    active: {
        color: '#60C659',
        label: 'Ativo',
    },
    expired: {
        color: '#7A8085',
        label: 'Encerrado',
    },
    scheduled: {
        color: '#FFC61E',
        label: 'Programado',
    },
    unknown: {
        color: '#dddfe0',
        label: 'Desconhecido',
    },
};

/**
 * Coupon's date format
 */
function getDate(
    couponDate = '',
    format     = 'DD/MM/YYYY'
) {
    if (!couponDate) {
        return '';
    }

    return date(couponDate).utc().format(format);
}

/**
 * Coupon Item adapter
 *
 * @param {object} coupon
 *
 * @returns {object}
 */
function item(coupon) {
    if (!coupon ||
        (typeof coupon !== 'object')) {
        return coupon;
    }

    const { data } = coupon;
    const {
        discount: srcDiscount,
        status  : srcStatus,
        type    : srcType,

        createdAt : srcCreatedAt,
        updatedAt : srcUpdatedAt,
        startUsage: srcStartUsage,
        endUsage  : srcEndUsage,

        usageCount: srcUsageCount,
        usageLimit: srcUsageLimit,
    } = (data || coupon);

    const type = ((srcType === 'fixed') ?
        'Fixo' : 'Porcentagem'
    );
    const discount = ((srcType === 'fixed') ?
        currency(srcDiscount, 1) : `${srcDiscount}%`
    );

    const mappedStatus  = (status[srcStatus] || status.unknown);
    const removable     = !srcUsageCount;
    const editableDates = !!((srcStatus === 'expired') || !srcUsageCount);

    const createdAt  = getDate(srcCreatedAt, 'DD/MM/YYYY - HH:mm:ss');
    const updatedAt  = getDate(srcUpdatedAt, 'DD/MM/YYYY - HH:mm:ss');
    const startUsage = getDate(srcStartUsage);
    const endUsage   = getDate(srcEndUsage);

    const srcUsageLeft = (srcUsageLimit - srcUsageCount);
    const usageLeft    = ((srcUsageLeft || srcUsageCount) ? numbers(srcUsageLeft) : 'infinitos');
    const usageLimit   = (srcUsageLimit ? numbers(srcUsageLimit) : 'Ilimitado');
    const usageCount   = numbers(srcUsageCount);

    const adaptedStatus = {
        ...mappedStatus,
        original: srcStatus,
    };

    const display = {
        type,
        discount,
        createdAt,
        updatedAt,
        startUsage,
        endUsage,
        usageCount,
        usageLeft,
        usageLimit,
        status: adaptedStatus,
    };

    return {
        ...(data || coupon),
        display,
        removable,
        editableDates,
        usageLeft : srcUsageLeft,
        startUsage: getDate(srcStartUsage, 'YYYY-MM-DD'),
        endUsage  : getDate(srcEndUsage, 'YYYY-MM-DD'),
    };
}

/**
 * Coupon List adapter
 *
 * @param {array} coupons
 *
 * @returns {object}
 */
function list(coupons) {
    if (!coupons ||
        (typeof coupons !== 'object') ||
        !coupons.length) {
        return coupons;
    }

    let couponsList = [];

    coupons.map((coupon) => {
        couponsList.push(item(coupon));

        return true;
    });

    return couponsList;
}


/**
 * Coupon List Response adapter
 *
 * @param {object} response
 *
 * @returns {object}
 */
function response(response) {
    const { data, pagination } = (response || {});

    if (!data || !pagination) {
        return response;
    }

    return {
        pagination,
        data: list(data),
    };
}

/**
 * Coupon Item Save adapter
 *
 * @param {object} coupon
 *
 * @returns {object}
 */
function save(coupon) {
    if (!coupon ||
        (typeof coupon !== 'object')) {
        return coupon;
    }

    const {
        id,
        category,
        name,
        type,
        discount,
        usageLimit,
        startUsage,
        endUsage,
        companyId,
        targetEvents,
    } = coupon;
    let adapted = {
        id,
        companyId,
        category,
        name,
        type,
        usageLimit,
        discount,
        targetEvents,
    };

    if (startUsage) {
        const startNormalized = date(startUsage).format('YYYY-MM-DD');
        adapted.startUsage    = date(startNormalized).format('YYYY-MM-DD[T]HH:mm:ss[UTC]');
    }

    if (endUsage) {
        const endNormalized = date(endUsage).format('YYYY-MM-DD');
        adapted.endUsage    = (
            date(endNormalized)
            .add(23, 'hours')
            .add(59, 'minutes')
            .add(59, 'seconds')
            .format('YYYY-MM-DD[T]HH:mm:ss[UTC]')
        );
    }

    return adapted;
}

/**
 * Exporting
 */
export const coupons = {
    response,
    list,
    item,
    save,

    status,
    getDate,
};
