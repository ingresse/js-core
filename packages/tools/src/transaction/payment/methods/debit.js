import { credit } from './credit.js'

/**
 * Debit Card brands reference
 */
const brands = {
  elo: credit.getBrandByKey('elo'),
  mastercard: credit.getBrandByKey('mastercard'),
  visa: credit.getBrandByKey('visa'),
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
 * Get Debit Card Brand from a Transaction
 *
 * @param {Object} transaction
 *
 * @returns {Object}
 */
function ofTransaction(transaction = {}) {
  const { payment } = transaction
  const { type } = payment || {}
  const paymentCardBrand = getBrandByKey(type, brands) || null

  if (!paymentCardBrand) {
    return transaction
  }

  return {
    ...transaction,
    paymentCardBrand
  }
}

const debit = {
  ...credit,
  brands,
  name: 'Débito',
  keys: [
    'card',
    'debit',
    'debito',
    'debitcard',
    'debit-card',
    'cartaodebito'
  ],
}

/**
 * Defining 'getBrandByKey' and 'ofTransaction' as "hidden" credit's object properties
 */
Object.defineProperty(debit, 'getBrandByKey', {
  enumerable: false,
  writable: false,
  value: getBrandByKey
})

Object.defineProperty(debit, 'ofTransaction', {
  enumerable: false,
  writable: false,
  value: ofTransaction
})

/**
 * Exporting Debit reference
 */
export { debit }
