import { urlIcon } from '../../../utils'

/**
 * Banks initial reference
 */
let banks = {}

/**
 * Banks list by their financial identifier number
 */
const banksByNumber = {
  '001': 'Banco do Brasil',
  '033': 'Santander',
  '077': 'Banco Inter',
  '104': 'Caixa Econômica',
  '212': 'Banco BS2',
  '218': 'Banco Original',
  '237': 'Bradesco',
  '341': 'Itaú'
}

/**
 * Fill Banks reference
 */
Object.keys(banksByNumber).forEach((bankNumber) => {
  banks[bankNumber] = {
    id: bankNumber,
    code: bankNumber,
    number: bankNumber,
    name: banksByNumber[bankNumber],
    icon: urlIcon(bankNumber, 'assets/payment/methods/banks', '.png')
  }
})

/**
 * Wire Transfer reference
 */
const transfer = {
  banks,
  sequence: 60,
  name: 'Transferência',
  icon: urlIcon('transfer'),
  iconInverse: urlIcon('transfer-inverse'),
  iconRegular: urlIcon('transfer-regular'),
  keys: [
    'transfer',
    'wiretransfer',
    'wire-transfer',
  ],
}

/**
 * Get Wire Transfers Bank by Number
 *
 * @param {String} [bankNumber]
 * @param {Object} [banksObject]
 *
 * @returns {Object}
 */
function getBankByNumber(bankNumber = '', banksObject = banks) {
  const banksArray = Object.values(banksObject)
  const bankNumberInt = parseInt(bankNumber, 10)

  return banksArray.find(({ number }) => (
    bankNumberInt === parseInt(number, 10)
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
  const { payment } = transaction
  const { wireTransfer: paymentTransfer, type } = payment || {}
  const { bank: paymentTransferBank } = paymentTransfer || {}
  const { code: bankNumber } = paymentTransferBank || {}
  const paymentTransferBankBrand = getBankByNumber(bankNumber) || (
    type === 'wiretransfer' ? transfer : null
  )

  if (!paymentTransferBankBrand) {
    return transaction
  }

  return {
    ...transaction,
    paymentTransfer,
    paymentTransferBank,
    paymentTransferBankBrand
  }
}

/**
 * Defining 'getBankByNumber' and 'ofTransaction' as "hidden" method's object properties
 */
Object.defineProperty(transfer, 'getBankByNumber', {
  enumerable: false,
  writable: false,
  value: getBankByNumber
})

Object.defineProperty(transfer, 'ofTransaction', {
  enumerable: false,
  writable: false,
  value: ofTransaction
})

/**
 * Exporting Wire Transfer reference
 */
export { transfer }
