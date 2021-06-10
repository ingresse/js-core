import { urlIcon } from '../../../utils'

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
      'creditcard_diners'
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
      'creditcard_elo',
      'debitcard_elo'
    ]
  },
  hipercard: {
    name: 'Hipercard',
    icon: urlIcon('cards/hipercard'),
    keys: [
      'hiper',
      'hipercard',
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
      'creditcard_mastercard',
      'debitcard_master',
      'debitcard_mastercard'
    ]
  },
  visa: {
    name: 'Visa',
    icon: urlIcon('cards/visa'),
    keys: [
      'visa',
      'visa-electron',
      'creditcard_visa',
      'debitcard_visa'
    ]
  }
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
  const brandsArray = Object.values(brandsObject)

  return brandsArray.find(({ keys }) => keys.includes(brandKey.toLowerCase()))
}

/**
 * Get Credit Card Brand from a Transaction
 *
 * @param {Object} transaction
 * @param {Object} [brandsObject]
 *
 * @returns {Object}
 */
function ofTransaction(transaction = {}, brandsObject) {
  const { payment } = transaction
  const { creditCard: paymentCard, type } = payment || {}
  const { brand } = paymentCard || {}
  const paymentCardBrand = getBrandByKey(brand || type, brandsObject) || null

  if (!brand && !type) {
    return transaction
  }

  return {
    ...transaction,
    paymentCard,
    paymentCardBrand
  }
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
 * Credit reference
 */
const credit = {
  brands,
  sequence: 30,
  name: 'Crédito',
  icon: urlIcon('card'),
  iconInverse: urlIcon('card-inverse'),
  iconRegular: urlIcon('card-regular'),
  keys: [
    'card',
    'credit',
    'creditcard',
    'credit-card',
    'creditcardtoken',
    'cartaocredito',
    'cartao-credito'
  ],
}

/**
 * Defining 'getBrandByKey' and 'ofTransaction' as "hidden" credit's object properties
 */
Object.defineProperty(credit, 'getBrandByKey', {
  enumerable: false,
  writable: false,
  value: getBrandByKey
})

Object.defineProperty(credit, 'ofTransaction', {
  enumerable: false,
  writable: false,
  value: ofTransaction
})

/**
 * Exporting Credit reference
 */
export { credit }
