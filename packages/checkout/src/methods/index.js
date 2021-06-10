import { ame } from './ame.js'
import { boleto } from './boleto.js'
import { credit } from './credit.js'
import { debit } from './debit.js'
import { freepass } from './freepass.js'
import { other } from './other.js'
import { paypal } from './paypal.js'
import { picpay } from './picpay.js'
import { transfer } from './transfer.js'

const methods = {
  ame,
  boleto,
  credit,
  debit,
  freepass,
  paypal,
  picpay,
  transfer,
  other,
}

/**
 * Help to Identify a Checkout Method
 *
 * @param {String} methodName
 *
 * @returns {Object|undefined}
 */
export function methodIdentifier(methodName = '') {
  return Object.values(methods).find(({ keys }) => keys.includes(methodName.toLowerCase()))
}

/**
 * Help to identify a Transaction Payment Method from Ingresse's API
 *
 * @param {Object} transactionOrPayment
 *
 * @returns {Object}
 */
export function methodTransaction(transactionOrPayment = null) {
  function sendItBack(transaction = {}, checkoutMethod = {}) {
    return {
      checkoutMethod,
      ...(transaction || {})
    }
  }

  if (!transactionOrPayment || (typeof transactionOrPayment !== 'object')) {
    return sendItBack(transactionOrPayment, other)
  }

  const {
    payment,
  } = transactionOrPayment
  const {
    acquirer,
    bankBillet,
    creditCard,
    wireTransfer
  } = payment || transactionOrPayment || {}
  const { name: acName } = acquirer || {}
  const acquirerName = acName || typeof acquirer === 'string' ? acquirer : 'unknown'

  if (bankBillet) {
    return sendItBack(transactionOrPayment, boleto)
  }

  // TO DO:
  // Debit included
  // Identify Card Brand
  if (creditCard) {
    return sendItBack(transactionOrPayment, credit)
  }

  // TO DO:
  // Identify Bank
  if (wireTransfer) {
    return sendItBack(transactionOrPayment, transfer)
  }

  if (ame.keys.includes(acquirerName)) {
    return sendItBack(transactionOrPayment, ame)
  }

  if (paypal.keys.includes(acquirerName)) {
    return sendItBack(transactionOrPayment, paypal)
  }

  if (picpay.keys.includes(acquirerName)) {
    return sendItBack(transactionOrPayment, picpay)
  }

  // TO DO:
  // Freepass

  return sendItBack(transactionOrPayment, other)
}

/**
 * Methods reference
 */
export default methods
