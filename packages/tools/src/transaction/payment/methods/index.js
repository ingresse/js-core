import { ame } from './ame.js'
import { boleto } from './boleto.js'
import { credit } from './credit.js'
import { debit } from './debit.js'
import { freepass } from './freepass.js'
import { money } from './money.js'
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
  money,
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
  money,
  other,
}

/**
 * Help to Identify a Payment/Checkout Method by key
 *
 * @param {String} methodKey
 *
 * @returns {Object|undefined}
 */
export function getByKey(methodKey) {
  return Object.values(methods).find(({ keys }) => keys.includes(String(methodKey).toLowerCase()))
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
  )
}

/**
 * Transaction formatter, including Payment Method at the object root level
 *
 * @param {Object} transaction
 * @param {Object} paymentMethod
 *
 * @returns {Object}
 */
export function formatter(transaction = {}, paymentMethod = other) {
  const {
    icon,
    iconInverse,
    iconRegular,
    name,
    ofTransaction: methodIdentifier,
  } = paymentMethod
  const filteredTransaction = methodIdentifier ? methodIdentifier(transaction) : transaction
  const { sale, payment } = filteredTransaction
  const { payment: salePayment } = sale || {}
  const finalPayment = salePayment || payment

  return {
    ...(!finalPayment ? {} : {
      paymentMethod: {
        name,
        icon,
        iconInverse,
        iconRegular,
      },
    }),
    ...filteredTransaction,
  }
}

/**
 * Help to identify an Ingresse Transaction's Payment Method
 *
 * @param {Object} transaction
 *
 * @returns {Object}
 */
export function adapter(transaction) {
  if (!transaction || (typeof transaction !== 'object')) {
    return transaction
  }

  const { payment, sale } = transaction
  const { payment: salePayment } = sale || {}
  const {
    acquirer,
    bank,
    bankBillet,
    creditCard,
    free,
    method,
    type,
    wireTransfer
  } = salePayment || payment || {}

  if (free) {
    return formatter(transaction, freepass)
  }

  if (bankBillet) {
    return formatter(transaction, boleto)
  }

  if (creditCard) {
    return formatter(transaction, credit)
  }

  if (bank || wireTransfer) {
    return formatter(transaction, transfer)
  }

  const identifiedByType = getByKey(method || type)

  /**
   * Ticketbooth Transactions with specific offline methods
   * such as "money", "creditcard", "debitcard"
   */
  if (identifiedByType) {
    return formatter(transaction, identifiedByType)
  }

  const { name: acquirerName } = acquirer || {}

  /**
   * Default case.
   *
   * Will identify if it is a digital wallet
   * transaction by 'acquirerName' prop.
   * (AME, Picpay, Paypal)
   */
  return formatter(
    transaction,
    getByKey(acquirerName)
  )
}

/**
 * Defining  'adapter', 'getByKey', 'getList' as hidden method's object properties
 */
Object.defineProperties(methods, {
  adapter: {
    enumerable: false,
    writable: false,
    value: adapter
  },
  getByKey: {
    enumerable: false,
    writable: false,
    value: getByKey
  },
  getList: {
    enumerable: false,
    writable: false,
    value: getList
  },
})

/**
 * Methods reference
 */
export default methods
