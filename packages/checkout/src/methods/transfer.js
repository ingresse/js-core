import { urlIcon } from '../utils'

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
    number: bankNumber,
    name: banksByNumber[bankNumber],
    icon: urlIcon(bankNumber, 'methods/banks', '.png')
  }
})

/**
 * Get Wire Transfers Banks
 *
 * @param {String} [bankNumber]
 * @param {Object} [banksObject]
 *
 * @returns {Array}
 */
function getBanks(bankNumber = '', banksObject = banks) {
  const banksArray = Object.values(banksObject)
  const bankNumberInt = parseInt(bankNumber, 10)

  return bankNumberInt ? banksArray.filter(({ number }) => (
    bankNumberInt === parseInt(number, 10)
  )) : banksArray
}

/**
 * Wire Transfer reference
 */
export const transfer = {
  banks,
  getBanks,
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
