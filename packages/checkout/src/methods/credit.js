import { urlIcon } from '../utils'

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
      'american-express'
    ]
  },
  diners: {
    name: 'Diners',
    icon: urlIcon('cards/diners'),
    keys: [
      'diners',
      'dinersclub',
      'diners-club'
    ]
  },
  discover: {
    name: 'Discover',
    icon: urlIcon('cards/discover'),
    keys: [
      'discover'
    ]
  },
  elo: {
    name: 'Elo',
    icon: urlIcon('cards/elo'),
    keys: [
      'elo'
    ]
  },
  hipercard: {
    name: 'Hipercard',
    icon: urlIcon('cards/hipercard'),
    keys: [
      'hiper',
      'hipercard'
    ]
  },
  jcb: {
    name: 'JCB',
    icon: urlIcon('cards/jcb'),
    keys: [
      'jcb'
    ]
  },
  mastercard: {
    name: 'Mastercard',
    icon: urlIcon('cards/mastercard'),
    keys: [
      'master',
      'mastercard'
    ]
  },
  visa: {
    name: 'Visa',
    icon: urlIcon('cards/visa'),
    keys: [
      'visa',
      'visa-electron'
    ]
  },
}

/**
 * Get Credit Card Brands
 *
 * @param {String} [brandKey]
 * @param {Object} [brandsObject]
 *
 * @returns {Array}
 */
function getBrands(brandKey = '', brandsObject = brands) {
  const brandsArray = Object.values(brandsObject)

  return !brandKey ? brandsArray : brandsArray.filter(({ keys }) => keys.includes(brandKey))
}

/**
 * Credit reference
 */
export const credit = {
  brands,
  getBrands,
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
