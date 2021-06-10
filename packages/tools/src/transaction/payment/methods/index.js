import { ame } from './ame.js'
import { boleto } from './boleto.js'
import { credit } from './credit.js'
import { debit } from './debit.js'
import { freepass } from './freepass.js'
import { other } from './other.js'
import { paypal } from './paypal.js'
import { picpay } from './picpay.js'
import { pix } from './pix.js'
import { transfer } from './transfer.js'
export {
  ame,
  boleto,
  credit,
  debit,
  freepass,
  other,
  paypal,
  picpay,
  pix,
  transfer
}

const methods = {
  ame,
  boleto,
  credit,
  debit,
  freepass,
  paypal,
  picpay,
  pix,
  transfer,
  other,
}

/**
 * Get List of Payment Methods
 *
 * @returns {Array}
 */
export function getList() {
  return (
    Object
    .values(methods)
    .sort(({ sequence: aSeq }, { sequence: bSeq }) => aSeq - bSeq)
    .sort(({ highlight: aHigh }, { highlight: bHig }) => (
      (aHigh === bHig) ? 0 : (aHigh ? -1 : 1)
    ))
  )
}

/**
 * Defining 'getList' as "hidden" method's object property
 */
Object.defineProperty(methods, 'getList', {
  enumerable: false,
  writable: false,
  value: getList
})

/**
 * Help to Identify a Payment/Checkout Method by key
 *
 * @param {String} methodKey
 *
 * @returns {Object|undefined}
 */
export function getByKey(methodKey = '') {
  return Object.values(methods).find(({ keys }) => keys.includes(methodKey.toLowerCase()))
}

/**
 * Defining 'getByKey' as "hidden" method's object property
 */
Object.defineProperty(methods, 'getByKey', {
  enumerable: false,
  writable: false,
  value: getByKey
})

/**
 * Help to identify an Ingresse Transaction's Payment Method
 *
 * @param {Object} transaction
 *
 * @returns {Object}
 */
export function ofTransaction(transaction = null) {
  function sendItBack(transaction = {}, paymentMethod = {}) {
    return {
      paymentMethod,
      ...(transaction || {})
    }
  }

  if (!transaction || (typeof transaction !== 'object')) {
    return sendItBack(transaction, other)
  }

  const { payment } = transaction
  const {
    acquirer,
    bankBillet,
    creditCard,
    wireTransfer
  } = payment || transaction || {}
  const { name: acName } = acquirer || {}
  const acquirerName = String(acName || typeof acquirer === 'string' ? acquirer : 'unknown').toLowerCase()

  if (bankBillet) {
    return sendItBack(transaction, boleto)
  }

  // TO DO:
  // Debit included
  // Identify Card Brand
  if (creditCard) {
    return sendItBack(transaction, credit)
  }

  // TO DO:
  // Identify Bank
  if (wireTransfer) {
    return sendItBack(transaction, transfer)
  }

  // TO DO:
  // Freepass

  return sendItBack(transaction, getByKey(acquirerName) || other)
}

/**
 * Defining 'ofTransaction' as "hidden" method's object property
 */
Object.defineProperty(methods, 'ofTransaction', {
  enumerable: false,
  writable: false,
  value: ofTransaction
})

/**
 * Methods reference
 */
export default methods
