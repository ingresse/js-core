import { paymentTransferPlaceholder } from '../../../settings.js'
import { urlIcon } from '../../../utils'
import base from './_base.js'

/**
 * Banks initial reference
 */
let banks = {}

/**
 * Banks list by their financial identifier number
 */
const banksByCode = {
  '001': 'Banco do Brasil',
  '033': 'Santander',
  '077': 'Banco Inter',
  '104': 'Caixa Econômica',
  '212': 'Banco Original',
  '218': 'Banco BS2',
  '237': 'Bradesco',
  '341': 'Itaú',
}

/**
 * Fill Banks reference
 */
Object.keys(banksByCode).forEach((bankCode) => {
  banks[bankCode] = {
    id: bankCode,
    code: bankCode,
    name: banksByCode[bankCode],
    icon: urlIcon(bankCode, 'assets/payment/methods/banks', '.png')
  }
})

/**
 * Wire Transfer reference
 */
const transfer = base('transfer', {
  name: 'Transferência',
  icon: urlIcon('transfer'),
  iconInverse: urlIcon('transfer-inverse'),
  iconRegular: urlIcon('transfer-regular'),
  keys: [
    'transfer',
    'wiretransfer',
    'wire-transfer',
  ],
  banks,
})

/**
 * Get Wire Transfers Bank by Code
 *
 * @param {String} [bankCode]
 * @param {Object} [banksObject]
 *
 * @returns {Object}
 */
function getBankByCode(bankCode = '', banksObject = banks) {
  const banksArray = Object.values(banksObject)
  const bankCodeInt = parseInt(bankCode, 10)

  return banksArray.find(({ code }) => (
    bankCodeInt === parseInt(code, 10)
  ))
}

/**
 * Get Wire Transfer Bank data of a Transaction
 *
 * @param {Object} transaction
 *
 * @returns {Object}
 */
function ofTransaction(transaction = {}) {
  const { payment, sale } = transaction
  const { payment: salePayment } = sale || {}
  const { bank, wireTransfer: paymentTransfer, method, type } = salePayment || payment || {}
  const { bank: paymentTransferBank } = paymentTransfer || {}
  const { code: bankCode } = bank || paymentTransferBank || {}
  const paymentType = method || type
  const paymentTransferBankFound = getBankByCode(bankCode)
  const paymentTransferBankBrand = paymentTransferBankFound || (
    !['wiretransfer', 'wireTransfer'].includes(paymentType) ? null : {
      name: transfer.name,
      icon: transfer.icon,
      iconInverse: transfer.iconInverse,
      iconRegular: transfer.iconRegular,
    }
  )

  if (!paymentTransferBankBrand) {
    return transaction
  }

  const checkoutMethod = {
    icon: paymentTransferBankBrand.icon,
    name: (
      !paymentTransferBankFound ?
        paymentTransferPlaceholder : `${transfer.name} - ${paymentTransferBankBrand.name}`
    ),
  }

  return {
    ...transaction,
    checkoutMethod,
    paymentMethod: checkoutMethod,
    paymentTransfer,
    paymentTransferBank,
    paymentTransferBankBrand
  }
}

/**
 * Defining 'getBankByCode' and 'ofTransaction' as hidden method's object properties
 */
Object.defineProperties(transfer, {
  getBankByCode: {
    enumerable: false,
    writable: false,
    value: getBankByCode
  },
  ofTransaction: {
    enumerable: false,
    writable: false,
    value: ofTransaction
  },
})

/**
 * Exporting Wire Transfer reference
 */
export { transfer }
