import base from './_base.js'
import { credit } from './credit.js'

/**
 * Debit Card brands reference
 */
const brands = {
  elo: {
    ...credit.getBrandByKey('elo'),
    keys: [
      'elo',
      'debitcard_elo'
    ],
  },
  mastercard: {
    ...credit.getBrandByKey('mastercard'),
    keys: [
      'master',
      'mastercard',
      'maestro',
      'debitcard_mastercard',
      'debitcard_master',
      'debitcard_maestro'
    ],
  },
  visa: {
    ...credit.getBrandByKey('visa'),
    keys: [
      'visa',
      'visa-electron',
      'debitcard_visa',
      'debitcard_visa-electron',
      'debitcard_visa_electron'
    ],
  },
}

/**
 * Get Debit Card brands
 *
 * @param {Object} [brandsObject]
 *
 * @returns {Array}
 */
function getBrands(brandsObject = brands) {
  return Object.values(brandsObject)
}

/**
 * Get Debit Card Brand
 *
 * @param {String} [brandKey]
 *
 * @returns {Object}
 */
function getBrandByKey(brandKey = '') {
  return credit.getBrandByKey(brandKey, brands)
}


/**
 * Debit keys
 */
const keys = [
  'card',
  'debit',
  'debito',
  'debitcard',
  'debitCard',
  'debit-card',
  'cartaodebito'
]

getBrands().forEach(({ keys: brandKeys }) => brandKeys.forEach((brandKey) => {
  keys.push(brandKey)
}))

/**
 * Debit reference
 */
const debit = base('debit', {
  ...credit,
  name: 'Débito',
  keys,
  brands,
})

/**
 * Get Debit Card Brand from a Transaction
 *
 * @param {Object} transaction
 *
 * @returns {Object}
 */
function ofTransaction(transaction = {}) {
  const { payment } = transaction
  const { type } = payment || {}

  if (!String(type).includes('debit')) {
    return transaction
  }

  const paymentCardBrand = getBrandByKey(type, brands) || null
  const { name, icon } = paymentCardBrand || debit

  const checkoutMethod = {
    icon,
    name: !paymentCardBrand ? name : `${debit.name} - ${name}`,
  }

  return {
    ...transaction,
    checkoutMethod,
    paymentCardBrand,
    paymentMethod: checkoutMethod,
  }
}

/**
 * Defining 'getBrands', 'getBrandByKey' and 'ofTransaction' as hidden debit's object properties
 */
Object.defineProperties(debit, {
  getBrands: {
    enumerable: false,
    writable: false,
    value: getBrands,
  },
  getBrandByKey: {
    enumerable: false,
    writable: false,
    value: getBrandByKey
  },
  ofTransaction: {
    enumerable: false,
    writable: false,
    value: ofTransaction
  },
})

/**
 * Exporting Debit reference
 */
export { debit }
