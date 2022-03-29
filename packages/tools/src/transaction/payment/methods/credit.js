import { urlIcon } from '../../../utils'
import base from './_base.js'

/**
 * Credit Card brands reference
 */
const brands = {
  amex: {
    name: 'American Express',
    icon: urlIcon('cards/amex'),
    keys: [
      'amex',
      'americanexpress',
      'american-express',
      'creditcard_amex',
      'creditcard_americanexpress'
    ]
  },
  diners: {
    name: 'Diners',
    icon: urlIcon('cards/diners'),
    keys: [
      'diners',
      'dinersclub',
      'diners-club',
      'creditcard_diners',
      'creditcard_dinersclub',
      'creditcard_diners-club',
      'creditcard_diners_club'
    ]
  },
  discover: {
    name: 'Discover',
    icon: urlIcon('cards/discover'),
    keys: [
      'discover',
      'creditcard_discover'
    ]
  },
  elo: {
    name: 'Elo',
    icon: urlIcon('cards/elo'),
    keys: [
      'elo',
      'creditcard_elo'
    ]
  },
  hipercard: {
    name: 'Hipercard',
    icon: urlIcon('cards/hipercard'),
    keys: [
      'hipercard',
      'hiper',
      'creditcard_hiper',
      'creditcard_hipercard'
    ]
  },
  jcb: {
    name: 'JCB',
    icon: urlIcon('cards/jcb'),
    keys: [
      'jcb',
      'creditcard_jcb'
    ]
  },
  mastercard: {
    name: 'Mastercard',
    icon: urlIcon('cards/mastercard'),
    keys: [
      'master',
      'mastercard',
      'creditcard_master',
      'creditcard_mastercard'
    ]
  },
  visa: {
    name: 'Visa',
    icon: urlIcon('cards/visa'),
    keys: [
      'visa',
      'creditcard_visa'
    ]
  }
}

/**
 * Get Credit Card Brands as array
 *
 * @param {Object} [brandsObject]
 *
 * @returns {Array}
 */
function getBrands(brandsObject = brands) {
  return Object.values(brandsObject)
}

/**
 * Get Credit Card Brand
 *
 * @param {String} brandKey
 * @param {Object} [brandsObject]
 *
 * @returns {Object}
 */
function getBrandByKey(brandKey = '', brandsObject = brands) {
  return getBrands(brandsObject).find(({ keys }) => keys.includes(brandKey.toLowerCase()))
}

/**
 * Defining 'getByKey' as "hidden" brand's object property
 */
Object.defineProperty(brands, 'getByKey', {
  enumerable: false,
  writable: false,
  value: getBrandByKey
})

/**
 * Credit keys
 */
const keys = [
  'card',
  'credit',
  'creditcard',
  'credit-card',
  'creditcardtoken',
  'cartaocredito',
  'cartao-credito',
]

getBrands().forEach(({ keys: brandKeys }) => brandKeys.forEach((brandKey) => {
  keys.push(brandKey)
}))

/**
 * Credit reference
 */
const credit = base('credit', {
  name: 'Crédito',
  icon: urlIcon('card'),
  iconInverse: urlIcon('card-inverse'),
  iconRegular: urlIcon('card-regular'),
  keys,
  brands,
})

/**
 * Get Credit Card Brand from a Transaction
 *
 * @param {Object} transaction
 * @param {Object} [brandsObject]
 *
 * @returns {Object}
 */
function ofTransaction(transaction = {}, brandsObject) {
  const { payment, sale } = transaction
  const { payment: salePayment } = sale || {}
  const { creditCard: paymentCard, method, type } = salePayment || payment || {}
  const { brand, cardLast, installments, lastDigits, masked } = paymentCard || {}
  const paymentType = method || type
  const paymentCardBrand = getBrandByKey(brand || paymentType, brandsObject) || null

  if (!brand && !paymentType) {
    return transaction
  }

  const { name, icon } = paymentCardBrand || credit
  const installmentsSummary = !installments ? '' : `${installments > 1 ? `em ${installments}x` : 'à vista'}`
  const cardLastDigits = cardLast || lastDigits
  const details = `de final ${cardLastDigits} ${installmentsSummary}`
  const checkoutMethod = {
    name: paymentCardBrand ? `${credit.name} - ${name}` : name,
    icon,
    ...(!cardLastDigits ? {} : { details }),
    ...(!masked ? {} : { masked })
  }

  return {
    ...transaction,
    checkoutMethod,
    paymentCard,
    paymentCardBrand,
    paymentMethod: checkoutMethod,
  }
}

/**
 * Defining 'getBrands', 'getBrandByKey' and 'ofTransaction' as hidden credit's object properties
 */
Object.defineProperties(credit, {
  getBrands: {
    enumerable: false,
    writable: true,
    value: getBrands,
  },
  getBrandByKey: {
    enumerable: false,
    writable: true,
    value: getBrandByKey
  },
  ofTransaction: {
    enumerable: false,
    writable: true,
    value: ofTransaction
  },
})

/**
 * Exporting Credit reference
 */
export { credit }
